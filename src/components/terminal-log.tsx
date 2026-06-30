export function TerminalLog() {
  const logs = [
    { time: '14:23:01', prefix: '$', msg: 'onyx init shielding-pool', type: 'default' },
    { time: '14:23:02', prefix: '>', msg: 'Initializing protocol...', type: 'default' },
    { time: '14:23:05', prefix: '✓', msg: 'Circuit compiled successfully', type: 'success' },
    { time: '14:23:07', prefix: '>', msg: 'Verifying cryptographic parameters', type: 'default' },
    { time: '14:23:09', prefix: '✓', msg: 'All parameters verified on-chain', type: 'success' },
    { time: '14:23:10', prefix: '>', msg: 'Status: LIVE on Mainnet', type: 'night' },
  ]

  return (
    <div className="bg-void/50 border border-border rounded-2xl p-5 font-mono text-xs max-h-48 overflow-y-auto">
      {logs.map((log, idx) => (
        <div key={idx} className="flex gap-2.5 mb-1.5 text-text-secondary">
          <span className="text-text-muted flex-shrink-0">{log.time}</span>
          <span className={`flex-shrink-0 ${
            log.type === 'success' ? 'text-proof' :
            log.type === 'night' ? 'text-night-bright' :
            'text-dust'
          }`}>
            {log.prefix}
          </span>
          <span className={`${
            log.type === 'success' ? 'text-proof' :
            log.type === 'night' ? 'text-night-bright' :
            'text-text-secondary'
          }`}>
            {log.msg}
          </span>
        </div>
      ))}
    </div>
  )
}
