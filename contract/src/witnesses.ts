// This file is part of example-battleship.
// Copyright (C) Midnight Foundation
// SPDX-License-Identifier: Apache-2.0
// Licensed under the Apache License, Version 2.0 (the "License");
// You may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// The main purpose of this file is to hold all of the code relevant to private state.
// It is good practice to isolate this data so that you can start to think of private state
// in a different context for your DApp
import { webcrypto } from 'crypto';


export class OnyxWitnesses {
  private secretKey: Uint8Array;
  private currentNonce: Uint8Array;
  private currentAmount: bigint;
  private oneTimeAddressSeed: Uint8Array;
  private privateMemo: string;

  constructor(secretKey: Uint8Array) {
    this.secretKey = secretKey;
    this.currentNonce = new Uint8Array(32);
    this.currentAmount = 0n;
    this.oneTimeAddressSeed = new Uint8Array(32);
    this.privateMemo = '';
  }

  /**
   * witness localCreatorSecretKey(): Bytes<32>
   * Returns the creator's private key — stays on local machine
   */
  localCreatorSecretKey(): Uint8Array {
    return this.secretKey;
  }

  /**
   * witness localPaymentNonce(): Bytes<32>
   * Fresh cryptographic nonce per payment — prevents linking
   */
  localPaymentNonce(): Uint8Array {
    return this.currentNonce;
  }

  /**
   * witness localPaymentAmount(): Uint<64>
   * The actual payment amount — shielded from chain observers
   */
  localPaymentAmount(): bigint {
    return this.currentAmount;
  }

  /**
   * witness localOneTimeAddressSeed(): Bytes<32>
   * Seed for generating one-time addresses
   */
  localOneTimeAddressSeed(): Uint8Array {
    return this.oneTimeAddressSeed;
  }

  /**
   * witness localPrivateMemo(): Bytes<32>
   * Private memo for the transaction — never on-chain
   */
  localPrivateMemo(): Uint8Array {
    const encoder = new TextEncoder();
    const encoded = encoder.encode(this.privateMemo);
    const bytes = new Uint8Array(32);
    bytes.set(encoded.slice(0, 32));
    return bytes;
  }

  /**
   * Prepares witnesses for a new payment session
   * Call before each receiveShieldedPayment circuit call
   */
  async prepareForPayment(amount: bigint, memo: string): Promise<void> {
    // Generate fresh random nonce for this payment
    this.currentNonce = webcrypto.getRandomValues(new Uint8Array(32));
    this.currentAmount = amount;
    this.privateMemo = memo;
    
    // Fresh seed for one-time address
    this.oneTimeAddressSeed = webcrypto.getRandomValues(new Uint8Array(32));
  }
}
