'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Brain, ArrowRightLeft, Database, Cpu, Workflow, GitBranch, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import DemoModal from '@/components/demo-modal';

const awsServices = [
  {
    icon: Brain,
    title: 'GenAI Workload Optimization',
    description: 'Build and deploy production-ready AI applications on AWS Bedrock, SageMaker, and Lambda — from proof-of-concept to scalable deployment with enterprise governance.',
    details: ['AWS Bedrock integration', 'SageMaker pipelines', 'RAG architecture design', 'Cost-optimized inference'],
  },
  {
    icon: ArrowRightLeft,
    title: 'Cloud Migration at Scale',
    description: 'Seamlessly migrate workloads to AWS with zero downtime. Proven methodologies, automated tooling, and 24/7 support throughout your journey.',
    details: ['Zero-downtime migrations', 'Multi-account strategy', 'Automated tooling & validation', 'Hybrid connectivity'],
  },
  {
    icon: Database,
    title: 'Data Modernization',
    description: 'Transform legacy databases to AWS-native solutions. Build data lakes, real-time pipelines, and analytics platforms.',
    details: ['Database re-platforming', 'S3 data lake architecture', 'Kinesis streaming pipelines', 'Analytics & ML readiness'],
  },
  {
    icon: Cpu,
    title: 'Infrastructure Optimization',
    description: 'Right-size and optimize AWS infrastructure costs. Reduce your bill by 30-50% without sacrificing performance.',
    details: ['FinOps & cost dashboards', 'Reserved/Spot/Graviton adoption', 'Storage tiering', 'Performance tuning'],
  },
];

const isdlcPhases = [
  { phase: 'Intend', focus: 'AI-Assisted Discovery', description: 'Requirement discovery, business analysis, feasibility, and stakeholder alignment' },
  { phase: 'Structure', focus: 'Architecture Design', description: 'AI-enhanced architecture, workflow modeling, integration planning' },
  { phase: 'Develop', focus: 'Intelligent Engineering', description: 'AI-assisted engineering, code generation, automated testing' },
  { phase: 'Launch', focus: 'Deployment Automation', description: 'AI-driven validation, deployment automation, release governance' },
  { phase: 'Continuously Evolve', focus: 'Intelligent Operations', description: 'AI-powered observability, optimization, continuous improvement' },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function AWSServicesPage() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  return (
    <main className="min-h-screen" style={{ background: 'var(--color-cream)' }}>
      {/* Nav */}
      <nav className="fixed top-0 left-4 right-4 z-50 mt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 rounded-2xl border backdrop-blur-xl" style={{ background: 'var(--color-nav-bg)', borderColor: 'var(--color-border)' }}>
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center gap-2">
              <Image src="/logo.png" alt="Avashya" width={120} height={36} className="h-8 w-auto logo-themed" />
            </a>
            <div className="flex items-center gap-4">
              <a href="/" className="text-sm font-medium flex items-center gap-1.5 transition-colors" style={{ color: 'var(--color-text-secondary)' }}>
                <ArrowLeft className="w-3.5 h-3.5" />
                Back
              </a>
              <button onClick={() => setIsDemoModalOpen(true)} className="btn-primary px-5 py-2 text-sm">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-36 sm:pt-44 pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 border" style={{ background: 'rgba(255, 153, 0, 0.05)', borderColor: 'rgba(255, 153, 0, 0.2)' }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#FF9900' }} />
              <span className="text-xs font-medium" style={{ color: '#FF9900' }}>AWS Partner</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, delay: 0.1, ease }}
            className="text-[clamp(2.2rem,6vw,4rem)] font-bold tracking-tight leading-[1.1] mb-6"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Generative AI &amp; Cloud from{' '}
            <span className="heading-serif" style={{ color: '#FF9900' }}>engineers who built AWS</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease }}
            className="text-lg max-w-2xl mx-auto leading-relaxed mb-10"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            We accelerate your GenAI and cloud transformation with specialized expertise in building production-grade AI applications, cloud migrations, and infrastructure optimization on AWS.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsDemoModalOpen(true)}
            className="btn-primary px-8 py-4 text-base inline-flex items-center gap-2.5"
          >
            <span>Discuss Your Project</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </section>

      {/* Services grid */}
      <section className="pb-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {awsServices.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08, ease }}
                whileHover={{ y: -4, boxShadow: '0 20px 40px -15px rgba(0,0,0,0.08)' }}
                className="p-7 rounded-2xl bg-white border border-black/[0.04] transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(255, 153, 0, 0.08)' }}>
                  <service.icon className="w-5 h-5" style={{ color: '#FF9900' }} />
                </div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>{service.title}</h3>
                <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--color-text-secondary)' }}>{service.description}</p>
                <ul className="space-y-2">
                  {service.details.map((detail) => (
                    <li key={detail} className="text-xs flex items-center gap-2" style={{ color: 'var(--color-text-tertiary)' }}>
                      <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#FF9900' }} />
                      {detail}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ISDLC Framework */}
      <section className="pb-32 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
            className="product-frame p-8 sm:p-12 relative overflow-hidden"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />

            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5" style={{ background: 'rgba(255, 153, 0, 0.1)' }}>
                <Workflow className="w-3.5 h-3.5" style={{ color: '#FF9900' }} />
                <span className="text-[11px] font-medium" style={{ color: '#FF9900' }}>The Framework</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-text-on-dark mb-3">
                Mapped to the <span className="heading-serif" style={{ color: '#FF9900' }}>Intelligent SDLC</span>
              </h3>
              <p className="text-sm text-text-on-dark-secondary max-w-xl mx-auto">
                We identify gaps at each ISDLC phase and implement optimization infrastructure specific to your workflow.{' '}
                <a href="https://isdlc.com" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: '#FF9900' }}>
                  Learn more →
                </a>
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {isdlcPhases.map((item, index) => (
                <motion.div
                  key={item.phase}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08, ease }}
                  className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.03] hover:bg-white/[0.06] transition-colors"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ background: 'rgba(255, 153, 0, 0.15)', color: '#FF9900' }}>
                      {index + 1}
                    </div>
                    <GitBranch className="w-3.5 h-3.5" style={{ color: '#FF9900' }} />
                  </div>
                  <h4 className="text-sm font-bold text-text-on-dark mb-1">{item.phase}</h4>
                  <div className="text-[10px] font-medium mb-2" style={{ color: '#FF9900' }}>→ {item.focus}</div>
                  <p className="text-[11px] leading-relaxed text-text-on-dark-secondary">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20 px-4 sm:px-8 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-bold leading-[1.15] mb-4" style={{ color: 'var(--color-text-primary)' }}>
            Let&apos;s build your GenAI platform <span className="heading-serif" style={{ color: 'var(--color-text-secondary)' }}>the right way</span>
          </h2>
          <p className="text-base mb-8" style={{ color: 'var(--color-text-secondary)' }}>
            Free 30-minute architecture review. We'll assess your current setup and identify quick wins.
          </p>
          <button
            onClick={() => setIsDemoModalOpen(true)}
            className="btn-primary px-8 py-4 text-base inline-flex items-center gap-2.5"
          >
            <span>Schedule a Call</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-4 sm:px-6" style={{ borderColor: 'var(--color-border)' }}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <Image src="/logo.png" alt="Avashya" width={100} height={30} className="h-7 w-auto logo-themed" />
          <p className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>&copy; {new Date().getFullYear()} Avashya</p>
        </div>
      </footer>

      <DemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
    </main>
  );
}
