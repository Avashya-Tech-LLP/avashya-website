'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, TrendingDown, Clock, Shield } from 'lucide-react';

export default function ProblemSection() {
  const problems = [
    {
      icon: TrendingDown,
      stat: '70%',
      title: 'Context Waste',
      description: 'Engineers spend more time explaining context to AI assistants than writing code',
    },
    {
      icon: Clock,
      stat: '3-5x',
      title: 'Iteration Overhead',
      description: 'Back-and-forth cycles consume engineering hours with inconsistent agent outputs',
    },
    {
      icon: Shield,
      stat: '0%',
      title: 'Governance Blind Spots',
      description: 'No visibility into what agents access, modify, or leak across your codebase',
    },
    {
      icon: AlertTriangle,
      stat: '40%',
      title: 'Adoption Gap',
      description: 'Teams abandon AI tools after initial excitement due to unreliable results',
    },
  ];

  return (
    <section className="relative py-24 md:py-32 bg-bg-secondary overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at center, rgba(139, 92, 246, 0.4) 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect mb-6">
            <AlertTriangle className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-text-secondary">The Efficiency Gap</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
            AI Coding Assistants Promise Velocity.
            <br />
            <span className="gradient-text">Reality Delivers Chaos.</span>
          </h2>

          <p className="text-xl text-text-secondary leading-relaxed">
            Your team adopted Claude, Copilot, or Cursor. Yet engineering throughput hasn't scaled.
            The problem isn't the AI—it's the <span className="text-primary font-semibold">absence of optimization infrastructure</span>.
          </p>
        </motion.div>

        {/* Problems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-effect rounded-2xl p-6 hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <problem.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-5xl font-bold gradient-text">
                  {problem.stat}
                </div>
              </div>

              <h3 className="text-xl font-semibold text-text-primary mb-2">
                {problem.title}
              </h3>

              <p className="text-text-tertiary leading-relaxed">
                {problem.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="glass-effect rounded-2xl p-8 max-w-4xl mx-auto border-primary/20">
            <p className="text-lg text-text-primary mb-4">
              <span className="font-semibold text-primary">Avashya</span> transforms this efficiency gap into measurable gains—
              by treating coding agents as <span className="font-semibold">production systems that require observability, governance, and optimization</span>.
            </p>
            <p className="text-text-secondary">
              We map your current state to the AI Development Life Cycle (AIDLC) and implement the infrastructure layer missing from every AI coding workflow.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
