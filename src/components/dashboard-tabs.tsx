'use client'

import { useState } from 'react'

export function DashboardTabs() {
  const [activeTab, setActiveTab] = useState('shielding')

  const tabs = [
    { id: 'shielding', label: 'Send Money' },
    { id: 'proofs', label: 'Receive' },
    { id: 'transactions', label: 'History' },
  ]

  return (
    <div>
      <div className="inline-flex gap-1 bg-panel border border-border rounded-2xl p-1 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-surface text-text-primary border border-border-glow shadow-lg shadow-night/10'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'shielding' && <ShieldingTab />}
      {activeTab === 'proofs' && <ProofsTab />}
      {activeTab === 'transactions' && <TransactionsTab />}
    </div>
  )
}

function ShieldingTab() {
  return (
    <div className="bg-panel border border-border rounded-2xl overflow-hidden">
      <div className="border-b border-border px-8 py-6">
        <h3 className="text-sm font-semibold text-text-primary mb-1">Send Private Money</h3>
        <p className="text-xs text-text-secondary">Transfer funds privately. No one sees the amount or recipient.</p>
      </div>
      <div className="p-8">
        <div className="max-w-md">
          <div className="mb-6">
            <label className="block text-sm font-semibold text-text-primary mb-2">Amount to Send</label>
            <input
              type="text"
              placeholder="Enter amount"
              className="w-full bg-deep border border-border rounded-xl px-4 py-3 text-base text-text-primary focus:outline-none focus:border-dust focus:shadow-lg focus:shadow-dust/20 transition-all"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-semibold text-text-primary mb-2">Recipient Address</label>
            <input
              type="text"
              placeholder="Enter recipient"
              className="w-full bg-deep border border-border rounded-xl px-4 py-3 text-base text-text-primary focus:outline-none focus:border-dust focus:shadow-lg focus:shadow-dust/20 transition-all"
            />
          </div>
          <button className="w-full bg-dust hover:bg-dust/90 text-void font-semibold py-3 rounded-lg transition-all hover:shadow-lg hover:shadow-dust/40">
            Send Money
          </button>
          <p className="text-xs text-text-muted mt-4">Transfers are instant and completely private.</p>
        </div>
      </div>
    </div>
  )
}

function ProofsTab() {
  return (
    <div className="bg-panel border border-border rounded-2xl overflow-hidden">
      <div className="border-b border-border px-8 py-6">
        <h3 className="text-sm font-semibold text-text-primary mb-1">Receive Private Payments</h3>
        <p className="text-xs text-text-secondary">Generate a new address each time to receive money. Payments can never be linked together.</p>
      </div>
      <div className="p-8">
        <div className="max-w-md">
          <button className="w-full bg-night-bright hover:bg-night-bright/90 text-void font-semibold py-3 rounded-lg transition-all hover:shadow-lg hover:shadow-night/40 mb-6">
            Generate Receiving Address
          </button>
          
          <div className="space-y-3">
            <div className="bg-deep border border-border rounded-xl p-4">
              <p className="text-xs text-text-muted mb-2">Your Receiving Address</p>
              <p className="font-mono text-sm text-dust break-all">onyx_1a7c9f2e...</p>
            </div>
            <div className="bg-deep border border-border rounded-xl p-4">
              <p className="text-xs text-text-muted mb-2">Amount Ready to Receive</p>
              <p className="text-2xl font-bold text-text-primary">5.0 ETH</p>
            </div>
          </div>
          
          <p className="text-xs text-text-muted mt-6">Each address is unique and one-time. Share it to receive money privately.</p>
        </div>
      </div>
    </div>
  )
}

function TransactionsTab() {
  return (
    <div className="bg-panel border border-border rounded-2xl overflow-hidden">
      <div className="border-b border-border px-8 py-6">
        <h3 className="text-sm font-semibold text-text-primary mb-1">Withdraw to Your Bank</h3>
        <p className="text-xs text-text-secondary">Pull your private funds back to your regular bank account instantly.</p>
      </div>
      <div className="p-8">
        <div className="max-w-md mb-8">
          <div className="bg-deep border border-border rounded-xl p-4 mb-6">
            <p className="text-xs text-text-muted mb-1">Your Available Balance</p>
            <p className="text-4xl font-bold text-dust">12.5 ETH</p>
            <p className="text-xs text-text-muted mt-2">~$25,000 USD</p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-text-primary mb-2">Amount to Withdraw</label>
            <input
              type="text"
              placeholder="Enter amount"
              className="w-full bg-deep border border-border rounded-xl px-4 py-3 text-base text-text-primary focus:outline-none focus:border-proof focus:shadow-lg focus:shadow-proof/20 transition-all"
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-semibold text-text-primary mb-2">Bank Account</label>
            <input
              type="text"
              placeholder="Enter your bank account"
              className="w-full bg-deep border border-border rounded-xl px-4 py-3 text-base text-text-primary focus:outline-none focus:border-proof focus:shadow-lg focus:shadow-proof/20 transition-all"
            />
          </div>

          <button className="w-full bg-proof hover:bg-proof/90 text-void font-semibold py-3 rounded-lg transition-all hover:shadow-lg hover:shadow-proof/40">
            Withdraw to Bank
          </button>
          <p className="text-xs text-text-muted mt-4">Instant withdrawals. Funds arrive in your account immediately.</p>
        </div>

        <div className="border-t border-border pt-6">
          <h4 className="text-xs font-semibold text-text-secondary mb-3 uppercase">Recent Withdrawals</h4>
          <div className="space-y-2">
            {[
              { amount: '2.5 ETH', time: '2 hours ago', status: 'Completed' },
              { amount: '1.0 ETH', time: '5 hours ago', status: 'Completed' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-sm">
                <div>
                  <p className="text-text-primary">{item.amount}</p>
                  <p className="text-xs text-text-muted">{item.time}</p>
                </div>
                <span className="text-xs text-proof font-semibold">{item.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
