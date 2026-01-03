import { Coins } from 'lucide-react';

const footerLinks = {
  company: [
    { label: 'About', href: '#' },
    { label: 'FAQs', href: '#' },
    { label: 'Support', href: '#' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms & Conditions', href: '#' },
  ],
};

const socialLinks = [
  { label: 'Twitter', icon: 'X', href: '#' },
  { label: 'Telegram', icon: 'TG', href: '#' },
  { label: 'Discord', icon: 'DC', href: '#' },
];

const Footer = () => {
  return (
    <footer className="border-t border-border mt-12">
      <div className="container py-12 px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-warning flex items-center justify-center">
                <Coins className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-display font-bold text-gradient">FemiCoin</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Your trusted gateway to the world of cryptocurrency. Trade securely and confidently.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label={social.label}
                >
                  <span className="text-sm font-bold">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-display font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-display font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-display font-semibold mb-4">Stay Updated</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Get the latest crypto news and updates.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter email"
                className="flex-1 h-10 px-3 rounded-lg bg-secondary border border-border text-sm focus:border-primary focus:outline-none transition-colors"
              />
              <button className="h-10 px-4 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} FemiCoin. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
