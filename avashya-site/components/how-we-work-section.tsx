'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function HowWeWorkSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start center', 'end center'] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const steps = [
    {
      number: '01',
      title: 'Assess',
      description: 'We analyze your team\'s current agent usage — context efficiency, iteration overhead, adoption gaps — and establish your baseline EEI score.',
      detail: 'Takes 1 week. No engineering time required.',
      gradient: 'from-purple-500/20 to-transparent',
    },
    {
      number: '02',
      title: 'Instrument',
      description: 'We deploy the Avashya platform across your agents and teams. Within days, you see exactly what\'s working and what\'s costing you.',
      detail: 'Connects to Claude Code, Copilot, and Cursor out of the box.',
      gradient: 'from-blue-500/20 to-transparent',
    },
    {
      number: '03',
      title: 'Optimize',
      description: 'We run targeted playbooks — model routing, context engineering, review policy tuning — and measure the impact against your baseline.',
      detail: 'Continuous improvement, not a one-time audit.',
      gradient: 'from-green-500/20 to-transparent',
    },
  ];

  return (
    <section id="how-we-work" ref={containerRef} className="relative py-32 sm:py-40" style={{ background: 'var(--color-section-alt)' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20 sm:mb-28"
        >
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold text-text-primary leading-[1.15] mb-5">
            How we <span className="heading-serif">work</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-lg mx-auto">
            White-glove engagement. We do the hard work so your engineers ship code.
          </p>
        </motion.div>

        <div className="relative">
          {/* Progress line */}
          <div className="absolute left-[19px] sm:left-[23px] top-0 bottom-0 w-px bg-black/[0.06]">
            <motion.div style={{ scaleY: lineScale, transformOrigin: 'top' }} className="w-full h-full bg-gradient-to-b from-primary/60 to-primary/20" />
          </div>

          <div className="space-y-16 sm:space-y-24">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40, filter: 'blur(6px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="relative pl-14 sm:pl-16"
              >
                {/* Animated dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="absolute left-2 sm:left-3 top-2 w-4 h-4 rounded-full border-2 border-primary flex items-center justify-center"
                  style={{ background: 'var(--color-section-alt)' }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                    className="w-1.5 h-1.5 rounded-full bg-primary"
                  />
                </motion.div>

                <span className="text-[11px] font-mono text-text-tertiary">{step.number}</span>
                <h3 className="text-2xl sm:text-3xl font-bold text-text-primary mt-1 mb-3">{step.title}</h3>
                <p className="text-base sm:text-lg text-text-secondary leading-relaxed mb-2 max-w-lg">{step.description}</p>
                <p className="text-sm text-text-tertiary">{step.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
