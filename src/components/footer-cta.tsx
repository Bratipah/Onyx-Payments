export function FooterCTA() {
  return (
    <section className="mt-20 pt-12 border-t border-border">
      <div className="grid grid-cols-3 gap-4">
        {[
          {
            icon: '✈️',
            title: 'Send',
            subtitle: 'Private transfer',
            color: 'from-dust to-dust-dim'
          },
          {
            icon: '📥',
            title: 'Receive',
            subtitle: 'Unique address',
            color: 'from-night-bright to-night-dim'
          },
          {
            icon: '🏦',
            title: 'Withdraw',
            subtitle: 'To your bank',
            color: 'from-proof to-dust-dim'
          }
        ].map((action, idx) => (
          <button
            key={idx}
            className="group relative overflow-hidden rounded-2xl border border-border p-6 text-left hover:border-border-glow transition-all hover:bg-surface/50"
          >
            <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity" style={{backgroundImage: `linear-gradient(to right, var(--color-dust), var(--color-night))`}}></div>
            <div className="relative z-10">
              <div className="text-3xl mb-3">{action.icon}</div>
              <h3 className="text-lg font-bold text-text-primary">{action.title}</h3>
              <p className="text-xs text-text-secondary mt-1">{action.subtitle}</p>
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}
