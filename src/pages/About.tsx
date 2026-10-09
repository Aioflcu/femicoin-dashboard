import Header from '@/components/dashboard/Header';
import Footer from '@/components/dashboard/Footer';

const About = () => (
  <div className="min-h-screen flex flex-col bg-background">
    <Header />
    <main className="flex-1 container px-4 py-8 sm:py-12">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-display font-bold">About GAIN-VESTOR</h1>
          <section className="border-t border-border pt-6 space-y-3">
            <h2 className="text-xl font-display font-semibold">A demo, not an investment service</h2>
            <p className="text-muted-foreground leading-relaxed">GAIN-VESTOR is a cryptocurrency portfolio simulation. Every displayed holding, balance, trade, and withdrawal is virtual and has no cash value.</p>
          </section>
          <section className="border-t border-border pt-6 space-y-3">
            <h2 className="text-xl font-display font-semibold">Practice without real money</h2>
            <p className="text-muted-foreground leading-relaxed">Explore market information and simulated portfolio activity. This demo does not hold assets, execute exchange orders, or send blockchain transactions.</p>
          </section>
          <section className="border-t border-border pt-6 space-y-3">
            <h2 className="text-xl font-display font-semibold">No funding required</h2>
            <p className="text-muted-foreground leading-relaxed">There is no funding step, wallet to send money to, or fee to unlock funds. Never send money to anyone claiming it is required to access this demo.</p>
          </section>
      </div>
    </main>
    <Footer />
  </div>
);
export default About;
