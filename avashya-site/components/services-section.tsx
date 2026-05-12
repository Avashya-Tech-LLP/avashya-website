'use client';

import { motion } from 'framer-motion';
import { Target, GitBranch, Gauge, Users, Workflow, CheckCircle2, Cloud, Database, Cpu, ArrowRightLeft, Brain, Sparkles } from 'lucide-react';

export default function ServicesSection() {
  const effectivenessMetrics = [
    { label: 'Context Utilization Rate', description: 'Tokens used productively vs. wasted' },
    { label: 'Agent Iteration Efficiency', description: 'Time to acceptable output' },
    { label: 'Code Quality Delta', description: 'Pre vs. post-agent review cycles' },
    { label: 'Team Adoption Velocity', description: 'Active users vs. licensed seats' },
  ];

  const awsPartnerServices = [
    {
      icon: ArrowRightLeft,
      label: 'Cloud Migration at Scale',
      description: 'Seamlessly migrate workloads to AWS with zero downtime',
      color: 'text-[#FF9900]'
    },
    {
      icon: Brain,
      label: 'GenAI Workload Optimization',
      description: 'Build and deploy production-ready AI applications on AWS',
      color: 'text-[#FF9900]'
    },
    {
      icon: Database,
      label: 'Data Modernization',
      description: 'Transform legacy databases to AWS-native solutions',
      color: 'text-[#FF9900]'
    },
    {
      icon: Cpu,
      label: 'Infrastructure Optimization',
      description: 'Right-size and optimize AWS infrastructure costs',
      color: 'text-[#FF9900]'
    },
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
    <section id="services" className="relative py-16 sm:py-20 md:py-24 lg:py-32 bg-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Service 1: Coding Agent Optimization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 sm:mb-20 md:mb-24"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect mb-6">
                <Target className="w-4 h-4 text-secondary flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-text-secondary">Service 01</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-4 sm:mb-6">
                Coding Agent
                <br />
                <span className="gradient-text">Optimization</span>
              </h2>

              <p className="text-base sm:text-lg md:text-xl text-text-secondary mb-6 sm:mb-8 leading-relaxed">
                We don't teach your engineers to prompt better. We engineer the <span className="text-primary font-semibold">system</span> around
                your agents to eliminate inefficiency and ensure consistent, measurable output.
              </p>

              <div className="space-y-3 sm:space-y-4">
                {effectivenessMetrics.map((metric, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 sm:mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm sm:text-base text-text-primary font-semibold">{metric.label}</p>
                      <p className="text-xs sm:text-sm text-text-tertiary">{metric.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="glass-effect rounded-xl sm:rounded-2xl p-6 sm:p-8 border-primary/20">
                <Gauge className="w-8 sm:w-10 h-8 sm:h-10 text-primary mb-3 sm:mb-4" />
                <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-3">
                  Engineering Effectiveness Index
                </h3>
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-4 sm:mb-6">
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
                <p className="text-xs sm:text-sm text-text-tertiary mt-2">Baseline → Optimized State</p>
              </div>

              <div className="glass-effect rounded-xl sm:rounded-2xl p-6 sm:p-8">
                <Users className="w-8 sm:w-10 h-8 sm:h-10 text-secondary mb-3 sm:mb-4" />
                <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-3">
                  Team Agent Orchestration
                </h3>
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                  Coordinate multiple agents (coding, review, testing) across your team's workflow.
                  Centralized policies, unified observability, and conflict-free collaboration.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Service 2: AWS Partner Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 sm:mb-20 md:mb-24"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="space-y-4">
                <div className="glass-effect rounded-xl sm:rounded-2xl p-6 sm:p-8 border-[#FF9900]/20 hover:border-[#FF9900]/40 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <Cloud className="w-8 sm:w-10 h-8 sm:h-10 text-[#FF9900]" />
                    <div className="flex items-center gap-2">
                      <span className="text-lg sm:text-xl font-bold text-text-primary">AWS</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#FF9900]/20 text-[#FF9900] text-xs font-semibold">PARTNER</span>
                    </div>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-3">
                    Cloud Migration Excellence
                  </h3>
                  <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-4">
                    Certified AWS migration specialists helping enterprises move to the cloud with confidence.
                    Proven methodologies, automated tooling, and 24/7 support throughout your journey.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-[#FF9900]">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="font-semibold">Zero-downtime migrations</span>
                  </div>
                </div>

                <div className="glass-effect rounded-xl sm:rounded-2xl p-6 sm:p-8 border-[#FF9900]/20 hover:border-[#FF9900]/40 transition-all duration-300">
                  <Sparkles className="w-8 sm:w-10 h-8 sm:h-10 text-[#FF9900] mb-3 sm:mb-4" />
                  <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-3">
                    GenAI on AWS
                  </h3>
                  <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                    Build production-grade GenAI applications using AWS Bedrock, SageMaker, and Lambda.
                    From proof-of-concept to scalable deployment with enterprise governance.
                  </p>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect mb-6">
                <Cloud className="w-4 h-4 text-[#FF9900] flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-text-secondary">Service 02</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-4 sm:mb-6">
                AWS Partner Services
                <br />
                <span className="bg-gradient-to-r from-[#FF9900] to-[#FF9900]/70 bg-clip-text text-transparent">
                  Migrations & GenAI
                </span>
              </h2>

              <p className="text-base sm:text-lg md:text-xl text-text-secondary mb-6 sm:mb-8 leading-relaxed">
                As an <span className="text-[#FF9900] font-semibold">AWS Advanced Consulting Partner</span>, we accelerate your cloud
                transformation with specialized expertise in migrations and generative AI workloads.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {awsPartnerServices.map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="glass-effect rounded-xl p-4 sm:p-5 border-primary/10 hover:border-[#FF9900]/30 transition-all duration-300"
                  >
                    <service.icon className={`w-6 sm:w-7 h-6 sm:h-7 ${service.color} mb-3`} />
                    <h4 className="text-sm sm:text-base font-semibold text-text-primary mb-1">
                      {service.label}
                    </h4>
                    <p className="text-xs sm:text-sm text-text-tertiary leading-relaxed">
                      {service.description}
                    </p>
                  </motion.div>
                ))}
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
          className="glass-effect rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 border-primary/20"
        >
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect mb-6">
              <Workflow className="w-4 h-4 text-accent flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium text-text-secondary">Service 03 - The Framework</span>
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-4 px-2">
              Mapped to the <span className="gradient-text">AI Development Life Cycle</span>
            </h3>
            <p className="text-sm sm:text-base text-text-secondary max-w-2xl mx-auto px-2">
              We identify gaps at each AIDLC phase and implement optimization infrastructure specific to your workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {aidlcPhases.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-bg-secondary rounded-xl sm:rounded-2xl p-5 sm:p-6 h-full border border-primary/10 hover:border-primary/30 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-7 sm:w-8 h-7 sm:h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm sm:text-base flex-shrink-0">
                      {index + 1}
                    </div>
                    <GitBranch className="w-4 sm:w-5 h-4 sm:h-5 text-primary flex-shrink-0" />
                  </div>

                  <h4 className="text-lg sm:text-xl font-bold text-text-primary mb-2">
                    {item.phase}
                  </h4>

                  <div className="text-xs sm:text-sm text-secondary font-semibold mb-2 sm:mb-3">
                    → {item.focus}
                  </div>

                  <p className="text-text-tertiary text-xs sm:text-sm leading-relaxed">
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
