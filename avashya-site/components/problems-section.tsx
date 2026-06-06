'use client';

import { motion } from 'framer-motion';

const problems = [
  {
    tag: 'AI TOOL SPRAWL',
    headline: 'Turn agent chaos into coordinated velocity',
    description: 'Multiple AI coding tools across teams with no unified view. You\'re paying for seats you can\'t measure.',
    color: '#8B5CF6',
  },
  {
    tag: 'INVISIBLE ROI',
    headline: 'Turn AI spend into proven returns',
    description: 'Leadership asks "is Copilot worth it?" and you don\'t have a number. Avashya gives you one.',
    color: '#EF4444',
  },
  {
    tag: 'QUALITY REGRESSIONS',
    headline: 'Catch AI-generated rework before it ships',
    description: 'AI-written PRs that get reverted cost more than manual ones. Know which agents produce quality.',
    color: '#F59E0B',
  },
  {
    tag: 'ADOPTION STALLS',
    headline: 'Get every engineer from skeptic to power user',
    description: 'Some teams hit 90% adoption, others stall at 30%. See why and fix it with targeted playbooks.',
    color: '#10B981',
  },
];

export default function ProblemsSection() {
  return (
    <section className="relative py-24 sm:py-32" style={{ background: 'var(--color-cream)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-[11px] font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--color-primary)' }}>
            Problems We Solve
          </p>
          <h2 className="text-[clamp(2rem,5vw,3.2rem)] font-bold leading-[1.15]" style={{ color: 'var(--color-text-primary)' }}>
            Run engineering faster with AI
            <br />
            <span className="heading-serif" style={{ color: 'var(--color-primary)' }}>that knows how you deliver</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {problems.map((problem, i) => (
            <motion.div
              key={problem.tag}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="p-8 rounded-2xl border transition-all duration-300 hover:shadow-lg group"
              style={{ borderColor: 'var(--color-border)', background: 'var(--color-card-bg)' }}
            >
              <span
                className="text-[10px] font-bold uppercase tracking-widest"
                style={{ color: problem.color }}
              >
                {problem.tag}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold mt-3 mb-3" style={{ color: 'var(--color-text-primary)' }}>
                {problem.headline}
              </h3>
              <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--color-text-secondary)' }}>
                {problem.description}
              </p>

              {/* Placeholder for illustration/chart */}
              <div
                className="w-full h-32 rounded-xl border-2 border-dashed flex items-center justify-center"
                style={{ borderColor: 'var(--color-border)', background: 'var(--color-section-alt)' }}
              >
                <span className="text-[11px]" style={{ color: 'var(--color-text-tertiary)' }}>Chart / Visual — generate with LLM</span>
              </div>

              <a
                href="#platform"
                className="inline-flex items-center gap-1.5 mt-5 text-sm font-semibold transition-colors"
                style={{ color: problem.color }}
              >
                Learn more <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
