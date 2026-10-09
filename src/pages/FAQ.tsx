import Header from '@/components/dashboard/Header';
import Footer from '@/components/dashboard/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQ = () => (
  <div className="min-h-screen flex flex-col bg-background">
    <Header />
    <main className="flex-1 container px-4 py-8 sm:py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-display font-bold mb-6">Frequently Asked Questions</h1>
        <Accordion type="single" collapsible>
          <AccordionItem value="faq-0">
            <AccordionTrigger>Are these real funds?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">No. Every balance and holding is simulated and has no cash value.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-1">
            <AccordionTrigger>Do I need to send money?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">No. The demo does not accept real money, require funding, or charge fees to unlock any feature. Never send money for access to this demo.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-2">
            <AccordionTrigger>What happens when I trade?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">Only your simulated holdings and transaction history change. No real order is submitted to an exchange.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-3">
            <AccordionTrigger>What happens when I withdraw?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">A demo withdrawal reduces the simulated holding and adds a simulated transaction. It sends no real money and needs no approval.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-4">
            <AccordionTrigger>Are charts proof of returns?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">No. Demo performance charts and sample transaction history are illustrative. They do not represent verified investment performance.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-5">
            <AccordionTrigger>Are market prices guaranteed?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">No. Market information can be delayed or unavailable and is not investment advice.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-6">
            <AccordionTrigger>Will my demo activity be saved?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">The simulated wallet resets on reload. Some preferences and portfolio entries are stored in your browser.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-7">
            <AccordionTrigger>Should I enter personal financial information?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">No. Do not enter real bank details, private keys, seed phrases, or identity documents.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </main>
    <Footer />
  </div>
);
export default FAQ;
