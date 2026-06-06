'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import DemoModal from './demo-modal';

export default function FinalCtaSection() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  return (
    <section className="relative py-20 sm:py-32 mx-4 sm:mx-8 mb-8">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="section-dark py-24 sm:py-32 px-4 sm:px-8 text-center relative overflow-hidden"
      >
        <div className="relative z-10 max-w-2xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.15] mb-6"
          >
            <span style={{ color: 'var(--color-text-on-dark)' }}>Know if your AI investment is working.</span>
            <br />
            <span className="heading-serif" style={{ color: 'var(--color-text-on-dark-secondary)' }}>Fix it if it&apos;s not.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg mb-10" style={{ color: 'var(--color-text-on-dark-secondary)' }}
          >
            30 minutes. See your engineering org through the lens of the Avashya Intelligence Platform.
          </motion.p>

          {/* Partner badges in CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div className="w-4 h-4 rounded bg-[#D97706] flex items-center justify-center">
                <span className="text-[8px] font-bold text-white">C</span>
              </div>
              <span className="text-[11px] text-white/70">Claude Partner</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div className="w-4 h-4 rounded bg-[#FF9900] flex items-center justify-center">
                <span className="text-[8px] font-bold text-white">A</span>
              </div>
              <span className="text-[11px] text-white/70">AWS Advanced Partner</span>
            </div>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(139, 92, 246, 0.3)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsDemoModalOpen(true)}
            className="px-10 py-4 text-base font-semibold rounded-full inline-flex items-center gap-2.5"
            style={{ background: 'var(--color-primary)', color: '#FFFFFF' }}
          >
            <span>Request Demo</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </motion.div>

      <DemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
    </section>
  );
}
