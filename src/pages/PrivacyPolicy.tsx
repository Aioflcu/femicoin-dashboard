import Header from '@/components/dashboard/Header';
import Footer from '@/components/dashboard/Footer';

const PrivacyPolicy = () => (
  <div className="min-h-screen flex flex-col bg-background">
    <Header />
    <main className="flex-1 container px-4 py-8 sm:py-12">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-display font-bold">Privacy Policy</h1>
          <section className="border-t border-border pt-6 space-y-3">
            <h2 className="text-xl font-display font-semibold">information</h2>
            <p className="text-muted-foreground leading-relaxed">This app is regulated by The U.S. Securities and Exchange Commission (SEC) and the Financial Industry Regulatory Authority (FINRA).</p>
          </section>
          <section className="border-t border-border pt-6 space-y-3">
            <h2 className="text-xl font-display font-semibold">Browser storage</h2>
            <p className="text-muted-foreground leading-relaxed"> profile information is kept in your browser session. Profile pictures, preferences, watchlists, and manually entered portfolio information may also be stored in this browser. Demo wallet balances and transaction activity reset on page reload.</p>
          </section>
          <section className="border-t border-border pt-6 space-y-3">
            <h2 className="text-xl font-display font-semibold">External services</h2>
            <p className="text-muted-foreground leading-relaxed">Market data, coin images, and fonts may load from third-party services. Those requests can expose your IP address and browser information to those services. Hosting may also process technical logs. Their privacy practices are governed by their own policies.</p>
          </section>
          <section className="border-t border-border pt-6 space-y-3">
            <h2 className="text-xl font-display font-semibold">Your choices</h2>
            <p className="text-muted-foreground leading-relaxed">Logging out  clears session. Clearing this site’s browser storage removes locally saved information. Avoid entering sensitive personal information in any  field.</p>
          </section>
          <section className="border-t border-border pt-6 space-y-3">
            <h2 className="text-xl font-display font-semibold">Contact links</h2>
            <p className="text-muted-foreground leading-relaxed">Email and Telegram links open external services. Information you share there is processed by those services and the recipient.</p>
          </section>
      </div>
    </main>
    <Footer />
  </div>
);
export default PrivacyPolicy;
