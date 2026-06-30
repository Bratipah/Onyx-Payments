export function PrivacyGuarantees() {
  const guarantees = [
    {
      title: 'No One Sees Your Amount',
      description: 'Whether you send $5 or $5,000, the network knows a payment happened but never the amount. Your financial details stay private.',
      emoji: '🔐',
    },
    {
      title: 'Payments Can\'t Be Linked',
      description: 'Each payment gets a unique private address. Even if you receive money 100 times, nobody can tell they\'re all going to you.',
      emoji: '🔀',
    },
    {
      title: 'Complete Control',
      description: 'Your funds can\'t be frozen, seized, or traced. Once sent, they\'re yours alone. Withdraw anytime, no questions asked.',
      emoji: '✋',
    },
  ]

  return (
    <section className="mb-16 py-12 border-t border-border">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {guarantees.map((guarantee, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-border/50 p-6 hover:border-border-glow transition-colors"
          >
            <div className="text-3xl mb-3">{guarantee.emoji}</div>
            <h3 className="text-base font-bold text-text-primary mb-2">
              {guarantee.title}
            </h3>
            <p className="text-text-secondary text-xs leading-relaxed">
              {guarantee.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
