export function ZKVisualizer() {
  return (
    <div className="bg-deep border border-border rounded-2xl p-8 mb-6 relative overflow-hidden">
      <div className="absolute right-6 top-6 text-5xl opacity-5">🛡️</div>

      <div className="text-xs font-mono text-text-muted uppercase tracking-widest mb-6">
        Zero-Knowledge Proof Flow
      </div>

      <div className="flex items-start gap-0 relative">
        {/* Private Input */}
        <div className="flex-shrink-0">
          <div className="bg-flame/10 border border-flame/25 rounded-xl px-4.5 py-3.5 font-mono text-xs font-bold text-flame mb-1.5">
            PRIVATE INPUT
          </div>
          <div className="text-center text-xs text-text-muted tracking-wide">Secret Data</div>

          <div className="mt-6 grid grid-cols-4 gap-2.5">
            {[
              { label: 'Balance', value: '2850 USDC' },
              { label: 'Debt', value: '1200 USDC' },
              { label: 'Ratio', value: '70.5%' },
              { label: 'Reserves', value: '1650 USDC' },
            ].map((field, idx) => (
              <div
                key={idx}
                className="bg-flame/5 border border-dashed border-flame/20 rounded-lg px-3 py-2.5"
              >
                <div className="text-xs text-text-muted uppercase tracking-wider mb-1">
                  {field.label}
                </div>
                <div className="font-mono text-xs font-bold text-flame">{field.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Arrow */}
        <div className="flex-1 flex items-center mx-2 relative h-8">
          <div className="flex-1 h-px bg-gradient-to-r from-border via-border-glow to-border"></div>
          <div className="absolute right-0 text-border-glow">→</div>
        </div>

        {/* Proof Generation */}
        <div className="flex-shrink-0">
          <div className="bg-night/20 border border-night-bright/35 rounded-xl px-4.5 py-3.5 font-mono text-xs font-bold text-night-bright mb-1.5">
            PROOF
          </div>
          <div className="text-center text-xs text-text-muted tracking-wide">Computed Proof</div>

          <div className="mt-4 bg-deep/50 border border-border rounded-lg px-3 py-2 mt-6">
            <div className="font-mono text-xs text-text-muted break-all">
              0x7a4f28c9...e2b18d
            </div>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex-1 flex items-center mx-2 relative h-8">
          <div className="flex-1 h-px bg-gradient-to-r from-border via-border-glow to-border"></div>
          <div className="absolute right-0 text-border-glow">→</div>
        </div>

        {/* Public Output */}
        <div className="flex-shrink-0">
          <div className="bg-dust/10 border border-dust/25 rounded-xl px-4.5 py-3.5 font-mono text-xs font-bold text-dust mb-1.5">
            PUBLIC OUTPUT
          </div>
          <div className="text-center text-xs text-text-muted tracking-wide">Verified on-chain</div>

          <div className="mt-6 grid grid-cols-1 gap-2 w-max">
            <div className="bg-proof/10 border border-proof/20 rounded-lg px-3 py-2.5 flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-proof"></div>
              <span className="font-mono text-xs text-proof font-bold">Proof Valid ✓</span>
            </div>
            <div className="bg-dust/10 border border-dust/20 rounded-lg px-3 py-2.5 font-mono text-xs text-dust">
              Ratio: 70.5%
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
