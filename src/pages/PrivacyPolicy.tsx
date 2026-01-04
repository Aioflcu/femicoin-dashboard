import Header from '@/components/dashboard/Header';
import Footer from '@/components/dashboard/Footer';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl font-display font-bold mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: January 4, 2026</p>
          </div>

          <div className="prose prose-invert max-w-none space-y-8">
            <section className="glass-card rounded-2xl p-8">
              <h2 className="text-2xl font-display font-semibold mb-4">1. Introduction</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Worldwide Investment Compensation Network ("WICN," "we," "us," or "our") is committed to protecting your privacy and personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, mobile application, and use our services.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                By accessing or using our services, you acknowledge that you have read, understood, and agree to be bound by all the terms of this Privacy Policy. If you do not agree with this Privacy Policy, please do not access or use our services.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to make changes to this Privacy Policy at any time and for any reason. We will alert you about any changes by updating the "Last updated" date of this Privacy Policy. You are encouraged to periodically review this Privacy Policy to stay informed of updates.
              </p>
            </section>

            <section className="glass-card rounded-2xl p-8">
              <h2 className="text-2xl font-display font-semibold mb-4">2. Information We Collect</h2>
              
              <h3 className="text-lg font-semibold mb-3 mt-6">2.1 Personal Information</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We may collect personal information that you voluntarily provide to us when registering for an account, making a purchase, subscribing to our newsletter, participating in activities on our platform, or otherwise contacting us. This information may include:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                <li>Full legal name and date of birth</li>
                <li>Email address and phone number</li>
                <li>Residential address and billing address</li>
                <li>Government-issued identification documents</li>
                <li>Social Security Number or Tax Identification Number (where legally required)</li>
                <li>Bank account and payment card information</li>
                <li>Employment information and source of funds</li>
                <li>Photographs and biometric data for identity verification</li>
                <li>Username, password, and account preferences</li>
              </ul>

              <h3 className="text-lg font-semibold mb-3 mt-6">2.2 Automatically Collected Information</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                When you access our services, we automatically collect certain information about your device and usage, including:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                <li>Device type, operating system, and browser type</li>
                <li>IP address, geographic location, and time zone</li>
                <li>Pages visited, links clicked, and features used</li>
                <li>Date and time of access and duration of sessions</li>
                <li>Referring websites and search terms used</li>
                <li>Error logs and performance data</li>
                <li>Device identifiers and mobile advertising identifiers</li>
              </ul>

              <h3 className="text-lg font-semibold mb-3 mt-6">2.3 Financial and Transaction Information</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                To facilitate transactions and provide our services, we collect:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                <li>Cryptocurrency wallet addresses and transaction history</li>
                <li>Trading activity, orders, and portfolio data</li>
                <li>Deposit and withdrawal records</li>
                <li>Payment method details and transaction amounts</li>
                <li>Account balances and trading preferences</li>
              </ul>

              <h3 className="text-lg font-semibold mb-3 mt-6">2.4 Information from Third Parties</h3>
              <p className="text-muted-foreground leading-relaxed">
                We may receive information about you from third parties, including identity verification services, credit bureaus, fraud prevention providers, marketing partners, social media platforms when you link your accounts, and blockchain analytics providers.
              </p>
            </section>

            <section className="glass-card rounded-2xl p-8">
              <h2 className="text-2xl font-display font-semibold mb-4">3. How We Use Your Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We use the information we collect for various purposes, including but not limited to:
              </p>

              <h3 className="text-lg font-semibold mb-3 mt-6">3.1 Providing and Improving Services</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                <li>Creating and managing your account</li>
                <li>Processing transactions and trades</li>
                <li>Providing customer support and responding to inquiries</li>
                <li>Personalizing your experience and recommendations</li>
                <li>Developing new features and improving existing services</li>
                <li>Analyzing usage patterns to optimize platform performance</li>
              </ul>

              <h3 className="text-lg font-semibold mb-3 mt-6">3.2 Security and Fraud Prevention</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                <li>Verifying your identity and detecting fraudulent activity</li>
                <li>Protecting against unauthorized access and security threats</li>
                <li>Monitoring transactions for suspicious behavior</li>
                <li>Enforcing our terms of service and policies</li>
                <li>Conducting internal audits and investigations</li>
              </ul>

              <h3 className="text-lg font-semibold mb-3 mt-6">3.3 Legal and Regulatory Compliance</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                <li>Complying with anti-money laundering (AML) regulations</li>
                <li>Fulfilling know-your-customer (KYC) requirements</li>
                <li>Responding to legal processes and government requests</li>
                <li>Maintaining records as required by law</li>
                <li>Reporting suspicious activities to relevant authorities</li>
              </ul>

              <h3 className="text-lg font-semibold mb-3 mt-6">3.4 Marketing and Communications</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Sending promotional materials and newsletters (with your consent)</li>
                <li>Notifying you about account activity and important updates</li>
                <li>Conducting surveys and collecting feedback</li>
                <li>Tailoring advertisements based on your interests</li>
              </ul>
            </section>

            <section className="glass-card rounded-2xl p-8">
              <h2 className="text-2xl font-display font-semibold mb-4">4. Information Sharing and Disclosure</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We may share your information in the following circumstances:
              </p>

              <h3 className="text-lg font-semibold mb-3 mt-6">4.1 Service Providers</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We engage third-party companies and individuals to perform services on our behalf, such as payment processing, identity verification, cloud hosting, customer support, marketing, and analytics. These service providers have access only to the information needed to perform their functions and are obligated to maintain confidentiality.
              </p>

              <h3 className="text-lg font-semibold mb-3 mt-6">4.2 Legal Requirements</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We may disclose your information when required by law, regulation, legal process, or governmental request, including but not limited to court orders, subpoenas, tax audits, and regulatory examinations. We may also disclose information to protect our rights, property, or safety, or that of our users or the public.
              </p>

              <h3 className="text-lg font-semibold mb-3 mt-6">4.3 Business Transfers</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                In the event of a merger, acquisition, bankruptcy, or sale of all or a portion of our assets, your information may be transferred to the acquiring entity. We will notify you of any such change in ownership or control of your personal information.
              </p>

              <h3 className="text-lg font-semibold mb-3 mt-6">4.4 With Your Consent</h3>
              <p className="text-muted-foreground leading-relaxed">
                We may share your information for other purposes with your explicit consent or at your direction.
              </p>
            </section>

            <section className="glass-card rounded-2xl p-8">
              <h2 className="text-2xl font-display font-semibold mb-4">5. Data Security</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We implement comprehensive security measures to protect your personal information, including:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                <li>256-bit SSL/TLS encryption for all data transmission</li>
                <li>AES-256 encryption for data at rest</li>
                <li>Multi-factor authentication requirements</li>
                <li>Regular security audits and penetration testing</li>
                <li>Employee access controls and security training</li>
                <li>Intrusion detection and prevention systems</li>
                <li>Cold storage solutions for cryptocurrency assets</li>
                <li>24/7 security monitoring and incident response</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                Despite our efforts, no security system is impenetrable. We cannot guarantee the absolute security of your information, and any transmission of personal information is at your own risk. You are responsible for maintaining the security of your account credentials.
              </p>
            </section>

            <section className="glass-card rounded-2xl p-8">
              <h2 className="text-2xl font-display font-semibold mb-4">6. Data Retention</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We retain your personal information for as long as necessary to fulfill the purposes for which it was collected, including to satisfy legal, accounting, or reporting requirements. The specific retention periods depend on the type of information and the purposes for which it is used:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Account information: Retained while your account is active and for 7 years after closure</li>
                <li>Transaction records: Retained for a minimum of 5-7 years as required by financial regulations</li>
                <li>Identity verification documents: Retained for 5 years after the end of the business relationship</li>
                <li>Communication records: Retained for 3 years after the last interaction</li>
                <li>Marketing preferences: Retained until you withdraw consent</li>
                <li>Technical logs: Typically retained for 90 days</li>
              </ul>
            </section>

            <section className="glass-card rounded-2xl p-8">
              <h2 className="text-2xl font-display font-semibold mb-4">7. Your Rights and Choices</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Depending on your jurisdiction, you may have certain rights regarding your personal information:
              </p>

              <h3 className="text-lg font-semibold mb-3 mt-6">7.1 Access and Portability</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You have the right to request a copy of your personal information in a structured, commonly used format. You can access much of this information directly through your account settings.
              </p>

              <h3 className="text-lg font-semibold mb-3 mt-6">7.2 Correction</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You have the right to request correction of inaccurate or incomplete personal information. You can update many details directly in your account settings or by contacting support.
              </p>

              <h3 className="text-lg font-semibold mb-3 mt-6">7.3 Deletion</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You may request deletion of your personal information, subject to certain exceptions such as legal retention requirements, fraud prevention, or completing transactions. Account deletion requests can be submitted through your account settings.
              </p>

              <h3 className="text-lg font-semibold mb-3 mt-6">7.4 Opt-Out</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You can opt out of marketing communications by clicking the unsubscribe link in emails or updating your preferences in account settings. Note that you cannot opt out of transactional or security-related communications.
              </p>

              <h3 className="text-lg font-semibold mb-3 mt-6">7.5 Do Not Track</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our website does not currently respond to "Do Not Track" browser signals. However, you can manage cookies and tracking through your browser settings.
              </p>
            </section>

            <section className="glass-card rounded-2xl p-8">
              <h2 className="text-2xl font-display font-semibold mb-4">8. Cookies and Tracking Technologies</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We use cookies and similar tracking technologies to enhance your experience, analyze usage, and deliver personalized content. Types of cookies we use include:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                <li><strong>Essential Cookies:</strong> Required for basic site functionality and security</li>
                <li><strong>Performance Cookies:</strong> Help us understand how visitors interact with our site</li>
                <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
                <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                You can manage cookie preferences through your browser settings. Disabling certain cookies may affect the functionality of our services.
              </p>
            </section>

            <section className="glass-card rounded-2xl p-8">
              <h2 className="text-2xl font-display font-semibold mb-4">9. International Data Transfers</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Your information may be transferred to and processed in countries other than your country of residence. These countries may have different data protection laws. When we transfer data internationally, we implement appropriate safeguards such as:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Standard contractual clauses approved by relevant authorities</li>
                <li>Data processing agreements with recipients</li>
                <li>Certification under recognized privacy frameworks</li>
                <li>Binding corporate rules for intra-group transfers</li>
              </ul>
            </section>

            <section className="glass-card rounded-2xl p-8">
              <h2 className="text-2xl font-display font-semibold mb-4">10. Children's Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our services are not intended for individuals under the age of 18 (or the age of majority in your jurisdiction). We do not knowingly collect personal information from children. If we learn that we have collected personal information from a child without parental consent, we will take steps to delete that information promptly. If you believe a child has provided us with personal information, please contact us.
              </p>
            </section>

            <section className="glass-card rounded-2xl p-8">
              <h2 className="text-2xl font-display font-semibold mb-4">11. California Privacy Rights</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA), including:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Right to know what personal information is collected and how it is used</li>
                <li>Right to delete personal information (subject to exceptions)</li>
                <li>Right to opt out of the sale or sharing of personal information</li>
                <li>Right to non-discrimination for exercising privacy rights</li>
                <li>Right to correct inaccurate personal information</li>
                <li>Right to limit use of sensitive personal information</li>
              </ul>
            </section>

            <section className="glass-card rounded-2xl p-8">
              <h2 className="text-2xl font-display font-semibold mb-4">12. European Privacy Rights</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you are in the European Economic Area (EEA) or United Kingdom, you have rights under the General Data Protection Regulation (GDPR) including all rights mentioned above, plus the right to lodge a complaint with a supervisory authority.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our legal bases for processing your information include: performance of a contract, compliance with legal obligations, legitimate interests (such as fraud prevention and security), and your consent where applicable.
              </p>
            </section>

            <section className="glass-card rounded-2xl p-8">
              <h2 className="text-2xl font-display font-semibold mb-4">13. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="text-muted-foreground">
                <p><strong>Email:</strong> privacy@wicn.com</p>
                <p><strong>Data Protection Officer:</strong> dpo@wicn.com</p>
                <p><strong>Address:</strong> WICN Privacy Team, 1234 Financial District, Suite 500, New York, NY 10004, United States</p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
