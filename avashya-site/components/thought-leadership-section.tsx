'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function ThoughtLeadershipSection() {
  return (
    <section className="relative py-20 sm:py-28 mx-4 sm:mx-8">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8 }}
        className="section-dark py-16 sm:py-20 px-6 sm:px-12 relative overflow-hidden rounded-3xl"
      >
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-center max-w-5xl mx-auto">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--color-primary-light)' }}>
              The EEI Framework
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-[1.2] mb-4" style={{ color: 'var(--color-text-on-dark)' }}>
              The Engineering Effectiveness Index
            </h2>
            <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--color-text-on-dark-secondary)' }}>
              A new framework for measuring AI&apos;s real impact on engineering teams. Why lines-of-code and PR count are broken metrics — and what to track instead.
            </p>
            <ul className="space-y-2 mb-8">
              {[
                'The 6 pillars that predict engineering ROI',
                'Why throughput metrics lie in the age of AI',
                'Benchmarks from early-adopter teams',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--color-primary-light)' }} />
                  <span className="text-sm" style={{ color: 'var(--color-text-on-dark-secondary)' }}>{item}</span>
                </li>
              ))}
            </ul>
            <motion.a
              href="#"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all"
              style={{ background: 'var(--color-primary)', color: '#FFFFFF' }}
            >
              Get the Framework <ArrowRight className="w-4 h-4" />
            </motion.a>
          </div>

          {/* Placeholder for report cover / visual */}
          <div
            className="w-64 h-80 rounded-xl border-2 border-dashed flex items-center justify-center flex-shrink-0 hidden lg:flex"
            style={{ borderColor: 'rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.03)' }}
          >
            <div className="text-center px-4">
              <div className="w-12 h-16 mx-auto mb-3 rounded border border-white/20 flex items-center justify-center">
                <span className="text-[10px] text-white/40">PDF</span>
              </div>
              <p className="text-[11px]" style={{ color: 'var(--color-text-on-dark-secondary)' }}>Report Cover</p>
              <p className="text-[10px] mt-1 text-white/30">Generate with LLM</p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
