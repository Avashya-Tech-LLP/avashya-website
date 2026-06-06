'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import {
  ArrowRight,
  Zap,
  Shield,
  BarChart3,
  Code2,
  Brain,
  TrendingUp,
  Moon,
  Sun,
  Menu,
  X,
  AlertTriangle,
  DollarSign,
  Users,
  Target,
} from 'lucide-react';
import DemoModal from '@/components/demo-modal';

// ─── Theme Toggle ────────────────────────────────────────────────────────────

function ThemeToggle() {
  const [theme, setTheme] = useState<'cream' | 'dark'>('cream');
  useEffect(() => { document.documentElement.setAttribute('data-theme', theme); }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === 'cream' ? 'dark' : 'cream')}
      className="fixed bottom-5 right-5 z-[100] w-11 h-11 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 border active:scale-95"
      style={{ background: theme === 'cream' ? '#1A1A1A' : '#FAF8F5', borderColor: theme === 'cream' ? '#333' : '#ddd' }}
    >
      {theme === 'cream' ? <Moon className="w-4.5 h-4.5" style={{ color: '#FAF8F5' }} /> : <Sun className="w-4.5 h-4.5" style={{ color: '#1A1A1A' }} />}
    </button>
  );
}

// ─── Official Logos ──────────────────────────────────────────────────────────

function AWSLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path fill="var(--color-text-primary)" d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 0 1-.287-.375 6.18 6.18 0 0 1-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.031-.863.103-.295.072-.583.16-.862.272a2.287 2.287 0 0 1-.28.104.488.488 0 0 1-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 0 1 .224-.167c.279-.144.614-.264 1.005-.36a4.84 4.84 0 0 1 1.246-.151c.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963v2.586zm-3.24 1.214c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 0 0-.735-.136 6.02 6.02 0 0 0-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.47.296.838.296zm6.41.862c-.144 0-.24-.024-.304-.08-.064-.048-.12-.16-.168-.311L7.586 5.55a1.398 1.398 0 0 1-.072-.32c0-.128.064-.2.191-.2h.783c.151 0 .255.025.31.08.065.048.113.16.16.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.151-.312a.549.549 0 0 1 .32-.08h.638c.152 0 .256.025.32.08.063.048.12.16.151.312l1.261 5.348 1.381-5.348c.048-.16.104-.264.16-.312a.52.52 0 0 1 .311-.08h.743c.127 0 .2.065.2.2 0 .04-.009.08-.017.128a1.137 1.137 0 0 1-.056.2l-1.923 6.17c-.048.16-.104.263-.168.311a.51.51 0 0 1-.303.08h-.687c-.151 0-.255-.024-.32-.08-.063-.056-.119-.16-.15-.32l-1.238-5.148-1.23 5.14c-.04.16-.087.264-.15.32-.065.056-.177.08-.32.08zm10.256.215c-.415 0-.83-.048-1.229-.143-.399-.096-.71-.2-.918-.32-.128-.071-.215-.151-.247-.223a.563.563 0 0 1-.048-.224v-.407c0-.167.064-.247.183-.247.048 0 .096.008.144.024.048.016.12.048.2.08.271.12.566.215.878.279.319.064.63.096.95.096.502 0 .894-.088 1.165-.264a.86.86 0 0 0 .415-.758.777.777 0 0 0-.215-.559c-.144-.151-.416-.287-.807-.415l-1.157-.36c-.583-.183-1.014-.454-1.277-.813a1.902 1.902 0 0 1-.4-1.158c0-.335.073-.63.216-.886.144-.255.335-.479.575-.654.24-.184.51-.32.83-.415.32-.096.655-.136 1.006-.136.175 0 .359.008.535.032.183.024.35.056.518.088.16.04.312.08.455.127.144.048.256.096.336.144a.69.69 0 0 1 .24.2.43.43 0 0 1 .071.263v.375c0 .168-.064.256-.184.256a.83.83 0 0 1-.303-.096 3.652 3.652 0 0 0-1.532-.311c-.455 0-.815.071-1.062.223-.248.152-.375.383-.375.71 0 .224.08.416.24.567.159.152.454.304.877.44l1.134.358c.574.184.99.44 1.237.767.247.327.367.702.367 1.117 0 .343-.072.655-.207.926-.144.272-.336.511-.583.703-.248.2-.543.343-.886.447-.36.111-.734.167-1.142.167z"/>
      <path fill="#FF9900" d="M21.698 16.207c-2.626 1.94-6.442 2.969-9.722 2.969-4.598 0-8.74-1.7-11.87-4.526-.247-.223-.024-.527.272-.351 3.384 1.963 7.559 3.153 11.877 3.153 2.914 0 6.114-.607 9.06-1.852.439-.2.814.287.383.607zM22.792 14.961c-.336-.43-2.22-.207-3.074-.103-.255.032-.295-.192-.063-.36 1.5-1.053 3.967-.75 4.254-.399.287.36-.08 2.826-1.485 4.007-.215.184-.423.088-.327-.151.32-.79 1.03-2.57.695-2.994z"/>
    </svg>
  );
}

function ClaudeMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.304 3.541h-3.672l6.696 16.918H24l-6.696-16.918Zm-10.608 0L0 20.459h3.744l1.37-3.553h7.005l1.37 3.553h3.744L10.536 3.541H6.696Zm-.371 10.223 2.291-5.946 2.292 5.946H6.325Z" fill="#D97757"/>
    </svg>
  );
}

// ─── Navigation ──────────────────────────────────────────────────────────────

function Navigation({ onContact }: { onContact: () => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b transition-all duration-300 ${scrolled ? 'shadow-sm' : ''}`} style={{ background: 'var(--color-nav-bg)', borderColor: 'var(--color-border)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14 sm:h-16">
        <Image src="/logo.png" alt="Avashya" width={120} height={36} className="h-7 sm:h-8 w-auto object-contain logo-themed" />

        <div className="hidden md:flex items-center gap-7">
          {['Problems', 'Services', 'Solutions', 'How We Work'].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(/\s/g, '-')}`} className="text-sm font-medium transition-colors hover:text-[var(--color-primary)]" style={{ color: 'var(--color-text-secondary)' }}>{item}</a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button onClick={onContact} className="hidden sm:inline-flex btn-primary px-5 py-2 text-sm font-semibold items-center gap-2">
            Book a Call <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 rounded-lg" style={{ color: 'var(--color-text-primary)' }}>
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden border-t px-4 py-4 space-y-3"
          style={{ background: 'var(--color-card-bg)', borderColor: 'var(--color-border)' }}
        >
          {['Problems', 'Services', 'Solutions', 'How We Work'].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(/\s/g, '-')}`} onClick={() => setMobileOpen(false)} className="block text-base font-medium py-2" style={{ color: 'var(--color-text-primary)' }}>{item}</a>
          ))}
          <button onClick={() => { onContact(); setMobileOpen(false); }} className="btn-primary px-5 py-3 text-sm font-semibold inline-flex items-center gap-2 mt-2 w-full justify-center">
            Book a Call <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </nav>
  );
}

// ─── Hero (Problem-First) ───────────────────────────────────────────────────

function HeroSection({ onContact }: { onContact: () => void }) {
  return (
    <section className="relative overflow-hidden pt-14 sm:pt-16" style={{ background: 'var(--color-cream)' }}>
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
        <div className="text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border" style={{ borderColor: 'var(--color-border)', background: 'var(--color-card-bg)' }}>
                <ClaudeMark className="w-4 h-4" />
                <span className="text-[11px] font-medium" style={{ color: 'var(--color-text-secondary)' }}>Claude Partner</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border" style={{ borderColor: 'var(--color-border)', background: 'var(--color-card-bg)' }}>
                <AWSLogo className="h-3.5 w-auto" />
                <span className="text-[11px] font-medium" style={{ color: 'var(--color-text-secondary)' }}>AWS Advanced Tier</span>
              </div>
            </div>

            <h1 className="text-[clamp(2.2rem,5.5vw,4rem)] font-bold tracking-tight leading-[1.1]" style={{ color: 'var(--color-text-primary)' }}>
              AI Engineering
              <br />
              <span className="text-gradient">Transformation</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
              We embed production AI systems into engineering organizations, from coding agents to intelligent automation. Deep AWS expertise meets hands-on delivery.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
              <button onClick={onContact} className="btn-primary btn-glow px-8 py-4 text-base font-semibold inline-flex items-center justify-center gap-2">
                Book a Call <ArrowRight className="w-4 h-4" />
              </button>
              <a href="#problems" className="btn-orbit px-8 py-4 text-base font-semibold rounded-full transition-all hover:shadow-md inline-flex items-center justify-center gap-2 relative" style={{ color: 'var(--color-text-primary)' }}>
                See the Problem
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Trust Bar (Scrolling Marquee) ──────────────────────────────────────────

function TrustBar() {
  const clients = [
    { label: 'Leading Fintech', detail: '50M+ Users' },
    { label: 'Top Social Entertainment Platform', detail: 'Interactive Media' },
    { label: 'Enterprise SaaS', detail: '200+ Engineers' },
    { label: 'Digital Banking Leader', detail: 'Identity Verification' },
    { label: 'Fortune 500 Financial Services', detail: 'AI Transformation' },
  ];

  return (
    <section className="relative py-8 overflow-hidden border-y" style={{ borderColor: 'var(--color-border)', background: 'var(--color-section-alt)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
        <p className="text-center text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--color-text-tertiary)' }}>
          Trusted by engineering teams at
        </p>
      </div>
      <div className="relative overflow-hidden">
        <div className="marquee-track flex items-center gap-12 whitespace-nowrap">
          {[...clients, ...clients].map((c, i) => (
            <div key={i} className="flex items-center gap-3 px-5 py-2.5 rounded-full border" style={{ borderColor: 'var(--color-border)', background: 'var(--color-card-bg)' }}>
              <div className="w-2 h-2 rounded-full" style={{ background: 'var(--color-primary)', opacity: 0.6 }} />
              <span className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>{c.label}</span>
              <span className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>{c.detail}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Impact Stats ───────────────────────────────────────────────────────────

function ImpactStats() {
  const stats = [
    { value: '50+', label: 'AI Workloads Shipped', color: '#0077B6' },
    { value: '<2 Wks', label: 'To First Production Deploy', color: '#10B981' },
    { value: '3x', label: 'Average Throughput Gain', color: '#FF9900' },
    { value: '92%', label: 'Agent Adoption Rate', color: '#8B5CF6' },
  ];

  return (
    <section className="py-16 sm:py-20" style={{ background: 'var(--color-cream)' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ color: s.color }}>{s.value}</div>
              <div className="text-xs sm:text-sm font-medium mt-2" style={{ color: 'var(--color-text-tertiary)' }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Problems We Solve ──────────────────────────────────────────────────────

function ProblemsSection() {
  const problems = [
    {
      icon: AlertTriangle,
      title: 'AI tools adopted, outcomes unclear',
      description: 'Your teams use Copilot, Cursor, Claude Code — but you can\'t measure whether they\'re producing better outcomes or just more code that needs reviewing.',
      color: '#EF4444',
    },
    {
      icon: DollarSign,
      title: 'Spend growing, ROI invisible',
      description: 'AI tooling costs are rising every quarter. Leadership asks "what are we getting for this?" and you don\'t have the dashboard to answer.',
      color: '#FF9900',
    },
    {
      icon: Users,
      title: 'No governance, growing risk',
      description: 'Agents writing code without guardrails. No attribution, no policy enforcement, no audit trail. One compliance incident away from a freeze.',
      color: '#8B5CF6',
    },
    {
      icon: Target,
      title: 'POCs that never reach production',
      description: 'You\'ve run the proof of concept. It worked in the demo. Six months later it\'s still not in production because nobody owns the infrastructure.',
      color: '#0077B6',
    },
  ];

  return (
    <section id="problems" className="relative py-24 sm:py-32" style={{ background: 'var(--color-section-alt)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-16 sm:mb-20">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-medium mb-6" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-secondary)' }}>
            The Problem
          </span>
          <h2 className="text-[clamp(1.8rem,4.5vw,3rem)] font-bold leading-[1.1] tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
            AI acceleration without governance<br className="hidden sm:block" /> is just expensive chaos
          </h2>
          <p className="text-base sm:text-lg mt-4 max-w-xl mx-auto leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
            Sound familiar?
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          {problems.map((p, i) => (
            <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group p-7 sm:p-8 rounded-2xl border transition-all duration-300 hover:shadow-lg"
              style={{ borderColor: 'var(--color-border)', background: 'var(--color-card-bg)' }}
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5" style={{ background: `${p.color}10` }}>
                <p.icon className="w-5 h-5" style={{ color: p.color }} />
              </div>
              <h3 className="text-lg font-semibold mb-2 tracking-tight" style={{ color: 'var(--color-text-primary)' }}>{p.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{p.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Services ────────────────────────────────────────────────────────────────

function ServicesSection() {
  const services = [
    { icon: Code2, title: 'AI Agent Governance', description: 'Deploy and govern Claude Code, Copilot, Cursor across your org. Session-to-PR attribution, EEI measurement, policy enforcement.', color: '#0077B6' },
    { icon: Brain, title: 'Agentic AI Systems', description: 'Multi-agent architectures on AWS Bedrock. Intent classification, RAG pipelines, tool-use agents with compliance guardrails.', color: '#FF9900' },
    { icon: Shield, title: 'AI Security & Identity', description: 'Video liveness detection, anti-deepfake verification, biometric pipelines. Real-time fraud prevention at scale.', color: '#10B981' },
    { icon: Zap, title: 'Voice & Conversational AI', description: 'Low-latency voice companions, real-time speech synthesis, personality engines. Sub-200ms production streaming.', color: '#8B5CF6' },
    { icon: TrendingUp, title: 'ML & Reinforcement Learning', description: 'Custom RL pipelines, model training on SageMaker, reward shaping. Research to production with monitoring.', color: '#3B82F6' },
    { icon: BarChart3, title: 'AI Observability', description: 'Cost attribution, model drift detection, 30+ EEI metrics. The control plane for your AI spend.', color: '#EC4899' },
  ];

  return (
    <section id="services" className="relative py-24 sm:py-32" style={{ background: 'var(--color-cream)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-16 sm:mb-20">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-medium mb-6" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-secondary)' }}>
            What We Build
          </span>
          <h2 className="text-[clamp(1.8rem,4.5vw,3rem)] font-bold leading-[1.1] tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
            We ship production AI systems.<br className="hidden sm:block" /> You keep your team.
          </h2>
          <p className="text-base sm:text-lg mt-4 max-w-xl mx-auto leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
            Every service maps to systems running in production today — not capabilities we claim.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {services.map((s, i) => (
            <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group p-7 sm:p-8 rounded-2xl border transition-all duration-300 hover:border-[var(--color-primary)]/20 hover:shadow-lg"
              style={{ borderColor: 'var(--color-border)', background: 'var(--color-card-bg)' }}
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110" style={{ background: `${s.color}10` }}>
                <s.icon className="w-5 h-5" style={{ color: s.color }} />
              </div>
              <h3 className="text-lg font-semibold mb-2 tracking-tight" style={{ color: 'var(--color-text-primary)' }}>{s.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{s.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Solutions (Tabbed for scannability) ────────────────────────────────────

function SolutionsSection() {
  const solutions = [
    {
      name: 'Agentic AI Chatbot',
      client: 'Leading Fintech',
      scale: '50M+ Users',
      description: 'Multi-agent chatbot on AWS Bedrock replacing rule-based node-flow. Intent classification across 60+ categories in 8 languages including Hinglish.',
      metrics: [{ v: '60+', l: 'Intents' }, { v: '8', l: 'Languages' }, { v: '4', l: 'Agents' }],
      tech: ['AWS Bedrock', 'NLU', 'RBI Compliance'],
      color: '#0077B6',
    },
    {
      name: 'Video Liveness Detection',
      client: 'Leading Fintech',
      scale: 'Identity Verification',
      description: 'Anti-fraud liveness for PWA platform. Combating AI-generated video attacks on KYC with real-time deepfake detection.',
      metrics: [{ v: '<2s', l: 'Verification' }, { v: '99.2%', l: 'Accuracy' }, { v: '0', l: 'False Accepts' }],
      tech: ['Rekognition', 'Anti-Deepfake ML', 'PWA'],
      color: '#FF9900',
    },
    {
      name: 'Voice Companion',
      client: 'Leading Social Entertainment',
      scale: 'Interactive Media',
      description: 'AI voice companion with personality-driven responses and low-latency synthesis for real-time engagement at scale.',
      metrics: [{ v: '<200ms', l: 'Latency' }, { v: '12', l: 'Personalities' }, { v: '24/7', l: 'Uptime' }],
      tech: ['Voice Synthesis', 'Personality Engine', 'Streaming'],
      color: '#8B5CF6',
    },
    {
      name: 'AI Agent Governance Platform',
      client: 'Avashya Platform',
      scale: 'Developer Tools',
      description: 'Enterprise control plane for AI coding agents. Session-to-PR attribution, EEI metrics, cost tracking, policy enforcement.',
      metrics: [{ v: '30+', l: 'EEI Metrics' }, { v: '92%', l: 'Adoption' }, { v: '6wks', l: 'Rollout' }],
      tech: ['Policy-as-Code', 'ClickHouse', 'Attribution'],
      color: '#10B981',
    },
  ];

  const [active, setActive] = useState(0);

  return (
    <section id="solutions" className="relative py-24 sm:py-32" style={{ background: 'var(--color-section-alt)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-16 sm:mb-20">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-medium mb-6" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-secondary)' }}>
            Shipped & Running
          </span>
          <h2 className="text-[clamp(1.8rem,4.5vw,3rem)] font-bold leading-[1.1] tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
            Production systems, not slide decks
          </h2>
          <p className="text-base sm:text-lg mt-4 max-w-xl mx-auto leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
            Running today. Serving real users. Measured outcomes.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {solutions.map((s, i) => (
            <button key={s.name} onClick={() => setActive(i)}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
              style={{
                background: i === active ? s.color : 'var(--color-card-bg)',
                color: i === active ? '#FFFFFF' : 'var(--color-text-secondary)',
                border: `1px solid ${i === active ? s.color : 'var(--color-border)'}`,
              }}
            >
              {s.name}
            </button>
          ))}
        </div>

        {/* Active Solution Detail */}
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}
            className="p-8 sm:p-10 rounded-2xl border"
            style={{ borderColor: 'var(--color-border)', background: 'var(--color-card-bg)' }}
          >
            <div className="flex flex-col lg:flex-row lg:items-center gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-semibold" style={{ color: solutions[active].color }}>{solutions[active].client}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: `${solutions[active].color}10`, color: 'var(--color-text-tertiary)' }}>{solutions[active].scale}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3" style={{ color: 'var(--color-text-primary)' }}>{solutions[active].name}</h3>
                <p className="text-base leading-relaxed max-w-xl" style={{ color: 'var(--color-text-secondary)' }}>{solutions[active].description}</p>
                <div className="flex flex-wrap gap-2 mt-5">
                  {solutions[active].tech.map((t) => (
                    <span key={t} className="text-[11px] font-medium px-3 py-1 rounded-full border" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-tertiary)' }}>{t}</span>
                  ))}
                </div>
              </div>
              <div className="flex gap-8 lg:gap-10 flex-shrink-0">
                {solutions[active].metrics.map((m) => (
                  <div key={m.l} className="text-center">
                    <div className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ color: solutions[active].color }}>{m.v}</div>
                    <div className="text-[11px] font-medium mt-1" style={{ color: 'var(--color-text-tertiary)' }}>{m.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

// ─── How We Work ─────────────────────────────────────────────────────────────

function ApproachSection() {
  const steps = [
    { n: '01', title: 'Discover', time: 'Week 1', desc: 'Audit current AI usage, workflows, infrastructure. Establish baseline. Zero engineering time required from you.' },
    { n: '02', title: 'Architect', time: 'Week 2', desc: 'Design target state with concrete outcomes and cost model. Tool selection, security review, architecture decisions.' },
    { n: '03', title: 'Ship', time: 'Weeks 3-6', desc: 'Deploy alongside your teams. Production configs, pipelines, dashboards, governance. We do the engineering.' },
    { n: '04', title: 'Prove', time: 'Ongoing', desc: 'Continuous improvement from production data. Monthly ROI reviews. If we can\'t show value, we stop billing.' },
  ];

  return (
    <section id="how-we-work" className="relative py-24 sm:py-32" style={{ background: 'var(--color-cream)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-16 sm:mb-20">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-medium mb-6" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-secondary)' }}>
            How We Work
          </span>
          <h2 className="text-[clamp(1.8rem,4.5vw,3rem)] font-bold leading-[1.1] tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
            Weeks to impact, not quarters
          </h2>
          <p className="text-base sm:text-lg mt-4 max-w-lg mx-auto leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
            We embed with your team. You get production systems, not proposals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <motion.div key={s.n} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative p-7 rounded-2xl border text-center transition-all duration-300 hover:shadow-lg"
              style={{ borderColor: 'var(--color-border)', background: 'var(--color-card-bg)' }}
            >
              <span className="text-3xl font-bold tracking-tight" style={{ color: 'var(--color-primary)', opacity: 0.2 }}>{s.n}</span>
              <h3 className="text-lg font-bold mt-3 mb-1 tracking-tight" style={{ color: 'var(--color-text-primary)' }}>{s.title}</h3>
              <span className="text-[11px] font-semibold" style={{ color: 'var(--color-primary)' }}>{s.time}</span>
              <p className="text-sm leading-relaxed mt-3" style={{ color: 'var(--color-text-secondary)' }}>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Why Avashya ─────────────────────────────────────────────────────────────

function WhySection() {
  const points = [
    { icon: Zap, title: 'We ship, not advise', desc: 'Engineers who embed with your team and deploy production systems. No slide decks, no handoffs to juniors.' },
    { icon: BarChart3, title: 'Measurable or free', desc: 'Baseline and target on every engagement. If we can\'t prove ROI, we don\'t bill.' },
    { icon: TrendingUp, title: 'Hyperscaler DNA', desc: 'Built systems serving millions of workloads at AWS and Microsoft. We bring that rigor to your org.' },
    { icon: Shield, title: 'Platform-level access', desc: 'AWS Advanced Tier + Claude Partner Network. Direct engineering relationships, not just certifications.' },
  ];

  return (
    <section className="relative py-24 sm:py-32" style={{ background: 'var(--color-section-alt)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-16 sm:mb-20">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-medium mb-6" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-secondary)' }}>
            Why Avashya
          </span>
          <h2 className="text-[clamp(1.8rem,4.5vw,3rem)] font-bold leading-[1.1] tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
            Engineers who built hyperscaler infrastructure
          </h2>
          <p className="text-base sm:text-lg mt-4 max-w-xl mx-auto leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
            Not consultants who read about it.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {points.map((p, i) => (
            <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group flex gap-5 p-7 sm:p-8 rounded-2xl border transition-all duration-300 hover:border-[var(--color-primary)]/20 hover:shadow-lg"
              style={{ borderColor: 'var(--color-border)', background: 'var(--color-card-bg)' }}
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110" style={{ background: 'rgba(0,119,182,0.08)' }}>
                <p.icon className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
              </div>
              <div>
                <h3 className="text-base font-semibold mb-1.5 tracking-tight" style={{ color: 'var(--color-text-primary)' }}>{p.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} className="mt-16 flex flex-wrap items-center justify-center gap-12 sm:gap-16">
          <div className="flex flex-col items-center gap-2.5">
            <AWSLogo className="h-9 sm:h-11 w-auto" />
            <span className="text-[11px] font-medium" style={{ color: 'var(--color-text-tertiary)' }}>Advanced Tier Services Partner</span>
          </div>
          <div className="flex flex-col items-center gap-2.5">
            <ClaudeMark className="w-9 sm:w-11 h-9 sm:h-11" />
            <span className="text-[11px] font-medium" style={{ color: 'var(--color-text-tertiary)' }}>Claude Partner Network</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Final CTA ──────────────────────────────────────────────────────────────

function CTASection({ onContact }: { onContact: () => void }) {
  return (
    <section id="contact" className="relative py-24 sm:py-32" style={{ background: 'var(--color-cream)' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.1] tracking-tight mb-5" style={{ color: 'var(--color-text-primary)' }}>
            Stop paying for AI chaos.
            <br />
            <span className="text-gradient">Start shipping with governance.</span>
          </h2>
          <p className="text-base sm:text-lg max-w-lg mx-auto leading-relaxed mb-10" style={{ color: 'var(--color-text-secondary)' }}>
            30-minute call. We diagnose your highest-leverage AI opportunity and tell you exactly what we&apos;d build — even if you don&apos;t hire us.
          </p>
          <button onClick={onContact} className="btn-primary btn-glow px-8 py-4 text-base font-semibold inline-flex items-center gap-2.5">
            Book a Call <ArrowRight className="w-4.5 h-4.5" />
          </button>
          <p className="text-sm mt-6" style={{ color: 'var(--color-text-tertiary)' }}>hello@avashya.com</p>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="py-8 sm:py-10 border-t" style={{ borderColor: 'var(--color-border)', background: 'var(--color-section-alt)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <Image src="/logo.png" alt="Avashya" width={100} height={28} className="h-5 w-auto object-contain logo-themed" />
          <div className="flex items-center gap-5">
            <AWSLogo className="h-3.5 w-auto opacity-40" />
            <ClaudeMark className="w-4 h-4 opacity-40" />
          </div>
          <p className="text-[11px]" style={{ color: 'var(--color-text-tertiary)' }}>&copy; 2025 Avashya</p>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function V3Page() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const openModal = () => setIsDemoModalOpen(true);

  return (
    <main className="min-h-screen" style={{ background: 'var(--background)' }}>
      <Navigation onContact={openModal} />
      <HeroSection onContact={openModal} />
      <TrustBar />
      <ImpactStats />
      <ProblemsSection />
      <ServicesSection />
      <SolutionsSection />
      <ApproachSection />
      <WhySection />
      <CTASection onContact={openModal} />
      <Footer />
      <DemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
      <ThemeToggle />
    </main>
  );
}
