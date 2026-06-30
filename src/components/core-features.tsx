export function CoreFeatures() {
  const features = [
    {
      title: 'Send Privately',
      description: 'Enter an amount and recipient. It\'s sent instantly, and no one can see the details—not even your bank.',
      icon: '✈️',
      color: 'text-dust',
      bgColor: 'bg-dust/10',
    },
    {
      title: 'Receive Anytime',
      description: 'Get a new address each time you want to receive money. Your payments can never be linked together.',
      icon: '📥',
      color: 'text-night-bright',
      bgColor: 'bg-night/20',
    },
    {
      title: 'Withdraw Instantly',
      description: 'Pull your private funds back to your regular bank account whenever you want. Full balance available anytime.',
      icon: '🏦',
      color: 'text-proof',
      bgColor: 'bg-proof/10',
    },
  ]

  return (
    <section className="mb-20">
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-3 leading-tight">
          How It Works
        </h2>
        <p className="text-text-secondary text-base max-w-2xl">
          Three simple steps to private payments.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="group relative overflow-hidden rounded-2xl border border-border hover:border-border-glow transition-colors duration-300"
          >
            {/* Background gradient on hover */}
            <div className={`absolute inset-0 ${feature.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

            {/* Border glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-border-glow/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Content */}
            <div className="relative z-10 p-8">
              <div className="mb-4 text-4xl">{feature.icon}</div>

              <h3 className="text-xl font-bold mb-3 text-text-primary">
                {feature.title}
              </h3>

              <p className="text-text-secondary text-sm leading-relaxed">
                {feature.description}
              </p>

              {/* Accent line */}
              <div className={`mt-6 h-1 w-12 rounded-full ${feature.color} opacity-60 group-hover:opacity-100 transition-opacity`}></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
