export function Hero() {
  return (
    <div className="text-center py-16 px-4">
      <div className="inline-flex items-center gap-2 bg-dust/10 border border-dust/30 rounded-full px-3.5 py-1.5 mb-6">
        <span className="text-xs font-mono font-semibold tracking-widest text-dust uppercase">
          On Midnight Network
        </span>
      </div>

      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
        Send Money{' '}
        <span className="gradient-text">Nobody Needs to See</span>
      </h1>

      <p className="text-base text-text-secondary max-w-2xl mx-auto mb-12 leading-relaxed font-light">
        Complete financial privacy. No amounts visible. No transactions traceable. Just you in control.
      </p>

      <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
        {[
          { number: '100%', label: 'Private' },
          { number: '∞', label: 'Addresses' },
          { number: 'Instant', label: 'Withdrawals' },
        ].map((stat, idx) => (
          <div key={idx} className="text-center">
            <div className={`text-3xl font-mono font-bold mb-2 ${
              idx === 0 ? 'text-dust' :
              idx === 1 ? 'text-night-bright' :
              'text-proof'
            }`}>
              {stat.number}
            </div>
            <div className="text-sm text-text-muted">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
