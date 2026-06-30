import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { PrivacyGuarantees } from '@/components/privacy-guarantees'
import { DashboardTabs } from '@/components/dashboard-tabs'
import { TerminalLog } from '@/components/terminal-log'
import { AddressCards } from '@/components/address-cards'

export default function Page() {
  return (
    <>
      <Navbar />
      <main className="relative z-10 mx-auto max-w-6xl px-4 py-16 pb-24">
        <Hero />

        <PrivacyGuarantees />

        <section className="mt-20 pt-12 border-t border-border">
          <h2 className="text-2xl font-bold mb-8">Dashboard</h2>
          <DashboardTabs />
        </section>

        <section className="mt-16">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-bold mb-4 text-text-secondary uppercase tracking-wider">
                Recent Activity
              </h3>
              <TerminalLog />
            </div>
            <div>
              <h3 className="text-sm font-bold mb-4 text-text-secondary uppercase tracking-wider">
                Your Addresses
              </h3>
              <AddressCards />
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
