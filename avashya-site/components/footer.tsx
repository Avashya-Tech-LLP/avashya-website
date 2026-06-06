'use client';

import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-cream border-t border-black/[0.04]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center">
            <Image src="/logo.png" alt="Avashya" width={100} height={30} className="h-7 w-auto logo-themed" />
          </div>

          <div className="flex items-center gap-8">
            <a href="#platform" className="text-xs text-text-tertiary hover:text-text-primary transition-colors">Platform</a>
            <a href="#how-we-work" className="text-xs text-text-tertiary hover:text-text-primary transition-colors">How We Work</a>
            <a href="#company" className="text-xs text-text-tertiary hover:text-text-primary transition-colors">Company</a>
            <a href="/aws-services" className="text-xs text-text-tertiary hover:text-text-primary transition-colors">AWS Services</a>
          </div>

          <p className="text-xs text-text-tertiary">&copy; {currentYear} Avashya</p>
        </div>
      </div>
    </footer>
  );
}
