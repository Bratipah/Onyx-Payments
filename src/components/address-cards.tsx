'use client'

import { useState } from 'react'

export function AddressCards() {
  const [activeAddress, setActiveAddress] = useState(0)

  const addresses = [
    { address: '0x743d35Cc6634C0532925a3b844Bc7e7f5e...e8B', balance: '8.4 ETH', used: false },
    { address: '0x2a0E7f5d8f4c6a8e9b2d3c4e5f6a7b8c9d...', balance: '3.2 USDC', used: true },
    { address: '0x5f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d...', balance: 'New', used: false },
  ]

  return (
    <div className="space-y-2">
      {addresses.map((addr, idx) => (
        <div
          key={idx}
          onClick={() => setActiveAddress(idx)}
          className={`bg-deep border rounded-2xl px-4 py-3 flex items-center justify-between cursor-pointer transition-all ${
            activeAddress === idx
              ? 'border-dust shadow-lg shadow-dust-glow'
              : 'border-border hover:border-border-glow'
          }`}
        >
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
              addr.used ? 'bg-text-muted' : 'bg-dust'
            }`}></div>
            <div className="font-mono text-xs text-dust break-all">{addr.address}</div>
          </div>
          <div className="text-right text-xs text-text-muted flex-shrink-0 ml-4">
            {addr.balance}
          </div>
        </div>
      ))}
    </div>
  )
}
