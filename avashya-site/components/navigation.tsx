'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import DemoModal from './demo-modal';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Platform', href: '#platform' },
    { label: 'How We Work', href: '#how-we-work' },
    { label: 'Company', href: '#company' },
    { label: 'AWS Services', href: '/aws-services' },
  ];

  return (
    <>
      {/* Top banner */}
      <div className="fixed top-0 left-0 right-0 z-[60] py-2.5 px-4 text-center border-b" style={{ background: 'var(--color-surface-dark)', borderColor: 'rgba(255,255,255,0.06)' }}>
        <p className="text-xs sm:text-sm text-white/90">
          The EEI Framework is now available — a new standard for measuring AI engineering impact.{' '}
          <a href="#thought-leadership" className="font-semibold underline text-white hover:text-purple-300 transition-colors">
            Read the framework →
          </a>
        </p>
      </div>

      {/* Main nav */}
      <nav
        className={`fixed top-[38px] left-4 right-4 z-50 transition-all duration-300 rounded-2xl ${
          isScrolled ? 'shadow-lg backdrop-blur-xl' : ''
        }`}
        style={{ background: isScrolled ? 'var(--color-nav-bg)' : 'var(--color-card-bg)', border: '1px solid var(--color-border)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2">
              <Image src="/logo.png" alt="Avashya" width={120} height={36} className="h-8 w-auto logo-themed" priority />
            </a>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-7">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium transition-colors"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {item.label}
                </a>
              ))}
              <button
                onClick={() => setIsDemoModalOpen(true)}
                className="btn-primary px-5 py-2 text-sm"
              >
                Request Demo
              </button>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
              style={{ color: 'var(--color-text-primary)' }}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t px-4 py-4 space-y-1" style={{ borderColor: 'var(--color-border)' }}>
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block font-medium py-3 px-3 rounded-lg text-sm"
                style={{ color: 'var(--color-text-secondary)' }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="pt-3">
              <button
                onClick={() => { setIsDemoModalOpen(true); setIsMobileMenuOpen(false); }}
                className="w-full btn-primary px-6 py-3 text-sm"
              >
                Request Demo
              </button>
            </div>
          </div>
        )}
      </nav>

      <DemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
    </>
  );
}
