'use client';

import { Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { label: 'Platform', href: '#platform' },
      { label: 'Services', href: '#services' },
      { label: 'Framework', href: '#framework' },
      { label: 'Pricing', href: '#contact' },
    ],
    company: [
      { label: 'About', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Contact', href: '#contact' },
    ],
    resources: [
      { label: 'Documentation', href: '#' },
      { label: 'ISDLC Guide', href: 'https://isdlc.com' },
      { label: 'Case Studies', href: '#' },
      { label: 'Security', href: '#' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Cookie Policy', href: '#' },
    ],
  };

  const socialLinks = [
    { icon: Mail, href: 'mailto:hello@avashya.com', label: 'Email' },
  ];

  return (
    <footer className="relative bg-bg-secondary border-t border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 sm:gap-10 lg:gap-12 mb-8 sm:mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 sm:col-span-2">
            <div className="flex items-center gap-2.5 sm:gap-3 mb-4">
              <div className="w-9 sm:w-10 h-9 sm:h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-lg sm:text-xl">A</span>
              </div>
              <span className="text-xl sm:text-2xl font-bold text-text-primary">Avashya</span>
            </div>
            <p className="text-sm sm:text-base text-text-tertiary mb-5 sm:mb-6 leading-relaxed">
              Transforming AI coding assistants into measurable productivity multipliers through
              enterprise-grade optimization and governance.
            </p>
            <div className="flex gap-3 sm:gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full glass-effect flex items-center justify-center text-text-tertiary hover:text-primary hover:border-primary/50 transition-all duration-300 min-h-[44px] min-w-[44px]"
                >
                  <social.icon className="w-4 sm:w-5 h-4 sm:h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-sm sm:text-base text-text-primary font-semibold mb-3 sm:mb-4">Product</h3>
            <ul className="space-y-2.5 sm:space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-text-tertiary hover:text-text-primary transition-colors inline-block py-1 min-h-[44px] flex items-center"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm sm:text-base text-text-primary font-semibold mb-3 sm:mb-4">Company</h3>
            <ul className="space-y-2.5 sm:space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-text-tertiary hover:text-text-primary transition-colors inline-block py-1 min-h-[44px] flex items-center"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-sm sm:text-base text-text-primary font-semibold mb-3 sm:mb-4">Resources</h3>
            <ul className="space-y-2.5 sm:space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-text-tertiary hover:text-text-primary transition-colors inline-block py-1 min-h-[44px] flex items-center"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-sm sm:text-base text-text-primary font-semibold mb-3 sm:mb-4">Legal</h3>
            <ul className="space-y-2.5 sm:space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-text-tertiary hover:text-text-primary transition-colors inline-block py-1 min-h-[44px] flex items-center"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-6 sm:pt-8 border-t border-primary/10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 text-center sm:text-left">
            <p className="text-text-tertiary text-xs sm:text-sm">
              © {currentYear} Avashya. All rights reserved.
            </p>
            <p className="text-text-tertiary text-xs sm:text-sm">
              Built for engineering teams optimizing AI workflows
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
