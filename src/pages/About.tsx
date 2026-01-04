import Header from '@/components/dashboard/Header';
import Footer from '@/components/dashboard/Footer';
import { Shield, Users, Globe, Award, TrendingUp, Lock, Headphones, Zap } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Shield,
      title: 'Security First',
      description: 'We employ military-grade encryption and multi-factor authentication to ensure your assets remain protected at all times.',
    },
    {
      icon: Users,
      title: 'User-Centric',
      description: 'Every feature we build is designed with our users in mind, ensuring an intuitive and seamless experience.',
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Operating across 180+ countries, we provide access to cryptocurrency markets for millions worldwide.',
    },
    {
      icon: Award,
      title: 'Industry Leading',
      description: 'Recognized as a top platform by major financial publications and trusted by institutional investors.',
    },
  ];

  const stats = [
    { value: '$50B+', label: 'Trading Volume' },
    { value: '10M+', label: 'Active Users' },
    { value: '180+', label: 'Countries' },
    { value: '500+', label: 'Cryptocurrencies' },
  ];

  const team = [
    {
      name: 'Alexandra Chen',
      role: 'Chief Executive Officer',
      description: 'Former Goldman Sachs VP with 15+ years in financial technology.',
    },
    {
      name: 'Marcus Williams',
      role: 'Chief Technology Officer',
      description: 'Ex-Google engineer, blockchain pioneer since 2013.',
    },
    {
      name: 'Sarah Johnson',
      role: 'Chief Security Officer',
      description: 'Former NSA cybersecurity specialist with expertise in cryptographic systems.',
    },
    {
      name: 'David Park',
      role: 'Chief Financial Officer',
      description: 'Previously CFO at multiple Fortune 500 fintech companies.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              About <span className="text-gradient">WICN</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Worldwide Investment Compensation Network (WICN) is a global leader in cryptocurrency investment 
              and portfolio management. Founded in 2019, we've helped millions of investors navigate the 
              exciting world of digital assets with confidence and security.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="container py-16 px-4 border-t border-border">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-display font-bold mb-6">Our Mission</h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  At WICN, our mission is to democratize access to cryptocurrency investments and provide 
                  every individual with the tools, knowledge, and security needed to build their financial future.
                </p>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  We believe that the future of finance is decentralized, and we're committed to being at the 
                  forefront of this revolution. Through innovative technology, educational resources, and 
                  uncompromising security, we empower our users to take control of their financial destiny.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Our platform combines institutional-grade security with consumer-friendly interfaces, 
                  making cryptocurrency accessible to everyone from first-time investors to seasoned traders.
                </p>
              </div>
              <div className="glass-card rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat) => (
                    <div key={stat.label} className="text-center">
                      <p className="text-3xl font-display font-bold text-primary mb-2">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="container py-16 px-4 border-t border-border">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-center mb-12">Our Core Values</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value) => (
                <div key={value.title} className="glass-card rounded-2xl p-6 text-center">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold mb-3">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership Section */}
        <section className="container py-16 px-4 border-t border-border">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-center mb-12">Leadership Team</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member) => (
                <div key={member.name} className="glass-card rounded-2xl p-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-warning flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary-foreground">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="font-display font-semibold text-center mb-1">{member.name}</h3>
                  <p className="text-sm text-primary text-center mb-3">{member.role}</p>
                  <p className="text-xs text-muted-foreground text-center">{member.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="container py-16 px-4 border-t border-border">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-center mb-12">Why Choose WICN?</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-success" />
                </div>
                <div>
                  <h3 className="font-display font-semibold mb-2">Competitive Returns</h3>
                  <p className="text-sm text-muted-foreground">
                    Our advanced trading algorithms and market analysis tools help maximize your investment returns while managing risk effectively.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Lock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-semibold mb-2">Bank-Grade Security</h3>
                  <p className="text-sm text-muted-foreground">
                    With cold storage solutions, multi-signature wallets, and 24/7 security monitoring, your assets are always protected.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center flex-shrink-0">
                  <Headphones className="w-6 h-6 text-warning" />
                </div>
                <div>
                  <h3 className="font-display font-semibold mb-2">24/7 Expert Support</h3>
                  <p className="text-sm text-muted-foreground">
                    Our dedicated support team is available around the clock to assist you with any questions or concerns.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-destructive" />
                </div>
                <div>
                  <h3 className="font-display font-semibold mb-2">Lightning Fast</h3>
                  <p className="text-sm text-muted-foreground">
                    Execute trades in milliseconds with our high-performance trading infrastructure built for speed and reliability.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
