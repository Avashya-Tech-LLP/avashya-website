'use client';

import { motion } from 'framer-motion';

const tools = [
  'Claude Code', 'GitHub Copilot', 'Cursor', 'Amazon Q', 'Windsurf', 'Kiro',
  'Claude Code', 'GitHub Copilot', 'Cursor', 'Amazon Q', 'Windsurf', 'Kiro',
];

export default function LogosMarquee() {
  return (
    <section className="relative py-16 overflow-hidden" style={{ background: 'var(--color-cream)' }}>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-center text-sm text-text-tertiary mb-8">
          Works with the agents your team already uses
        </p>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, var(--color-cream), transparent)' }} />
          <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, var(--color-cream), transparent)' }} />

          <div className="flex overflow-hidden">
            <div className="flex marquee-track">
              {tools.map((tool, i) => (
                <div key={`${tool}-${i}`} className="flex items-center gap-3 px-10 flex-shrink-0">
                  <div className="w-8 h-8 rounded-lg border flex items-center justify-center" style={{ borderColor: 'var(--color-border)', background: 'var(--color-card-bg)' }}>
                    <span className="text-xs font-semibold" style={{ color: 'var(--color-text-tertiary)' }}>{tool[0]}</span>
                  </div>
                  <span className="text-sm text-text-secondary font-medium whitespace-nowrap">{tool}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
