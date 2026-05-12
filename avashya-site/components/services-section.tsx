'use client';

import { motion } from 'framer-motion';
import { Target, GitBranch, Gauge, Users, Workflow, CheckCircle2 } from 'lucide-react';

export default function ServicesSection() {
  const effectivenessMetrics = [
    { label: 'Context Utilization Rate', description: 'Tokens used productively vs. wasted' },
    { label: 'Agent Iteration Efficiency', description: 'Time to acceptable output' },
    { label: 'Code Quality Delta', description: 'Pre vs. post-agent review cycles' },
    { label: 'Team Adoption Velocity', description: 'Active users vs. licensed seats' },
  ];

  const aidlcPhases = [
    {
      phase: 'Discovery',
      focus: 'Context Management',
      description: 'Optimize prompt templates, codebase indexing, and knowledge retrieval',
    },
    {
      phase: 'Development',
      focus: 'Agent Orchestration',
      description: 'Coordinate multi-agent workflows for complex refactors and features',
    },
    {
      phase: 'Testing',
      focus: 'Quality Gates',
      description: 'Automated validation of agent-generated code against your standards',
    },
    {
      phase: 'Deployment',
      focus: 'Ship Confidence',
      description: 'Pre-merge checks and rollback procedures for agent contributions',
    },
  ];

  return (
    <section id="services" className="relative py-24 md:py-32 bg-bg-primary">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Service 1: Coding Agent Optimization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect mb-6">
                <Target className="w-4 h-4 text-secondary" />
                <span className="text-sm font-medium text-text-secondary">Service 01</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
                Coding Agent
                <br />
                <span className="gradient-text">Optimization</span>
              </h2>

              <p className="text-xl text-text-secondary mb-8 leading-relaxed">
                We don't teach your engineers to prompt better. We engineer the <span className="text-primary font-semibold">system</span> around
                your agents to eliminate inefficiency and ensure consistent, measurable output.
              </p>

              <div className="space-y-4">
                {effectivenessMetrics.map((metric, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-text-primary font-semibold">{metric.label}</p>
                      <p className="text-text-tertiary text-sm">{metric.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="glass-effect rounded-2xl p-8 border-primary/20">
                <Gauge className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-2xl font-bold text-text-primary mb-3">
                  Engineering Effectiveness Index
                </h3>
                <p className="text-text-secondary leading-relaxed mb-6">
                  Our proprietary benchmark quantifies your team's AI-assisted output quality,
                  iteration speed, and context efficiency—across the entire AIDLC.
                </p>
                <div className="h-2 bg-bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '75%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.3 }}
                    className="h-full bg-gradient-to-r from-primary to-secondary"
                  />
                </div>
                <p className="text-sm text-text-tertiary mt-2">Baseline → Optimized State</p>
              </div>

              <div className="glass-effect rounded-2xl p-8">
                <Users className="w-10 h-10 text-secondary mb-4" />
                <h3 className="text-2xl font-bold text-text-primary mb-3">
                  Team Agent Orchestration
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  Coordinate multiple agents (coding, review, testing) across your team's workflow.
                  Centralized policies, unified observability, and conflict-free collaboration.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* AIDLC Framework Mapping */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-effect rounded-3xl p-8 md:p-12 border-primary/20"
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect mb-6">
              <Workflow className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-text-secondary">The Framework</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Mapped to the <span className="gradient-text">AI Development Life Cycle</span>
            </h3>
            <p className="text-text-secondary max-w-2xl mx-auto">
              We identify gaps at each AIDLC phase and implement optimization infrastructure specific to your workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aidlcPhases.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-bg-secondary rounded-2xl p-6 h-full border border-primary/10 hover:border-primary/30 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                      {index + 1}
                    </div>
                    <GitBranch className="w-5 h-5 text-primary" />
                  </div>

                  <h4 className="text-xl font-bold text-text-primary mb-2">
                    {item.phase}
                  </h4>

                  <div className="text-sm text-secondary font-semibold mb-3">
                    → {item.focus}
                  </div>

                  <p className="text-text-tertiary text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {index < aidlcPhases.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
