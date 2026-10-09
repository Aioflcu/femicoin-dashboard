import Header from '@/components/dashboard/Header';
import Footer from '@/components/dashboard/Footer';

const Terms = () => (
  <div className="min-h-screen flex flex-col bg-background">
    <Header />
    <main className="flex-1 container px-4 py-8 sm:py-12">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-display font-bold">Terms and Conditions</h1>
          <section className="border-t border-border pt-6 space-y-3">
            <h2 className="text-xl font-display font-semibold">Demo use only</h2>
            <p className="text-muted-foreground leading-relaxed">GAIN-VESTOR is provided for demonstration and educational use. It is not an exchange, broker, bank, or investment service. Using the demo does not create ownership of cryptocurrency or a claim to real funds.</p>
          </section>
          <section className="border-t border-border pt-6 space-y-3">
            <h2 className="text-xl font-display font-semibold">Virtual balances and transactions</h2>
            <p className="text-muted-foreground leading-relaxed">All balances, trades, and withdrawals are simulations with no monetary value. Simulated withdrawals only reduce the displayed demo balance; nothing is sent to a bank account or cryptocurrency wallet.</p>
          </section>
          <section className="border-t border-border pt-6 space-y-3">
            <h2 className="text-xl font-display font-semibold">No fees or funding</h2>
            <p className="text-muted-foreground leading-relaxed">No real money is accepted or required. There are no verification payments, unlock fees, or funding requirements. Do not send money in response to a request associated with this demo.</p>
          </section>
          <section className="border-t border-border pt-6 space-y-3">
            <h2 className="text-xl font-display font-semibold">Market information</h2>
            <p className="text-muted-foreground leading-relaxed">Market data may be delayed, unavailable, or inaccurate. Demo charts and sample activity are illustrative, not proof of investment returns. Nothing shown is financial, investment, legal, or tax advice.</p>
          </section>
          <section className="border-t border-border pt-6 space-y-3">
            <h2 className="text-xl font-display font-semibold">Responsible use</h2>
            <p className="text-muted-foreground leading-relaxed">Do not present demo balances as real assets or use the demo to solicit money. Do not submit real financial credentials, private keys, seed phrases, or identity documents.</p>
          </section>
          <section className="border-t border-border pt-6 space-y-3">
            <h2 className="text-xl font-display font-semibold">Availability</h2>
            <p className="text-muted-foreground leading-relaxed">The demo is provided as available without a guarantee of accuracy or uninterrupted access. Simulated wallet activity can reset when the page reloads. No compensation or payout is promised.</p>
          </section>
      </div>
    </main>
    <Footer />
  </div>
);
export default Terms;
