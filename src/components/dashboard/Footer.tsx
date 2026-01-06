import { Coins, Mail, Send, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const footerLinks = {
  company: [
    { label: 'About', href: '/about' },
    { label: 'FAQs', href: '/faq' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms & Conditions', href: '/terms' },
  ],
};

const socialLinks = [
  { label: 'Twitter', icon: 'X', href: 'https://twitter.com' },
  { label: 'Telegram', icon: Send, href: 'https://t.me/JamesRace' },
  { label: 'Discord', icon: 'DC', href: 'https://discord.com' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Footer = () => {
  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className="border-t border-border mt-12 relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-warning/5 rounded-full blur-3xl" />
      </div>
      
      <div className="container py-12 px-4 relative z-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <motion.div variants={itemVariants} className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-warning flex items-center justify-center shadow-lg"
              >
                <Coins className="w-6 h-6 text-primary-foreground" />
              </motion.div>
              <span className="text-xl font-display font-bold text-gradient">WICN</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Worldwide Investment Compensation Network. Your trusted gateway to cryptocurrency investments.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {typeof social.icon === 'string' ? (
                    <span className="text-sm font-bold">{social.icon}</span>
                  ) : (
                    <social.icon className="w-4 h-4" />
                  )}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Company Links */}
          <motion.div variants={itemVariants}>
            <h4 className="font-display font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.label}
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal Links */}
          <motion.div variants={itemVariants}>
            <h4 className="font-display font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.label}
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support Links */}
          <motion.div variants={itemVariants}>
            <h4 className="font-display font-semibold mb-4">Support</h4>
            <ul className="space-y-3">
              <li>
                <motion.a
                  href="mailto:internationalinvestmentcompens@gmail.com"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                  whileHover={{ x: 4 }}
                >
                  <Mail className="w-4 h-4 text-primary" />
                  <span>Email Support</span>
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="https://t.me/JamesRace"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                  whileHover={{ x: 4 }}
                >
                  <Send className="w-4 h-4 text-primary" />
                  <span>Telegram: @JamesRace</span>
                </motion.a>
              </li>
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={itemVariants}>
            <h4 className="font-display font-semibold mb-4">Stay Updated</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Get the latest crypto news and updates.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter email"
                className="flex-1 h-10 px-3 rounded-lg bg-secondary border border-border text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="h-10 px-4 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors"
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          className="border-t border-border mt-12 pt-6 text-center text-sm text-muted-foreground"
        >
          © {new Date().getFullYear()} WICN - Worldwide Investment Compensation Network. All rights reserved.
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
