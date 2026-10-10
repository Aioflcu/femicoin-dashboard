import Header from '@/components/dashboard/Header';
import Footer from '@/components/dashboard/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQ = () => (
  <div className="min-h-screen flex flex-col bg-background">
    <Header />
    <main className="flex-1 container px-4 py-8 sm:py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-display font-bold mb-6">Frequently Asked Questions</h1>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="faq-0">
            <AccordionTrigger>How secure are my digital assets on this platform?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              We employ bank-grade security protocols, including cold storage for the majority of funds, end-to-end encryption, and mandatory multi-factor authentication (2FA) to keep your account safe.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="faq-1">
            <AccordionTrigger>What are the fees for buying and selling crypto?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Our trading fees are competitive and transparent. We charge a flat fee percentage per trade based on your tier, with zero hidden charges. Network gas fees apply for blockchain withdrawals.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="faq-2">
            <AccordionTrigger>How long do withdrawals and deposits take?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Crypto deposits and withdrawals are processed as soon as they reach the required blockchain network confirmations—usually within 5 to 15 minutes depending on network congestion.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="faq-3">
            <AccordionTrigger>Do I need to verify my identity (KYC) to trade?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Basic account registration allows limited features. To unlock full trading limits, fiat deposits, and withdrawals, you must complete quick identity verification with a government-issued ID.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="faq-4">
            <AccordionTrigger>Which cryptocurrencies are supported?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              We support a wide range of major digital assets, including Bitcoin (BTC), Ethereum (ETH), Solana (SOL), popular stablecoins (USDT, USDC), and top altcoins. New assets are vetted and added regularly.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="faq-5">
            <AccordionTrigger>What should I do if my transaction is pending?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Blockchain transactions depend on network traffic. If your transaction is pending, verify the status using the provided Transaction ID (TxHash) on a block explorer or contact our 24/7 support.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="faq-6">
            <AccordionTrigger>How do I recover access if I forget my password?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Click "Forgot Password" on the login screen to receive a reset link via your registered email. For account security, crypto withdrawals may be temporarily locked for 24 hours after a password reset.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="faq-7">
            <AccordionTrigger>How can I reach customer support if I need help?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Our support team is available 24/7. You can submit a ticket directly through the dashboard support menu or launch a live chat session for real-time assistance.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </main>
    <Footer />
  </div>
);

export default FAQ;
