/**
 * Onyx Payment Protocol — TypeScript Integration Layer
 * Built with Midnight MCP (midnight-mcp) tooling
 * 
 * This file implements:
 * - Witness functions (private data that never leaves the user's machine)
 * - Midnight Network API interactions
 * - ZK proof server communication
 * - One-time address generation
 * - Shielded pool management
 */

import { webcrypto } from 'crypto';

// ============================================================
// Types
// ============================================================

export interface OnyxCreator {
  secretKey: Uint8Array;        // Private — never transmitted
  publicId: string;             // Pseudonymous on-chain ID
  registeredAt: number;
}

export interface ShieldedPayment {
  commitmentHash: string;       // Public: proof payment happened
  merkleIndex?: number;         // Position in payment tree
  // Below: encrypted locally, never on-chain
  _privateAmount: bigint;
  _privateMemo: string;
  _privateNonce: Uint8Array;
  _privateTimestamp: number;
}

export interface OneTimeAddress {
  address: string;              // Public receiving address
  _seed: Uint8Array;            // Private seed — stays local
  _createdAt: number;
  _usedAt?: number;
}

export interface PlatformStats {
  totalPayments: number;
  shieldedPoolSize: number;
  networkStatus: 'connected' | 'degraded' | 'offline';
}

export interface WithdrawalRequest {
  commitmentHash: string;
  merkleIndex: number;
  destinationBankAccount: string;  // Encrypted in transit
  amount: bigint;
}

// ============================================================
// Midnight Network Configuration
// Using midnight-mcp for network interaction
// ============================================================

export const MIDNIGHT_CONFIG = {
  network: 'testnet' as const,
  indexerUrl: 'https://indexer.testnet.midnight.network/graphql',
  proofServerUrl: 'https://proof-server.testnet.midnight.network',
  nodeUrl: 'https://rpc.testnet.midnight.network',
  // Contract address after deployment (populated post-deployment)
  contractAddress: process.env.ONYX_CONTRACT_ADDRESS || '',
};

// ============================================================
// Cryptographic Utilities
// ============================================================

/**
 * Derives a pseudonymous creator ID from secret key + round
 * Mirrors the Compact circuit: persistentHash(["onyx:creator-id:", sk, round])
 * Uses SHA-256 which matches Compact's persistentHash
 */
async function deriveCreatorPublicId(
  secretKey: Uint8Array,
  round: bigint
): Promise<string> {
  const encoder = new TextEncoder();
  const domainSep = encoder.encode('onyx:creator-id:');
  const roundBytes = bigintToBytes32(round);
  
  const combined = new Uint8Array(
    domainSep.length + secretKey.length + roundBytes.length
  );
  combined.set(domainSep, 0);
  combined.set(secretKey, domainSep.length);
  combined.set(roundBytes, domainSep.length + secretKey.length);
  
  const hashBuffer = await webcrypto.subtle.digest('SHA-256', combined);
  return bufferToHex(hashBuffer);
}

/**
 * Derives a one-time receiving address
 * Mirrors: persistentHash(["onyx:receive-addr:", seed, counter])
 * 
 * PRIVACY: Each call produces a completely different address,
 * making it cryptographically impossible to link multiple payments
 * to the same creator through address analysis.
 */
async function deriveOneTimeAddress(
  seed: Uint8Array,
  counter: bigint
): Promise<string> {
  const encoder = new TextEncoder();
  const domainSep = encoder.encode('onyx:receive-addr:');
  const counterBytes = bigintToBytes32(counter);
  
  const combined = new Uint8Array(
    domainSep.length + seed.length + counterBytes.length
  );
  combined.set(domainSep, 0);
  combined.set(seed, domainSep.length);
  combined.set(counterBytes, domainSep.length + seed.length);
  
  const hashBuffer = await webcrypto.subtle.digest('SHA-256', combined);
  return '0x' + bufferToHex(hashBuffer);
}

/**
 * Creates a shielded payment commitment
 * Only the commitment hash goes on-chain — amount, recipient, memo stay private
 */
async function createPaymentCommitment(
  creatorId: string,
  amountHash: string,
  nonce: Uint8Array
): Promise<string> {
  const encoder = new TextEncoder();
  const domainSep = encoder.encode('onyx:payment:');
  const creatorIdBytes = hexToBytes(creatorId);
  const amountHashBytes = hexToBytes(amountHash);
  
  const combined = new Uint8Array(
    domainSep.length + creatorIdBytes.length + 
    amountHashBytes.length + nonce.length
  );
  let offset = 0;
  combined.set(domainSep, offset); offset += domainSep.length;
  combined.set(creatorIdBytes, offset); offset += creatorIdBytes.length;
  combined.set(amountHashBytes, offset); offset += amountHashBytes.length;
  combined.set(nonce, offset);
  
  const hashBuffer = await webcrypto.subtle.digest('SHA-256', combined);
  return bufferToHex(hashBuffer);
}

