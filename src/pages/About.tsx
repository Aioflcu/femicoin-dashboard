import Header from '@/components/dashboard/Header';
import Footer from '@/components/dashboard/Footer';

const About = () => (
  <div className="min-h-screen flex flex-col bg-background">
    <Header />
    <main className="flex-1 container px-4 py-8 sm:py-12">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-display font-bold">About GAIN-VESTOR</h1>
          <section className="border-t border-border pt-6 space-y-3">
            <h2 className="text-xl font-display font-semibold">An investment service verified by the U.S. Securities and Exchange Commission (SEC) and the Financial Industry Regulatory Authority (FINRA)</h2>
            <p className="text-muted-foreground leading-relaxed">GAIN-VESTOR is a cryptocurrency portfolio. Every displayed holding, balance, trade, and withdrawal is verified by the FINRA and SEC.</p>
          </section>
          <section className="border-t border-border pt-6 space-y-3">
            <h2 className="text-xl font-display font-semibold">Trade wisely</h2>
            <p className="text-muted-foreground leading-relaxed">Explore market information and portfolio activity. This account hold assets, execute exchange orders, and can also  send blockchain transactions.</p>
          </section>
          <section className="border-t border-border pt-6 space-y-3">
            <h2 className="text-xl font-display font-semibold">Deposition of money is required to start trading</h2>
            <p className="text-muted-foreground leading-relaxed">There are steps to take to fund, wallet to fund into.</p>
          </section>
      </div>
    </main>
    <Footer />
  </div>
);
export default About;
