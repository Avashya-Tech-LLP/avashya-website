'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import DemoModal from './demo-modal';

export default function HeroSection() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [email, setEmail] = useState('');

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: 'var(--color-cream)' }}>
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 sm:pt-48 pb-20">
        {/* Partner badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border" style={{ borderColor: 'var(--color-border)', background: 'var(--color-card-bg)' }}>
            {/* Placeholder for Claude/Anthropic partner logo */}
            <div className="w-5 h-5 rounded bg-[#D97706] flex items-center justify-center">
              <span className="text-[9px] font-bold text-white">C</span>
            </div>
            <span className="text-xs font-semibold" style={{ color: 'var(--color-text-primary)' }}>Official Claude Partner</span>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border" style={{ borderColor: 'var(--color-border)', background: 'var(--color-card-bg)' }}>
            {/* Placeholder for AWS partner logo */}
            <div className="w-5 h-5 rounded bg-[#FF9900] flex items-center justify-center">
              <span className="text-[9px] font-bold text-white">A</span>
            </div>
            <span className="text-xs font-semibold" style={{ color: 'var(--color-text-primary)' }}>AWS Advanced Tier Partner</span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-center text-[clamp(2.5rem,7vw,5.5rem)] font-bold tracking-tight leading-[1.05]"
          style={{ color: 'var(--color-text-primary)' }}
        >
          Engineer AI Into
          <br />
          Your <span className="heading-serif" style={{ color: 'var(--color-primary)' }}>Core Operations</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-6 text-center text-[clamp(1.05rem,2.2vw,1.3rem)] max-w-2xl mx-auto leading-relaxed"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          We embed production AI systems into engineering organizations, from coding agents to intelligent automation. Deep AWS infrastructure expertise meets hands-on delivery that drives measurable transformation, not slide decks.
        </motion.p>

        {/* Email capture CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row gap-3 justify-center items-center max-w-md mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your work email"
            className="w-full sm:flex-1 px-5 py-3.5 rounded-full border text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-purple-300"
            style={{ borderColor: 'var(--color-border)', background: 'var(--color-card-bg)', color: 'var(--color-text-primary)' }}
          />
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsDemoModalOpen(true)}
            className="btn-primary px-6 py-3.5 text-sm font-semibold inline-flex items-center gap-2 whitespace-nowrap"
          >
            <span>Request Demo</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>

        {/* Secondary CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-4 text-center"
        >
          <a href="#platform" className="text-sm font-medium transition-colors hover:underline" style={{ color: 'var(--color-text-tertiary)' }}>
            See the platform →
          </a>
        </motion.div>

        {/* Hero image placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-16 sm:mt-20 max-w-4xl mx-auto"
        >
          <div
            className="w-full aspect-[16/9] rounded-2xl border-2 border-dashed flex items-center justify-center"
            style={{ borderColor: 'var(--color-border)', background: 'var(--color-section-alt)' }}
          >
            <div className="text-center px-6">
              <div className="w-16 h-16 rounded-xl mx-auto mb-4 flex items-center justify-center" style={{ background: 'var(--color-border)' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--color-text-tertiary)' }}>
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
              </div>
              <p className="text-sm font-medium" style={{ color: 'var(--color-text-tertiary)' }}>Product Screenshot / Hero Banner</p>
              <p className="text-xs mt-1" style={{ color: 'var(--color-text-tertiary)' }}>Generate with LLM, 1200x675px recommended</p>
            </div>
          </div>
        </motion.div>
      </div>

      <DemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
    </section>
  );
}