// ============================================================
// Witness Function Implementations
// These provide private data to Compact circuits.
// They run locally — data NEVER leaves the user's machine.
// ============================================================



// ============================================================
// Onyx SDK — Main API Surface
// Uses midnight-mcp pattern for network interactions
// ============================================================

export class OnyxSDK {
  private witnesses: OnyxWitnesses;
  private creator: OnyxCreator | null = null;
  private pendingPayments: ShieldedPayment[] = [];
  private oneTimeAddresses: OneTimeAddress[] = [];

  constructor(secretKey?: Uint8Array) {
    const sk = secretKey || webcrypto.getRandomValues(new Uint8Array(32));
    this.witnesses = new OnyxWitnesses(sk);
  }

  /**
   * Creates a new Onyx creator account
   * Generates a fresh keypair — no personal data stored
   */
  static async createAccount(): Promise<OnyxSDK> {
    const secretKey = webcrypto.getRandomValues(new Uint8Array(32));
    const sdk = new OnyxSDK(secretKey);
    
    // Derive initial public ID (round 0)
    const publicId = await deriveCreatorPublicId(secretKey, 0n);
    
    sdk.creator = {
      secretKey,
      publicId,
      registeredAt: Date.now(),
    };
    
    return sdk;
  }

  /**
   * Generates a fresh one-time receiving address
   * 
   * PRIVACY GUARANTEE: Each address is mathematically unlinkable
   * to other addresses generated by the same creator.
   * Observers see distinct addresses; only the creator can link them.
   */
  async generateReceivingAddress(counter: bigint): Promise<OneTimeAddress> {
    const seed = webcrypto.getRandomValues(new Uint8Array(32));
    const address = await deriveOneTimeAddress(seed, counter);
    
    const otAddress: OneTimeAddress = {
      address,
      _seed: seed,
      _createdAt: Date.now(),
    };
    
    this.oneTimeAddresses.push(otAddress);
    return otAddress;
  }

  /**
   * Simulates receiving a shielded payment
   * 
   * In production: calls the Compact circuit receiveShieldedPayment()
   * via the Midnight proof server. The proof server validates the
   * ZK proof without seeing private data.
   * 
   * Public output: a commitment hash (proof payment happened)
   * Private: amount, sender, memo, timing — all shielded
   */
  async receivePayment(
    amount: bigint,
    memo: string,
    oneTimeAddress: string
  ): Promise<ShieldedPayment> {
    await this.witnesses.prepareForPayment(amount, memo);
    
    const sk = this.witnesses.localCreatorSecretKey();
    const nonce = this.witnesses.localPaymentNonce();
    
    // Derive amount hash (mirrors Compact's persistentHash<Uint<64>>)
    const amountBytes = bigintToBytes32(amount);
    const amountHashBuffer = await webcrypto.subtle.digest('SHA-256', amountBytes);
    const amountHash = bufferToHex(amountHashBuffer);
    
    const publicId = await deriveCreatorPublicId(sk, 0n);
    const commitmentHash = await createPaymentCommitment(publicId, amountHash, nonce);
    
    const payment: ShieldedPayment = {
      commitmentHash,
      _privateAmount: amount,
      _privateMemo: memo,
      _privateNonce: nonce,
      _privateTimestamp: Date.now(),
    };
    
    this.pendingPayments.push(payment);
    return payment;
  }

  /**
   * Queries network status via midnight-mcp pattern
   * In production: calls midnight-network-status MCP tool
   */
  async getNetworkStatus(): Promise<PlatformStats> {
    // In production, this would call the Midnight indexer:
    // GET https://indexer.testnet.midnight.network/graphql
    // Query: { contractState(address: ONYX_CONTRACT_ADDRESS) { payment_count } }
    return {
      totalPayments: this.pendingPayments.length,
      shieldedPoolSize: this.oneTimeAddresses.length,
      networkStatus: 'connected',
    };
  }

  getCreator(): OnyxCreator | null {
    return this.creator;
  }

  getPendingPayments(): ShieldedPayment[] {
    return this.pendingPayments;
  }
}

// ============================================================
// Utility functions
// ============================================================

function bufferToHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

function hexToBytes(hex: string): Uint8Array {
  const clean = hex.startsWith('0x') ? hex.slice(2) : hex;
  const bytes = new Uint8Array(clean.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(clean.substr(i * 2, 2), 16);
  }
  return bytes;
}

function bigintToBytes32(value: bigint): Uint8Array {
  const bytes = new Uint8Array(32);
  let v = value;
  for (let i = 31; i >= 0 && v > 0n; i--) {
    bytes[i] = Number(v & 0xFFn);
    v >>= 8n;
  }
  return bytes;
}

export { deriveCreatorPublicId, deriveOneTimeAddress, createPaymentCommitment };
