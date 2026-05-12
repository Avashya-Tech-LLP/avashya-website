'use client';

import { motion } from 'framer-motion';
import {
  Database,
  Eye,
  ShieldCheck,
  Rocket,
  Activity,
  GitMerge,
  Lock,
  BarChart3
} from 'lucide-react';

export default function PlatformSection() {
  const platformFeatures = [
    {
      icon: Database,
      title: 'Discovery & Registry',
      description: 'Centralized catalog of all coding agents, their capabilities, and access patterns across your organization',
      metrics: ['Agent inventory', 'Capability mapping', 'Usage analytics'],
      highlight: true,
    },
    {
      icon: Eye,
      title: 'Real-time Observability',
      description: 'Monitor agent interactions, token consumption, and output quality in production workflows',
      metrics: ['Live dashboards', 'Performance tracking', 'Anomaly detection'],
      highlight: true,
    },
    {
      icon: ShieldCheck,
      title: 'Governance & Security',
      description: 'Policy enforcement, access controls, and audit trails for every agent action in your codebase',
      metrics: ['Zero-trust policies', 'Audit logging', 'Compliance reports'],
      highlight: false,
    },
    {
      icon: Rocket,
      title: 'Agent CI/CD',
      description: 'Version control, testing, and deployment pipelines specifically designed for agent configurations',
      metrics: ['Config versioning', 'A/B testing', 'Rollback support'],
      highlight: false,
    },
  ];

  const dashboardMetrics = [
    { icon: Activity, label: 'Agent Uptime', value: '99.7%', trend: '+2.1%' },
    { icon: BarChart3, label: 'Context Efficiency', value: '3.2x', trend: '+40%' },
    { icon: GitMerge, label: 'Merge Confidence', value: '94%', trend: '+15%' },
    { icon: Lock, label: 'Security Score', value: 'A+', trend: 'stable' },
  ];

  return (
    <section id="platform" className="relative py-16 sm:py-20 md:py-24 lg:py-32 bg-bg-secondary overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect mb-6">
            <Rocket className="w-4 h-4 text-accent flex-shrink-0" />
            <span className="text-xs sm:text-sm font-medium text-text-secondary">Service 02</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-4 sm:mb-6 px-2">
            Avashya Intelligence
            <br />
            <span className="gradient-text">Platform</span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-text-secondary leading-relaxed px-2">
            Your command center for agent-driven development. Observe, govern, and optimize every AI interaction
            across your engineering organization—in real time.
          </p>
        </motion.div>

        {/* Command Center Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-effect rounded-2xl sm:rounded-3xl p-6 sm:p-8 mb-12 sm:mb-16 border-primary/20"
        >
          <div className="mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-2">Command Center</h3>
            <p className="text-sm sm:text-base text-text-secondary">Live metrics from your agent ecosystem</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
            {dashboardMetrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-bg-primary rounded-lg sm:rounded-xl p-3 sm:p-4 border border-primary/10"
              >
                <div className="flex items-center justify-between mb-2">
                  <metric.icon className="w-4 sm:w-5 h-4 sm:h-5 text-primary flex-shrink-0" />
                  <span className={`text-[10px] sm:text-xs font-semibold ${
                    metric.trend.includes('+') ? 'text-accent' : 'text-text-tertiary'
                  }`}>
                    {metric.trend}
                  </span>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-text-primary mb-1">
                  {metric.value}
                </div>
                <div className="text-[10px] sm:text-xs text-text-tertiary">
                  {metric.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Visualization placeholder */}
          <div className="bg-bg-primary rounded-lg sm:rounded-xl p-4 sm:p-6 border border-primary/10">
            <div className="flex items-center justify-between mb-4 gap-2">
              <span className="text-xs sm:text-sm text-text-secondary">Agent Activity Timeline</span>
              <span className="text-[10px] sm:text-xs text-text-tertiary whitespace-nowrap">Last 7 days</span>
            </div>
            <div className="h-24 sm:h-32 flex items-end gap-1 sm:gap-2">
              {[65, 78, 82, 90, 75, 88, 95].map((height, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${height}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="flex-1 bg-gradient-to-t from-primary/50 to-secondary/50 rounded-t"
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bento Grid Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {platformFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`glass-effect rounded-xl sm:rounded-2xl p-6 sm:p-8 ${
                feature.highlight
                  ? 'md:col-span-1 border-primary/30'
                  : 'border-primary/10'
              } hover:border-primary/50 transition-all duration-300`}
            >
              <div className="flex items-start gap-3 sm:gap-4 mb-4">
                <div className={`p-2.5 sm:p-3 rounded-xl flex-shrink-0 ${
                  feature.highlight ? 'bg-primary/20' : 'bg-secondary/20'
                }`}>
                  <feature.icon className={`w-5 sm:w-6 h-5 sm:h-6 ${
                    feature.highlight ? 'text-primary' : 'text-secondary'
                  }`} />
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-3">
                {feature.title}
              </h3>

              <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-4 sm:mb-6">
                {feature.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {feature.metrics.map((metric, i) => (
                  <span
                    key={i}
                    className="px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-medium bg-bg-primary text-text-tertiary border border-primary/10"
                  >
                    {metric}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Platform CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 text-center px-2"
        >
          <button className="px-6 sm:px-8 py-3.5 sm:py-4 bg-secondary hover:bg-secondary-light rounded-full font-semibold text-white transition-all duration-300 shadow-lg shadow-secondary/20 text-sm sm:text-base min-h-[48px] w-full sm:w-auto">
            Schedule Platform Walkthrough
          </button>
        </motion.div>
      </div>
    </section>
  );
}
