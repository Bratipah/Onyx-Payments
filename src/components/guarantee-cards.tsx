export function GuaranteeCards() {
  const cards = [
    {
      icon: '🔐',
      title: 'Cryptographically Proven',
      desc: 'Mathematical guarantees without revealing secrets',
    },
    {
      icon: '✓',
      title: 'Compliant by Design',
      desc: 'Privacy and regulation work in harmony',
    },
    {
      icon: '⚡',
      title: 'Instant Verification',
      desc: 'On-chain proofs settle in milliseconds',
    },
    {
      icon: '🛡️',
      title: 'Audit Ready',
      desc: 'Transparent logic, encrypted state',
    },
  ]

  return (
    <div className="grid grid-cols-4 gap-3 mb-6">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className="bg-panel border border-border rounded-2xl p-5 text-center hover:border-border-glow hover:-translate-y-0.5 transition-all"
        >
          <div className="text-3xl mb-2.5">{card.icon}</div>
          <h3 className="text-sm font-bold text-text-primary mb-1.5">{card.title}</h3>
          <p className="text-xs text-text-muted leading-relaxed">{card.desc}</p>
        </div>
      ))}
    </div>
  )
}
