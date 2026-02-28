import Header from '@/components/dashboard/Header';
import Footer from '@/components/dashboard/Footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const FAQ = () => {
  const faqCategories = [
    {
      category: 'General Questions',
      faqs: [
        {
          question: 'What is GAIN-VESTOR?',
          answer: 'GAIN-VESTOR is a comprehensive cryptocurrency investment platform that enables users to trade, invest, and manage their digital asset portfolios. Founded in 2019, we provide secure, user-friendly tools for both beginners and experienced traders to participate in the cryptocurrency market. Our platform offers real-time market data, portfolio tracking, and advanced trading features.',
        },
        {
          question: 'How do I create an account?',
          answer: 'Creating an account is simple. Click on the "Sign Up" button on our homepage and provide your email address, create a secure password, and complete the verification process. You\'ll receive a confirmation email to verify your account. Once verified, you can log in and start exploring our platform. We recommend enabling two-factor authentication for added security.',
        },
        {
          question: 'Is GAIN-VESTOR available in my country?',
          answer: 'GAIN-VESTOR operates in over 180 countries worldwide. However, due to regulatory requirements, certain features may be limited or unavailable in specific jurisdictions. To check availability in your region, please visit our supported countries page or contact our support team. We continuously work to expand our services to new markets while maintaining compliance with local regulations.',
        },
        {
          question: 'What cryptocurrencies can I trade on GAIN-VESTOR?',
          answer: 'GAIN-VESTOR supports over 500 cryptocurrencies including major coins like Bitcoin (BTC), Ethereum (ETH), Ripple (XRP), Cardano (ADA), Solana (SOL), and many more. We regularly add new tokens based on market demand and after thorough security vetting. You can view the complete list of supported assets in our trading interface.',
        },
        {
          question: 'How does GAIN-VESTOR make money?',
          answer: 'GAIN-VESTOR generates revenue through trading fees, which are among the lowest in the industry. We charge a small percentage on each trade, with reduced fees for high-volume traders. We may also earn from spread margins on certain trading pairs and premium subscription services. We never sell user data or charge hidden fees.',
        },
        {
          question: 'Can I use GAIN-VESTOR on mobile devices?',
          answer: 'Yes, GAIN-VESTOR is fully responsive and works on all modern mobile devices through your web browser. We\'re also developing dedicated iOS and Android applications with enhanced features including biometric authentication and push notifications. Stay tuned for announcements about our mobile app releases.',
        },
      ],
    },
    {
      category: 'Account & Security',
      faqs: [
        {
          question: 'How do I secure my account?',
          answer: 'We recommend the following security measures: Enable two-factor authentication (2FA) using an authenticator app, use a strong unique password, never share your login credentials, regularly review your account activity, keep your email account secure, and be cautious of phishing attempts. We also provide additional security options like withdrawal address whitelisting and session management.',
        },
        {
          question: 'What is two-factor authentication (2FA)?',
          answer: 'Two-factor authentication adds an extra layer of security to your account by requiring two forms of verification when logging in: your password and a time-based code from an authenticator app like Google Authenticator or Authy. Even if someone obtains your password, they cannot access your account without the 2FA code. We strongly recommend enabling 2FA for all accounts.',
        },
        {
          question: 'What should I do if I forget my password?',
          answer: 'Click on the "Forgot Password" link on the login page and enter your registered email address. We\'ll send you a secure password reset link. For security reasons, this link expires after 24 hours. If you also have 2FA enabled, you\'ll need access to your authenticator app. If you\'ve lost access to both, contact our support team with identity verification documents.',
        },
        {
          question: 'How does GAIN-VESTOR protect my funds?',
          answer: 'We employ multiple security measures including: cold storage for 98% of digital assets, multi-signature wallets requiring multiple approvals, 256-bit SSL encryption for all data transmission, regular third-party security audits, real-time fraud monitoring systems, and comprehensive insurance coverage for digital assets. Our security infrastructure meets or exceeds banking industry standards.',
        },
        {
          question: 'What happens if GAIN-VESTOR is hacked?',
          answer: 'While we employ industry-leading security measures, we also maintain comprehensive insurance coverage to protect user funds in the unlikely event of a security breach. Our cold storage solution means the vast majority of funds are stored offline and inaccessible to hackers. We have incident response protocols in place and would immediately notify affected users and relevant authorities.',
        },
        {
          question: 'How can I verify official GAIN-VESTOR communications?',
          answer: 'Official communications from GAIN-VESTOR will always come from our verified email domains and will never ask for your password or 2FA codes. We use PGP signatures for important announcements. Be wary of unsolicited messages on social media or messaging apps. When in doubt, log into your account directly through our official website to verify any claims or offers.',
        },
        {
          question: 'Can I have multiple accounts?',
          answer: 'No, each user is limited to one account to comply with regulatory requirements and prevent fraud. Creating multiple accounts violates our Terms of Service and may result in all associated accounts being suspended. If you need to change account information, please contact our support team for assistance.',
        },
      ],
    },
    {
      category: 'Trading & Investments',
      faqs: [
        {
          question: 'How do I buy cryptocurrency?',
          answer: 'After logging into your account, navigate to the Trading section and select the cryptocurrency you wish to purchase. You can buy using funds in your GAIN-VESTOR wallet or directly with a linked payment method. Enter the amount you want to buy, review the transaction details including fees, and confirm your purchase. The cryptocurrency will be credited to your wallet instantly.',
        },
        {
          question: 'What are trading fees?',
          answer: 'GAIN-VESTOR charges competitive trading fees based on your 30-day trading volume. Standard fees start at 0.1% for makers and 0.15% for takers. High-volume traders can qualify for significantly reduced fees. We also offer fee discounts for active platform users. You can view the complete fee schedule in your account settings.',
        },
        {
          question: 'What is the difference between market and limit orders?',
          answer: 'A market order executes immediately at the best available current price, ensuring quick execution but with less control over the exact price. A limit order allows you to specify the price at which you want to buy or sell, giving you more control but with no guarantee of execution if the market doesn\'t reach your specified price. Each has advantages depending on your trading strategy.',
        },
        {
          question: 'How long do transactions take?',
          answer: 'Internal transfers between GAIN-VESTOR users are instant. External cryptocurrency transfers depend on the specific blockchain\'s confirmation time - Bitcoin typically takes 10-60 minutes, while Ethereum is usually 1-5 minutes. Fiat deposits and withdrawals may take 1-5 business days depending on your payment method and bank processing times.',
        },
        {
          question: 'What is the minimum investment amount?',
          answer: 'The minimum investment varies by cryptocurrency but starts as low as $10 for most major coins. This allows new investors to start small and gradually build their portfolio. Some trading pairs may have different minimums based on liquidity requirements. You can view specific minimums when placing an order.',
        },
        {
          question: 'Can I set up recurring purchases?',
          answer: 'Yes, GAIN-VESTOR offers a dollar-cost averaging (DCA) feature that allows you to set up automatic recurring purchases of your chosen cryptocurrencies. You can choose daily, weekly, or monthly intervals and specify the amount. This strategy helps reduce the impact of market volatility by spreading your purchases over time.',
        },
        {
          question: 'What are stop-loss and take-profit orders?',
          answer: 'Stop-loss orders automatically sell your position if the price drops to a specified level, limiting potential losses. Take-profit orders automatically sell when the price reaches your target, securing gains. These tools help manage risk and can be essential for active traders. We offer various order types including trailing stops for more advanced strategies.',
        },
        {
          question: 'How do I track my portfolio performance?',
          answer: 'Our Portfolio section provides comprehensive tracking of all your holdings including current value, total invested, profit/loss percentage, and historical performance charts. You can view performance over different time periods and see detailed breakdowns by asset. We also offer exportable reports for tax purposes and financial planning.',
        },
      ],
    },
    {
      category: 'Deposits & Withdrawals',
      faqs: [
        {
          question: 'How do I deposit funds?',
          answer: 'Navigate to your Wallet and click "Deposit". For cryptocurrency deposits, you\'ll receive a unique deposit address for each supported coin. For fiat deposits, you can use bank transfer, credit/debit card, or other supported payment methods. Always verify the deposit address before sending any funds, as transactions cannot be reversed.',
        },
        {
          question: 'What payment methods are supported?',
          answer: 'GAIN-VESTOR supports multiple payment methods including bank transfers (SEPA, SWIFT, ACH), major credit and debit cards (Visa, Mastercard), PayPal in select regions, and various local payment methods depending on your country. Cryptocurrency deposits are supported for all listed coins. Payment method availability varies by region.',
        },
        {
          question: 'How long do withdrawals take?',
          answer: 'Cryptocurrency withdrawals are typically processed within 30 minutes but may take longer for large amounts requiring additional security reviews. Fiat withdrawals to bank accounts take 1-5 business days depending on your bank and region. We process all withdrawal requests in the order received during business hours.',
        },
        {
          question: 'Are there withdrawal limits?',
          answer: 'Yes, withdrawal limits are based on your account verification level. Basic verified accounts have lower limits, while fully verified accounts enjoy higher limits. Institutional accounts can request custom limits. Current limits are displayed in your account settings. Limits reset daily or monthly depending on the limit type.',
        },
        {
          question: 'Why is my withdrawal pending?',
          answer: 'Withdrawals may be pending for several reasons: security review for large amounts, incomplete verification requirements, network congestion for blockchain transactions, or processing during off-hours. You can check the status in your transaction history. If pending for more than expected, contact support with your transaction ID.',
        },
        {
          question: 'Can I cancel a pending withdrawal?',
          answer: 'You can cancel a withdrawal if it hasn\'t been processed yet. Go to your transaction history, find the pending withdrawal, and click "Cancel" if available. Once a cryptocurrency withdrawal is broadcast to the blockchain, it cannot be cancelled. Fiat withdrawals may be cancellable depending on how far the processing has progressed.',
        },
        {
          question: 'What are the deposit and withdrawal fees?',
          answer: 'Cryptocurrency deposits are free, but you\'ll pay the network fee charged by the blockchain. Withdrawals include a flat fee to cover network transaction costs. Fiat deposits may have fees depending on the payment method - bank transfers are often free while card payments may incur a small percentage fee. See our fee schedule for details.',
        },
      ],
    },
    {
      category: 'Technical Support',
      faqs: [
        {
          question: 'The website isn\'t loading properly. What should I do?',
          answer: 'First, try clearing your browser cache and cookies, then reload the page. Ensure you\'re using a supported browser (Chrome, Firefox, Safari, or Edge with latest updates). Check your internet connection and try disabling browser extensions that might interfere. If issues persist, try using a different browser or device to isolate the problem.',
        },
        {
          question: 'I can\'t log into my account. What should I do?',
          answer: 'Verify you\'re using the correct email and password. Try the "Forgot Password" feature if needed. Check if Caps Lock is on. Ensure your 2FA codes are synced correctly if enabled. Clear browser cache and try again. If you suspect unauthorized access, contact support immediately. We may temporarily lock accounts after multiple failed login attempts.',
        },
        {
          question: 'My transaction is missing. What happened?',
          answer: 'First, check the transaction status in your history - it may be pending. For deposits, verify you sent to the correct address and the blockchain has confirmed the transaction using a block explorer. For large deposits, we may require additional confirmations. If the transaction shows confirmed but isn\'t reflected, contact support with the transaction hash.',
        },
        {
          question: 'How do I contact customer support?',
          answer: 'You can reach our support team 24/7 through multiple channels: Email us at internationalinvestmentcompens@gmail.com or contact our Telegram support agent @JamesRace. For account-specific issues, please use our secure support ticket system while logged into your account. We aim to respond to all inquiries within 24 hours, with priority support for urgent issues.',
        },
        {
          question: 'What are the supported browsers?',
          answer: 'GAIN-VESTOR works best on the latest versions of Chrome, Firefox, Safari, and Microsoft Edge. We recommend keeping your browser updated for the best experience and security. Some features may not work correctly on older browser versions or less common browsers. Mobile browsers on iOS and Android are also supported.',
        },
      ],
    },
    {
      category: 'Regulatory & Compliance',
      faqs: [
        {
          question: 'Is GAIN-VESTOR regulated?',
          answer: 'GAIN-VESTOR operates in compliance with applicable regulations in each jurisdiction where we provide services. We hold relevant licenses and registrations including money transmission licenses in the United States, registration with financial authorities in Europe, and compliance with international AML/KYC requirements. We continuously monitor regulatory developments and adapt our practices accordingly.',
        },
        {
          question: 'What is KYC and why is it required?',
          answer: 'KYC (Know Your Customer) is a verification process required by law to prevent money laundering, fraud, and terrorist financing. We collect and verify identity documents to ensure users are who they claim to be. This protects both you and our platform. Different verification tiers unlock different features and limits.',
        },
        {
          question: 'How is my personal data protected?',
          answer: 'We take data protection seriously and comply with GDPR and other privacy regulations. Personal data is encrypted, stored securely, and never sold to third parties. We collect only necessary information and retain it only as long as legally required. You can request your data or deletion by contacting our privacy team. See our Privacy Policy for complete details.',
        },
        {
          question: 'Do I need to pay taxes on cryptocurrency gains?',
          answer: 'Tax obligations vary by country and individual circumstances. In most jurisdictions, cryptocurrency gains are taxable events. GAIN-VESTOR provides transaction history exports to help with tax reporting, but we don\'t provide tax advice. We recommend consulting with a tax professional familiar with cryptocurrency regulations in your country.',
        },
        {
          question: 'What if I receive suspicious emails claiming to be from GAIN-VESTOR?',
          answer: 'Never click links or download attachments from suspicious emails. GAIN-VESTOR will never ask for your password, 2FA codes, or private keys via email. Forward suspicious emails to our security team. Always access your account by typing our official URL directly in your browser. Enable email notifications in your account to recognize legitimate communications.',
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-display font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-muted-foreground text-lg">
              Find answers to common questions about GAIN-VESTOR, cryptocurrency trading, and account management.
            </p>
          </div>

          {faqCategories.map((category, categoryIndex) => (
            <div key={category.category} className="mb-10">
              <h2 className="text-2xl font-display font-semibold mb-4 text-primary">
                {category.category}
              </h2>
              <Accordion type="single" collapsible className="glass-card rounded-2xl">
                {category.faqs.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`${categoryIndex}-${index}`}
                    className="border-b border-border/50 last:border-0"
                  >
                    <AccordionTrigger className="px-6 hover:text-primary">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}

          <div className="glass-card rounded-2xl p-8 text-center mt-12">
            <h3 className="text-xl font-display font-semibold mb-3">Still have questions?</h3>
            <p className="text-muted-foreground mb-6">
              Can't find what you're looking for? Our support team is here to help 24/7.
            </p>
            <a 
              href="mailto:support@gain-vestor.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Contact Support
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
