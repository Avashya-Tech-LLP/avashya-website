'use client';

import { motion } from 'framer-motion';

const integrations = [
  'Claude Code', 'GitHub Copilot', 'Cursor', 'Amazon Q', 'Windsurf', 'Kiro',
];

export default function SocialProofBar() {
  return (
    <section className="relative py-16 border-y" style={{ background: 'var(--color-cream)', borderColor: 'var(--color-border)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Customer logos row - placeholder */}
          <div className="mb-10">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-center mb-6" style={{ color: 'var(--color-text-tertiary)' }}>
              Built for engineering teams at
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
              {['Enterprise SaaS', 'AI-Native Startups', 'Fortune 500', 'AWS Organizations'].map((type) => (
                <div
                  key={type}
                  className="px-6 py-3 rounded-lg border-2 border-dashed flex items-center justify-center"
                  style={{ borderColor: 'var(--color-border)' }}
                >
                  <span className="text-xs font-medium" style={{ color: 'var(--color-text-tertiary)' }}>{type} Logo</span>
                </div>
              ))}
            </div>
          </div>

          {/* Integrations row */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-center mb-6" style={{ color: 'var(--color-text-tertiary)' }}>
              Works with the tools your team already uses
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
              {integrations.map((tool) => (
                <div key={tool} className="flex items-center gap-2.5">
                  <div
                    className="w-8 h-8 rounded-lg border flex items-center justify-center"
                    style={{ borderColor: 'var(--color-border)', background: 'var(--color-card-bg)' }}
                  >
                    <span className="text-xs font-bold" style={{ color: 'var(--color-text-tertiary)' }}>{tool[0]}</span>
                  </div>
                  <span className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>{tool}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
