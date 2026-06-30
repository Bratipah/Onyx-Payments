export function ComparisonTable() {
  const comparisons = [
    {
      problem: 'Who Sees Your Payment',
      regular: 'Your bank, payment processors, anyone watching the chain',
      onyx: 'Only you',
    },
    {
      problem: 'Can They Link Your Payments',
      regular: 'Yes—they see a pattern of all your transactions',
      onyx: 'No—each payment looks completely separate',
    },
    {
      problem: 'Payment Amount Visible',
      regular: 'Yes, to many parties',
      onyx: 'No one',
    },
    {
      problem: 'Can Your Account Be Frozen',
      regular: 'Yes, without warning',
      onyx: 'No—your money is private and unstoppable',
    },
    {
      problem: 'Withdrawing Back',
      regular: 'Delayed, investigated, possibly refused',
      onyx: 'Instant, anytime',
    },
  ]

  return (
    <section className="mb-20">
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-3">
          Onyx vs Regular Payment Methods
        </h2>
        <p className="text-text-secondary text-base">
          What actually matters for your privacy
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left px-6 py-4 font-bold text-text-primary">Your Concern</th>
              <th className="text-left px-6 py-4 font-bold text-text-secondary">Regular Banking</th>
              <th className="text-left px-6 py-4 font-bold text-dust">Onyx</th>
            </tr>
          </thead>
          <tbody>
            {comparisons.map((row, idx) => (
              <tr
                key={idx}
                className="border-b border-border hover:bg-surface/50 transition-colors"
              >
                <td className="px-6 py-5 text-text-primary font-semibold">
                  {row.problem}
                </td>
                <td className="px-6 py-5 text-text-secondary text-sm">
                  {row.regular}
                </td>
                <td className="px-6 py-5 text-dust text-sm font-medium">
                  {row.onyx}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
