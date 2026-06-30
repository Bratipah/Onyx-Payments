export function Navbar() {
  return (
    <nav className="sticky top-0 z-100 border-b border-border bg-void/80" style={{ backdropFilter: 'blur(20px)' }}>
      <div className="flex items-center justify-between px-10 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-night to-dust">
            <span className="text-sm font-bold text-white">◆</span>
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight">Onyx</span>
            <span className="text-xs font-light text-text-secondary ml-2">on Midnight</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="text-sm text-text-secondary hover:text-text-primary transition-colors">
            Learn
          </button>
          <button className="text-sm text-text-secondary hover:text-text-primary transition-colors">
            Docs
          </button>
          <div className="h-6 w-px bg-border mx-1"></div>
          <button className="flex items-center gap-1.5 border border-border rounded-full bg-surface px-4 py-2 text-xs font-mono hover:border-border-glow transition-colors">
            <div className="h-1.5 w-1.5 rounded-full bg-dust pulse-dot"></div>
            <span className="text-text-secondary">Connected</span>
          </button>
        </div>
      </div>
    </nav>
  )
}
