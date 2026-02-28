import Header from '@/components/dashboard/Header';
import Footer from '@/components/dashboard/Footer';

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl font-display font-bold mb-4">Terms and Conditions</h1>
            <p className="text-muted-foreground">Last updated: January 4, 2026</p>
          </div>

          <div className="prose prose-invert max-w-none space-y-8">
            <section className="glass-card rounded-2xl p-8">
              <h2 className="text-2xl font-display font-semibold mb-4">1. Agreement to Terms</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                These Terms and Conditions ("Terms," "Agreement") constitute a legally binding agreement between you ("User," "you," "your") and GAIN-VESTOR ("GAIN-VESTOR," "Company," "we," "us," "our") governing your access to and use of our website, mobile applications, and all related services (collectively, the "Services").
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                By accessing or using our Services, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree to all terms and conditions of this Agreement, you must not access or use our Services. We reserve the right to amend or modify these Terms at any time without prior notice. Your continued use of the Services following any changes constitutes acceptance of those changes.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                These Terms apply to all visitors, users, and others who access or use the Services. Additional terms and conditions may apply to specific services, and such additional terms are incorporated into these Terms by reference.
              </p>
            </section>

            <section className="glass-card rounded-2xl p-8">
              <h2 className="text-2xl font-display font-semibold mb-4">2. Eligibility Requirements</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                To be eligible to use our Services, you must meet the following requirements:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                <li>Be at least 18 years of age or the age of legal majority in your jurisdiction, whichever is greater</li>
                <li>Have the legal capacity to enter into binding contracts under applicable law</li>
                <li>Not be a resident of, or accessing the Services from, a jurisdiction where cryptocurrency trading is prohibited or restricted</li>
                <li>Not be subject to economic or trade sanctions administered by any governmental authority</li>
                <li>Not be included on any list of prohibited or restricted parties, including OFAC's Specially Designated Nationals List</li>
                <li>Complete our identity verification (KYC) process to the extent required for your intended use</li>
                <li>Provide accurate, current, and complete information during registration and maintain its accuracy</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to refuse service, terminate accounts, or cancel orders at our sole discretion if we believe you do not meet these eligibility requirements or have violated any provision of these Terms.
              </p>
            </section>

            <section className="glass-card rounded-2xl p-8">
              <h2 className="text-2xl font-display font-semibold mb-4">3. Account Registration and Security</h2>
              
              <h3 className="text-lg font-semibold mb-3 mt-6">3.1 Account Creation</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                To access certain features of our Services, you must create an account by providing accurate and complete registration information. You are solely responsible for maintaining the confidentiality of your account credentials, including your username, password, and any authentication codes. You agree to immediately notify us of any unauthorized access to or use of your account.
              </p>

              <h3 className="text-lg font-semibold mb-3 mt-6">3.2 Identity Verification</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We are required by law to verify the identity of our users. You agree to provide any documentation or information we request for identity verification purposes, including but not limited to government-issued identification, proof of address, and source of funds documentation. Failure to provide requested information may result in restrictions on your account or termination of services.
              </p>

              <h3 className="text-lg font-semibold mb-3 mt-6">3.3 Account Responsibility</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You are fully responsible for all activities that occur under your account, whether or not authorized by you. This includes all transactions, communications, and actions taken through your account. We will not be liable for any loss arising from unauthorized use of your account if you fail to maintain adequate security of your credentials.
              </p>

              <h3 className="text-lg font-semibold mb-3 mt-6">3.4 Account Restrictions</h3>
              <p className="text-muted-foreground leading-relaxed">
                We may, at our sole discretion, impose limits on your account, including trading limits, withdrawal limits, or restrictions on specific features. Such limits may be based on your verification level, account history, risk assessment, or regulatory requirements. We may also temporarily or permanently suspend your account if we suspect fraudulent activity, violation of these Terms, or for security reasons.
              </p>
            </section>

            <section className="glass-card rounded-2xl p-8">
              <h2 className="text-2xl font-display font-semibold mb-4">4. Trading and Transactions</h2>

              <h3 className="text-lg font-semibold mb-3 mt-6">4.1 Order Execution</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                When you submit a trade order through our platform, you authorize us to execute the transaction according to the parameters you specify. Orders are executed on a best-effort basis and may be subject to delays, partial fills, or rejection based on market conditions, liquidity, or system limitations. Once an order is executed, it is final and cannot be reversed.
              </p>

              <h3 className="text-lg font-semibold mb-3 mt-6">4.2 Fees</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You agree to pay all applicable fees associated with your use of the Services, including trading fees, deposit fees, withdrawal fees, and any other charges as disclosed in our fee schedule. Fees are subject to change and will be posted on our website. By executing a transaction, you agree to the fees applicable at the time of the transaction.
              </p>

              <h3 className="text-lg font-semibold mb-3 mt-6">4.3 Price Information</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Cryptocurrency prices displayed on our platform are derived from various sources and may not reflect real-time market prices. We do not guarantee the accuracy, completeness, or timeliness of price information. Price discrepancies, delays, or errors may occur, and we shall not be liable for any losses arising from reliance on such information.
              </p>

              <h3 className="text-lg font-semibold mb-3 mt-6">4.4 Market Risks</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Cryptocurrency trading involves substantial risk of loss. Prices are highly volatile and can fluctuate significantly within short periods. Past performance is not indicative of future results. You acknowledge and accept that you may lose some or all of your investment. You should only invest funds that you can afford to lose.
              </p>

              <h3 className="text-lg font-semibold mb-3 mt-6">4.5 Deposits and Withdrawals</h3>
              <p className="text-muted-foreground leading-relaxed">
                You may deposit and withdraw funds in accordance with the methods and limits we establish. Deposits are credited after the required number of blockchain confirmations or upon clearance of fiat payments. Withdrawals are processed subject to security reviews and may be delayed if additional verification is required. We are not responsible for losses due to incorrect deposit addresses or network issues.
              </p>
            </section>

            <section className="glass-card rounded-2xl p-8">
              <h2 className="text-2xl font-display font-semibold mb-4">5. Prohibited Activities</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You agree not to engage in any of the following prohibited activities:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                <li>Violating any applicable laws, regulations, or third-party rights</li>
                <li>Money laundering, terrorist financing, or other financial crimes</li>
                <li>Market manipulation, including wash trading, spoofing, or front-running</li>
                <li>Using the Services for illegal gambling or other prohibited purposes</li>
                <li>Circumventing geographic restrictions or sanctions through VPNs or other means</li>
                <li>Creating multiple accounts to evade limits or restrictions</li>
                <li>Interfering with the proper functioning of the Services or other users' access</li>
                <li>Attempting to gain unauthorized access to our systems or other accounts</li>
                <li>Distributing malware, viruses, or other harmful code</li>
                <li>Engaging in any activity that could damage our reputation or business</li>
                <li>Using automated systems, bots, or scripts without authorization</li>
                <li>Reverse engineering, decompiling, or attempting to extract source code</li>
                <li>Misrepresenting your identity or affiliation</li>
                <li>Using the Services for purposes other than their intended use</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                Violation of these prohibitions may result in immediate termination of your account and may be reported to relevant authorities.
              </p>
            </section>

            <section className="glass-card rounded-2xl p-8">
              <h2 className="text-2xl font-display font-semibold mb-4">6. Intellectual Property Rights</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                All content, features, and functionality of the Services, including but not limited to text, graphics, logos, icons, images, audio clips, software, and the compilation thereof, are the exclusive property of GAIN-VESTOR or its licensors and are protected by copyright, trademark, patent, and other intellectual property laws.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You are granted a limited, non-exclusive, non-transferable, revocable license to access and use the Services for personal, non-commercial purposes in accordance with these Terms. This license does not include the right to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                <li>Modify, copy, or create derivative works based on the Services</li>
                <li>Use data mining, robots, or similar data gathering methods</li>
                <li>Download or copy any information for a third party's benefit</li>
                <li>Use any meta tags or hidden text utilizing our trademarks</li>
                <li>Frame or mirror any portion of the Services</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                Any unauthorized use of our intellectual property terminates the license granted herein and may violate applicable laws.
              </p>
            </section>

            <section className="glass-card rounded-2xl p-8">
              <h2 className="text-2xl font-display font-semibold mb-4">7. Disclaimer of Warranties</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                THE SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                <li>IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT</li>
                <li>WARRANTIES THAT THE SERVICES WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE</li>
                <li>WARRANTIES REGARDING THE ACCURACY, RELIABILITY, OR COMPLETENESS OF ANY INFORMATION</li>
                <li>WARRANTIES THAT DEFECTS WILL BE CORRECTED</li>
                <li>WARRANTIES THAT THE SERVICES OR SERVERS ARE FREE OF VIRUSES OR HARMFUL COMPONENTS</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                We do not endorse, guarantee, or assume responsibility for any product or service advertised or offered by a third party through the Services or any linked website.
              </p>
            </section>

            <section className="glass-card rounded-2xl p-8">
              <h2 className="text-2xl font-display font-semibold mb-4">8. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL GAIN-VESTOR, ITS AFFILIATES, DIRECTORS, EMPLOYEES, AGENTS, OR LICENSORS BE LIABLE FOR ANY:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                <li>INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES</li>
                <li>LOSS OF PROFITS, REVENUE, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES</li>
                <li>DAMAGES ARISING FROM UNAUTHORIZED ACCESS TO OR USE OF OUR SERVERS</li>
                <li>DAMAGES ARISING FROM INTERRUPTION OR CESSATION OF SERVICES</li>
                <li>DAMAGES ARISING FROM BUGS, VIRUSES, OR OTHER HARMFUL CODE</li>
                <li>DAMAGES ARISING FROM ANY CONTENT OR CONDUCT OF THIRD PARTIES</li>
                <li>LOSSES DUE TO MARKET VOLATILITY OR PRICE FLUCTUATIONS</li>
                <li>LOSSES DUE TO CRYPTOCURRENCY NETWORK FAILURES OR DELAYS</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mb-4">
                IN NO EVENT SHALL OUR TOTAL LIABILITY TO YOU EXCEED THE GREATER OF (A) THE FEES YOU PAID TO US IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM, OR (B) ONE HUNDRED DOLLARS ($100).
              </p>
              <p className="text-muted-foreground leading-relaxed">
                SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF CERTAIN WARRANTIES OR LIMITATION OF LIABILITY FOR CONSEQUENTIAL DAMAGES, SO THE ABOVE LIMITATIONS MAY NOT APPLY TO YOU.
              </p>
            </section>

            <section className="glass-card rounded-2xl p-8">
              <h2 className="text-2xl font-display font-semibold mb-4">9. Indemnification</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You agree to defend, indemnify, and hold harmless GAIN-VESTOR, its affiliates, and their respective directors, officers, employees, agents, and licensors from and against any and all claims, damages, obligations, losses, liabilities, costs, or debt, and expenses (including attorney's fees) arising from:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Your access to and use of the Services</li>
                <li>Your violation of any provision of these Terms</li>
                <li>Your violation of any third-party right, including intellectual property rights</li>
                <li>Your violation of any applicable law or regulation</li>
                <li>Any content you submit to or through the Services</li>
                <li>Any activity related to your account, whether by you or any other person accessing your account</li>
              </ul>
            </section>

            <section className="glass-card rounded-2xl p-8">
              <h2 className="text-2xl font-display font-semibold mb-4">10. Dispute Resolution</h2>

              <h3 className="text-lg font-semibold mb-3 mt-6">10.1 Informal Resolution</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Before initiating any formal dispute resolution proceeding, you agree to first contact us and attempt to resolve any dispute informally by sending a written notice describing the dispute to legal@gain-vestor.com. We will attempt to resolve the dispute within 60 days.
              </p>

              <h3 className="text-lg font-semibold mb-3 mt-6">10.2 Binding Arbitration</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If the dispute is not resolved informally, you agree that any controversy or claim arising out of or relating to these Terms or the Services shall be settled by binding arbitration in accordance with the rules of the American Arbitration Association. The arbitration shall take place in New York, New York, and shall be conducted in English. The arbitrator's decision shall be final and binding.
              </p>

              <h3 className="text-lg font-semibold mb-3 mt-6">10.3 Class Action Waiver</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                YOU AGREE THAT ANY CLAIMS AGAINST US WILL BE BROUGHT ONLY IN YOUR INDIVIDUAL CAPACITY AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE PROCEEDING. You further agree that the arbitrator may not consolidate proceedings or claims or otherwise preside over any form of representative or class proceeding.
              </p>

              <h3 className="text-lg font-semibold mb-3 mt-6">10.4 Governing Law</h3>
              <p className="text-muted-foreground leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of the State of New York, United States, without regard to its conflict of law provisions.
              </p>
            </section>

            <section className="glass-card rounded-2xl p-8">
              <h2 className="text-2xl font-display font-semibold mb-4">11. Termination</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We may terminate or suspend your account and access to the Services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms. Upon termination:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                <li>Your right to use the Services will immediately cease</li>
                <li>Any pending orders may be cancelled</li>
                <li>You must withdraw any remaining funds within the timeframe we specify</li>
                <li>We may retain data as required by law or for legitimate business purposes</li>
                <li>Provisions that by their nature should survive termination shall survive</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                You may terminate your account at any time by contacting us or using the account closure feature in your settings. Account closure is subject to completion of pending transactions and resolution of any outstanding issues.
              </p>
            </section>

            <section className="glass-card rounded-2xl p-8">
              <h2 className="text-2xl font-display font-semibold mb-4">12. Force Majeure</h2>
              <p className="text-muted-foreground leading-relaxed">
                We shall not be liable for any failure or delay in performing our obligations where such failure or delay results from circumstances beyond our reasonable control, including but not limited to acts of God, natural disasters, war, terrorism, riots, embargoes, acts of civil or military authorities, fire, floods, accidents, strikes, labor disputes, power failures, equipment or network failures, government actions, blockchain network failures, or cyberattacks.
              </p>
            </section>

            <section className="glass-card rounded-2xl p-8">
              <h2 className="text-2xl font-display font-semibold mb-4">13. Miscellaneous</h2>

              <h3 className="text-lg font-semibold mb-3 mt-6">13.1 Entire Agreement</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                These Terms, together with our Privacy Policy and any other agreements expressly incorporated by reference, constitute the entire agreement between you and GAIN-VESTOR regarding the Services and supersede all prior agreements.
              </p>

              <h3 className="text-lg font-semibold mb-3 mt-6">13.2 Severability</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
              </p>

              <h3 className="text-lg font-semibold mb-3 mt-6">13.3 Waiver</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                No waiver of any provision of these Terms shall be deemed a further or continuing waiver of such provision or any other provision. Our failure to enforce any right or provision shall not constitute a waiver of such right or provision.
              </p>

              <h3 className="text-lg font-semibold mb-3 mt-6">13.4 Assignment</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You may not assign or transfer these Terms or your rights hereunder without our prior written consent. We may assign or transfer these Terms without restriction.
              </p>

              <h3 className="text-lg font-semibold mb-3 mt-6">13.5 Contact Information</h3>
              <p className="text-muted-foreground leading-relaxed">
                For questions about these Terms, please contact us at: legal@gain-vestor.com or write to: GAIN-VESTOR Legal Department, 1234 Financial District, Suite 500, New York, NY 10004, United States.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;
