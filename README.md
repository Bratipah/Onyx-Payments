# ◈ Onyx — Zero-Knowledge Defi Privacy Platform

> *The first truly private financial stack for content creators, built on Midnight Network.*

> Our core innovation is a private payment shielding system. It processes transactions in a way where the only public information is that a payment happened. All sensitive details;- the exact amount, who the receiver is, the timing, and any attached memo—are kept completely private and encrypted. The system generates a cryptographic proof that validates the transaction is legitimate, without exposing any of that private data.

> This is powered by several key mechanisms:

- Auto-Shielding: Payments received from external, transparent systems are automatically and instantly converted into our private, shielded pool of funds.

- Address Rotation: For every new transaction or client interaction, the system generates a unique, one-time receiving address. This prevents anyone from linking multiple transactions together to build a pattern or profile of a user's activity.

- Fiat Bridges: Users can seamlessly convert their private, shielded funds back into traditional currency (like dollars or euros) and withdraw to a standard bank account through our partner network, all while maintaining the privacy of the transaction's origin and details.

---
s
## 🛡️ What Onyx Solves

| Problem | Traditional Crypto | Onyx |
|---|---|---|
| Payment visibility | Fully transparent | ZK-shielded |
| Identity linking | Address clustering | One-time addresses |
| Banking discrimination | Still visible to processors | Mathematically hidden |
| Chargeback risk | 32% on platforms | Irreversible ZK proofs |
| Data leaks | Memo, amount visible | All private |

---

## 🏗️ Architecture

```
Payer ──→ One-Time Address (public)
              │
              ▼
      [Compact ZK Circuit]  ← localPaymentAmount() witness (private)
      receiveShieldedPayment  ← localCreatorSecretKey() witness (private)
              │               ← localPrivateMemo() witness (private)
              ▼
      Midnight Proof Server
              │
              ▼
      On-chain commitment hash ← ONLY THIS IS PUBLIC
      (proves payment happened,
       reveals NOTHING else)
```

**Public information:** A payment happened.  
**Private information:** Amount, recipient, timing, memo — ALL shielded.

---

## 📦 Files

| File | Description |
|---|---|
| `onyx_payment.compact` | Compact ZK smart contract for Midnight Network |
| `onyx-sdk.ts` | TypeScript witness functions + SDK integration layer |
| `onyx-dapp.html` | Full frontend dApp UI |


- Indexer: `https://indexer.testnet.midnight.network/graphql`
- Proof Server: `https://proof-server.testnet.midnight.network`
- Node RPC: `https://rpc.testnet.midnight.network`


## 🔐 Privacy Guarantees

### Zero-Knowledge Proof Flow

```compact
// Witness functions — private data NEVER leaves user's machine
witness localCreatorSecretKey(): Bytes<32>;
witness localPaymentAmount(): Uint<64>;
witness localPrivateMemo(): Bytes<32>;
witness localPaymentNonce(): Bytes<32>;
```

Witnesses run locally. The ZK circuit uses them to generate a proof,
but the values themselves are never transmitted or stored on-chain.

### One-Time Addresses

```compact
circuit deriveOneTimeAddress(seed: Bytes<32>, counter: Field): Bytes<32> {
    return persistentHash<Vector<3, Bytes<32>>>([
        "onyx:receive-addr:" as Bytes<32>,
        seed,
        counter as Bytes<32>
    ]);
}
```

Each address uses a fresh `round_counter` value as entropy.  
Two addresses from the same creator are **cryptographically unlinkable**.

### Nullifier Protection

```compact
// Prevents double-spending without revealing which payment was spent
export ledger spent_nullifiers: Map<Bytes<32>, Boolean>;
```

---

## 🪙 Token Model (NIGHT & DUST)

| Token | Role in Onyx |
|---|---|
| **NIGHT** | Held by Onyx platform to generate DUST for transaction fees |
| **DUST** | Consumed for each ZK proof submission; renewable via NIGHT |

Creators never need to hold NIGHT directly.  
The platform self-funds transaction fees from its DUST holdings.

---

## 🔧 midnight-mcp Tools Used

| Tool | Usage in Onyx |
|---|---|
| `midnight-search-docs` | Find shielded token patterns |
| `midnight-search-compact` | Find MerkleTree, nullifier patterns |
| `midnight-analyze-contract` | Security audit of onyx_payment.compact |
| `midnight-compile-contract` | Generate ZK circuits + TypeScript APIs |
| `midnight-network-status` | Check indexer, proof server, node health |
| `midnight-get-balance` | Query NIGHT/DUST balances |
| `midnight-deploy-contract` | Deploy to testnet |
| `midnight-get-transaction` | Verify commitment insertion |

---

## 📋 Compact Contract Highlights

### Public Ledger State (on-chain)
```compact
export ledger payment_count: Counter;           // How many payments total
export ledger payment_commitments: MerkleTree<8>; // Opaque commitment hashes
export ledger spent_nullifiers: Map<Bytes<32>, Boolean>; // Anti-double-spend
export ledger creator_registry: Map<Bytes<32>, Boolean>; // Pseudonymous IDs
```

**Nothing else** goes on-chain. No amounts. No identities. No memos.

### Private Circuits
- `registerCreator()` — ZK-register without revealing identity
- `receiveShieldedPayment()` — Process payment, return commitment only
- `generateOneTimeAddress()` — Fresh unlinkable address per interaction
- `verifyPaymentForWithdrawal()` — Prove ownership for fiat off-ramp

---


Built with ❤️