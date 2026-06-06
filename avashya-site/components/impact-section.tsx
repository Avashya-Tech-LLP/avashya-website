'use client';

import { motion } from 'framer-motion';

const metrics = [
  { value: '10x', label: 'Faster context delivery', sublabel: 'to AI agents' },
  { value: '40%', label: 'Fewer reverts', sublabel: 'from AI-generated PRs' },
  { value: '1 Week', label: 'To first value', sublabel: 'no engineering time required' },
];

export default function ImpactSection() {
  return (
    <section className="relative py-24 sm:py-32" style={{ background: 'var(--color-cream)' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-[11px] font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--color-primary)' }}>
            Business Results
          </p>
          <h2 className="text-[clamp(2rem,5vw,3.2rem)] font-bold leading-[1.15]" style={{ color: 'var(--color-text-primary)' }}>
            Quantifiable Impact
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="text-center p-8 rounded-2xl border relative overflow-hidden"
              style={{ borderColor: 'var(--color-border)', background: 'var(--color-card-bg)' }}
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-4 right-4 h-px" style={{ background: 'var(--color-primary)' }} />

              <motion.span
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.15, type: 'spring' }}
                className="block text-5xl sm:text-6xl font-bold"
                style={{ color: 'var(--color-primary)' }}
              >
                {metric.value}
              </motion.span>
              <p className="text-base font-semibold mt-4" style={{ color: 'var(--color-text-primary)' }}>
                {metric.label}
              </p>
              <p className="text-sm mt-1" style={{ color: 'var(--color-text-tertiary)' }}>
                {metric.sublabel}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="text-center text-xs mt-8" style={{ color: 'var(--color-text-tertiary)' }}>
          Based on early design partner results. Individual results may vary.
        </p>
      </div>
    </section>
  );
}
