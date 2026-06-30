export function CodeView() {
  return (
    <div className="bg-void/50 border border-border rounded-2xl overflow-hidden">
      <div className="bg-deep border-b border-border px-4 py-3 flex items-center justify-between">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
        </div>
        <span className="text-xs text-text-muted font-mono">circuits/solvency.zk</span>
      </div>
      <div className="p-5 font-mono text-xs overflow-x-auto leading-relaxed">
        <div className="text-gray-600">
          <span className="text-gray-600">{`// Zero-Knowledge Proof Circuit`}</span>
        </div>
        <div className="text-gray-600">
          <span className="text-gray-600">{`// Prove: balance >= debt * ratio`}</span>
        </div>
        <br />
        <div>
          <span className="text-night-bright">{`circuit`}</span>
          <span className="text-text-secondary">{` `}</span>
          <span className="text-flame">{`solvency`}</span>
          <span className="text-text-secondary">{`(`}</span>
        </div>
        <div>
          <span className="text-text-secondary">{`  `}</span>
          <span className="text-night-bright">{`private`}</span>
          <span className="text-text-secondary">{` balance: `}</span>
          <span className="text-dust">{`Field`}</span>
          <span className="text-text-secondary">{`,`}</span>
        </div>
        <div>
          <span className="text-text-secondary">{`  `}</span>
          <span className="text-night-bright">{`public`}</span>
          <span className="text-text-secondary">{` ratio: `}</span>
          <span className="text-dust">{`Field`}</span>
        </div>
        <div>
          <span className="text-text-secondary">{`) {`}</span>
        </div>
        <div>
          <span className="text-text-secondary">{`  balance > ratio`}</span>
        </div>
        <div>
          <span className="text-text-secondary">{`}`}</span>
        </div>
      </div>
    </div>
  )
}
