import Header from '@/components/dashboard/Header';
import Footer from '@/components/dashboard/Footer';

const Terms = () => (
  <div className="min-h-screen flex flex-col bg-background">
    <Header />
    <main className="flex-1 container px-4 py-8 sm:py-12">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-display font-bold">Terms and Conditions</h1>
        
        <section className="border-t border-border pt-6 space-y-3">
          <h2 className="text-xl font-display font-semibold">1. Acceptance of Terms</h2>
          <p className="text-muted-foreground leading-relaxed">
            By accessing or using the GAIN-VESTOR platform, you agree to be bound by these Terms and Conditions. The platform operates as a digital asset management and trading interface subject to applicable regulatory standards and compliance policies.
          </p>
        </section>

        <section className="border-t border-border pt-6 space-y-3">
          <h2 className="text-xl font-display font-semibold">2. Digital Balances & Transactions</h2>
          <p className="text-muted-foreground leading-relaxed">
            All account balances, executed trades, and pending withdrawals are subject to blockchain network confirmation and internal security checks. Verified transactions are final and irreversibly recorded on their respective distributed ledgers.
          </p>
        </section>

        <section className="border-t border-border pt-6 space-y-3">
          <h2 className="text-xl font-display font-semibold">3. Platform Fees & Funding</h2>
          <p className="text-muted-foreground leading-relaxed">
            Users are responsible for applicable transaction, network gas, and service fees as outlined in our fee schedule. Deposits and account funding must originate from authorized payment methods owned by the verified account holder.
          </p>
        </section>

        <section className="border-t border-border pt-6 space-y-3">
          <h2 className="text-xl font-display font-semibold">4. Market Information & Financial Disclaimer</h2>
          <p className="text-muted-foreground leading-relaxed">
            Real-time market feeds, charts, and portfolio metrics are provided for informational and execution purposes. Cryptocurrency trading involves significant financial risk. Nothing contained on this platform constitutes formal or financial advice.
          </p>
        </section>

        <section className="border-t border-border pt-6 space-y-3">
          <h2 className="text-xl font-display font-semibold">5. User Obligations & Security</h2>
          <p className="text-muted-foreground leading-relaxed">
            You are responsible for maintaining the confidentiality of your account credentials, private keys, and two-factor authentication (2FA). Users agree not to engage in market manipulation, unauthorized automated access, or fraudulent account activities.
          </p>
        </section>

        <section className="border-t border-border pt-6 space-y-3">
          <h2 className="text-xl font-display font-semibold">6. Service Availability & Limitation of Liability</h2>
          <p className="text-muted-foreground leading-relaxed">
            While we strive for continuous service uptime, GAIN-VESTOR does not guarantee uninterrupted system operations during critical network maintenance or extreme blockchain congestion. The platform is not liable for indirect losses arising from market volatility or third-party outages.
          </p>
        </section>
      </div>
    </main>
    <Footer />
  </div>
);

export default Terms;
