'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

function ScreenshotBlock({
  caption,
  description,
  children,
}: {
  caption: string;
  description: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });
  const y = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);

  return (
    <div ref={ref} className="mb-32 sm:mb-40 last:mb-0">
      <motion.div style={{ y, opacity, scale }}>
        <div className="product-frame p-5 sm:p-8 md:p-10 glow-border relative overflow-hidden">
          {/* Subtle top glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
          {children}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 sm:mt-10 text-center max-w-2xl mx-auto"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-text-primary mb-3">{caption}</h3>
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed">{description}</p>
        </motion.div>
      </motion.div>
    </div>
  );
}

function EEIPanel() {
  const pillars = [
    { label: 'Velocity', score: 81, color: '#8B5CF6' },
    { label: 'Quality', score: 74, color: '#EC4899' },
    { label: 'Efficiency', score: 72, color: '#3B82F6' },
    { label: 'Experience', score: 79, color: '#10B981' },
    { label: 'Leverage', score: 83, color: '#F59E0B' },
    { label: 'Platform Health', score: 76, color: '#6366F1' },
  ];

  return (
    <div className="rounded-xl relative overflow-hidden p-6 sm:p-8">
      {/* Dashboard header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-green-400" style={{ animation: 'smooth-pulse 2s ease-in-out infinite' }} />
          <span className="text-[11px] uppercase tracking-wider" style={{ color: 'var(--color-text-on-dark-secondary)' }}>Real-time Dashboard</span>
        </div>
        <div className="flex gap-2">
          {['7d', '30d', '90d'].map((p, i) => (
            <span key={p} className={`px-2.5 py-1 rounded-md text-[10px] font-medium ${i === 1 ? 'bg-purple-500/20 text-purple-300' : 'text-white/40'}`}>
              {p}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-[1fr_1.5fr] gap-8 items-center">
        {/* Score ring */}
        <div className="flex flex-col items-center">
          <div className="w-40 h-40 sm:w-48 sm:h-48 relative">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="6" />
              <motion.circle
                cx="50" cy="50" r="42" fill="none" stroke="url(#eei-gradient)" strokeWidth="6" strokeLinecap="round" strokeDasharray="264"
                initial={{ strokeDashoffset: 264 }}
                whileInView={{ strokeDashoffset: 264 * 0.22 }}
                viewport={{ once: true }}
                transition={{ duration: 2.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              />
              <defs>
                <linearGradient id="eei-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="50%" stopColor="#EC4899" />
                  <stop offset="100%" stopColor="#3B82F6" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.2, duration: 0.6, type: 'spring' }}
                className="text-5xl sm:text-6xl font-bold text-text-on-dark"
              >
                78
              </motion.span>
              <span className="text-[10px] text-text-on-dark-secondary mt-1 uppercase tracking-widest">EEI Score</span>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.8 }}
            className="mt-3 flex items-center gap-1.5"
          >
            <span className="text-xs text-green-400 font-medium">↑ 12%</span>
            <span className="text-[10px] text-white/40">vs last sprint</span>
          </motion.div>
        </div>

        {/* Pillar breakdown */}
        <div className="space-y-3">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.label}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 + i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3"
            >
              <span className="text-[11px] w-24 text-right" style={{ color: 'var(--color-text-on-dark-secondary)' }}>{pillar.label}</span>
              <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${pillar.score}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.0 + i * 0.1, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full rounded-full"
                  style={{ background: pillar.color }}
                />
              </div>
              <span className="text-xs font-semibold w-8" style={{ color: pillar.color }}>{pillar.score}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom metrics row */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.5 }}
        className="mt-8 pt-5 border-t border-white/[0.06] grid grid-cols-4 gap-4"
      >
        {[
          { label: 'Active Agents', value: '142' },
          { label: 'PRs/Week', value: '847' },
          { label: 'Avg Cost/PR', value: '$22' },
          { label: 'Savings/Mo', value: '$14.2k' },
        ].map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1.7 + i * 0.08 }}
            className="text-center"
          >
            <div className="text-sm sm:text-base font-bold text-text-on-dark">{m.value}</div>
            <div className="text-[9px] sm:text-[10px] text-text-on-dark-secondary mt-0.5">{m.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

function TeamsPanel() {
  const views = [
    {
      label: 'This Sprint',
      rows: [
        { team: 'Platform', eei: 84, adoption: '92%', lead: '2.1h', revert: '1.8%', cost: '$18', trend: '+4' },
        { team: 'Payments', eei: 76, adoption: '78%', lead: '3.4h', revert: '3.2%', cost: '$32', trend: '+2' },
        { team: 'Growth', eei: 71, adoption: '65%', lead: '4.8h', revert: '4.1%', cost: '$41', trend: '-1' },
        { team: 'Infra', eei: 68, adoption: '45%', lead: '5.2h', revert: '2.4%', cost: '$28', trend: '+6' },
        { team: 'Mobile', eei: 73, adoption: '71%', lead: '3.8h', revert: '2.8%', cost: '$35', trend: '+3' },
      ],
    },
    {
      label: 'Last Sprint',
      rows: [
        { team: 'Platform', eei: 80, adoption: '88%', lead: '2.6h', revert: '2.1%', cost: '$21', trend: '+3' },
        { team: 'Payments', eei: 74, adoption: '72%', lead: '3.9h', revert: '3.5%', cost: '$38', trend: '+1' },
        { team: 'Growth', eei: 72, adoption: '61%', lead: '5.1h', revert: '3.8%', cost: '$45', trend: '+2' },
        { team: 'Infra', eei: 62, adoption: '38%', lead: '5.8h', revert: '2.9%', cost: '$31', trend: '-2' },
        { team: 'Mobile', eei: 70, adoption: '66%', lead: '4.2h', revert: '3.1%', cost: '$39', trend: '+1' },
      ],
    },
    {
      label: 'Quarterly Avg',
      rows: [
        { team: 'Platform', eei: 79, adoption: '85%', lead: '2.4h', revert: '2.0%', cost: '$20', trend: '+11' },
        { team: 'Payments', eei: 72, adoption: '70%', lead: '3.8h', revert: '3.4%', cost: '$36', trend: '+8' },
        { team: 'Growth', eei: 67, adoption: '55%', lead: '5.4h', revert: '4.5%', cost: '$48', trend: '+5' },
        { team: 'Infra', eei: 64, adoption: '40%', lead: '5.6h', revert: '2.7%', cost: '$30', trend: '+9' },
        { team: 'Mobile', eei: 69, adoption: '62%', lead: '4.1h', revert: '3.0%', cost: '$37', trend: '+7' },
      ],
    },
  ];

  const [activeView, setActiveView] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveView((p) => (p + 1) % views.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, views.length]);

  const currentRows = views[activeView].rows;

  return (
    <div className="rounded-xl relative overflow-hidden p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-sm font-medium text-text-on-dark">Team Comparison</div>
          <div className="text-[10px] text-text-on-dark-secondary mt-0.5">5 teams • 142 engineers • 3 agents</div>
        </div>
        {/* Tab switcher */}
        <div className="flex items-center gap-1 p-1 rounded-lg" style={{ background: 'rgba(255,255,255,0.04)' }}>
          {views.map((view, i) => (
            <button
              key={view.label}
              onClick={() => { setActiveView(i); setIsAutoPlaying(false); }}
              className={`px-2.5 py-1 rounded-md text-[10px] font-medium transition-all duration-300 ${
                i === activeView ? 'bg-purple-500/20 text-purple-300' : 'text-white/40 hover:text-white/60'
              }`}
            >
              {view.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg" style={{ border: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="grid grid-cols-7 gap-2 sm:gap-3 px-4 py-2.5" style={{ background: 'rgba(255,255,255,0.02)' }}>
          {['Team', 'EEI', 'Δ', 'Adoption', 'Lead Time', 'Reverts', 'Cost/PR'].map((h) => (
            <div key={h} className="text-[9px] sm:text-[10px] text-text-on-dark-secondary font-medium uppercase tracking-wider">{h}</div>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {currentRows.map((row) => (
              <div
                key={row.team}
                className="grid grid-cols-7 gap-2 sm:gap-3 px-4 py-3 border-t border-white/[0.04] hover:bg-white/[0.02] transition-colors"
              >
                <div className="text-xs sm:text-sm text-text-on-dark font-medium">{row.team}</div>
                <div className={`text-xs sm:text-sm font-bold ${row.eei >= 75 ? 'text-purple-400' : row.eei >= 70 ? 'text-amber-400' : 'text-red-400'}`}>{row.eei}</div>
                <div className={`text-[10px] sm:text-xs font-medium ${row.trend.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{row.trend}</div>
                <div className="text-xs sm:text-sm text-text-on-dark-secondary">{row.adoption}</div>
                <div className="text-xs sm:text-sm text-text-on-dark-secondary">{row.lead}</div>
                <div className={`text-xs sm:text-sm ${parseFloat(row.revert) > 3 ? 'text-red-400' : 'text-green-400'}`}>{row.revert}</div>
                <div className="text-xs sm:text-sm text-text-on-dark-secondary">{row.cost}</div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Animated progress bar showing auto-cycle */}
      <div className="mt-4 flex gap-1.5">
        {views.map((_, i) => (
          <div key={i} className="flex-1 h-0.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <motion.div
              className="h-full rounded-full bg-purple-400/60"
              initial={{ width: '0%' }}
              animate={{ width: i === activeView ? '100%' : i < activeView ? '100%' : '0%' }}
              transition={{ duration: i === activeView && isAutoPlaying ? 4 : 0.3, ease: 'linear' }}
            />
          </div>
        ))}
      </div>

      {/* Mini charts that also update */}
      <div className="mt-4 grid grid-cols-5 gap-2">
        {currentRows.map((row) => (
          <div key={row.team} className="text-center">
            <div className="h-10 flex items-end justify-center gap-[1px] mb-1">
              {[40, 55, 65, 70, row.eei].map((v, j) => (
                <motion.div
                  key={j}
                  animate={{ height: `${v}%` }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="w-1.5 rounded-sm origin-bottom"
                  style={{ background: j === 4 ? (row.eei >= 75 ? '#8B5CF6' : '#F59E0B') : 'rgba(255,255,255,0.06)' }}
                />
              ))}
            </div>
            <div className="text-[9px] text-text-on-dark-secondary">{row.team}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function InsightsPanel() {
  const insights = [
    { severity: 'critical', color: '#EF4444', text: 'Review bottleneck: 3 reviewers handling 82% of agent PRs', action: 'Generate Policy', impact: 'High' },
    { severity: 'opportunity', color: '#8B5CF6', text: 'Route trivial tasks to Haiku — projected savings of $2,970/mo', action: 'Enable Routing', impact: '$2.9k/mo' },
    { severity: 'warning', color: '#F59E0B', text: 'Infra team adoption stalled at 45% — missing monorepo context config', action: 'View Playbook', impact: 'Medium' },
    { severity: 'ready', color: '#10B981', text: 'Platform team ready for autonomous deploys — 94% confidence', action: 'Export Proposal', impact: 'Strategic' },
  ];

  return (
    <div className="rounded-xl relative overflow-hidden p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-sm font-medium text-text-on-dark">AI-Generated Insights</div>
          <div className="text-[10px] text-text-on-dark-secondary mt-0.5">4 actionable recommendations • Updated 2h ago</div>
        </div>
        <div className="hidden sm:flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400" style={{ animation: 'smooth-pulse 2s ease-in-out infinite' }} />
          <span className="text-[10px] text-green-400">Auto-analyzing</span>
        </div>
      </div>

      <div className="space-y-2.5">
        {insights.map((insight, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 + i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-300 group cursor-default"
          >
            {/* Severity indicator */}
            <div className="flex-shrink-0">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                className="w-2.5 h-2.5 rounded-full"
                style={{ background: insight.color, boxShadow: `0 0 8px ${insight.color}40` }}
              />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <span className="text-xs sm:text-sm text-text-on-dark-secondary leading-relaxed">{insight.text}</span>
            </div>

            {/* Impact badge */}
            <div className="hidden sm:block flex-shrink-0">
              <span className="px-2 py-0.5 rounded text-[9px] font-medium bg-white/[0.06] text-white/50">{insight.impact}</span>
            </div>

            {/* Action */}
            <span className="flex-shrink-0 text-[10px] sm:text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap" style={{ color: insight.color }}>
              {insight.action} →
            </span>
          </motion.div>
        ))}
      </div>

      {/* Summary bar */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
        className="mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between"
      >
        <span className="text-[10px] text-text-on-dark-secondary">Estimated total savings: <span className="text-green-400 font-medium">$4,810/mo</span></span>
        <span className="text-[10px] text-purple-400 font-medium">View all insights →</span>
      </motion.div>
    </div>
  );
}

export default function PlatformSection() {
  return (
    <section id="platform" className="relative py-24 sm:py-32" style={{ background: 'var(--color-section-alt)' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-16 sm:mb-20"
        >
          <p className="text-[11px] font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--color-primary)' }}>
            The Platform
          </p>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold text-text-primary leading-[1.15] mb-5">
            One dashboard. Every agent.
            <br />
            <span className="heading-serif text-primary">Every dollar.</span>
          </h2>
          <p className="text-lg text-text-secondary">
            The Engineering Effectiveness Index distills 61 metrics into a single score you can track, compare, and act on.
          </p>
        </motion.div>

        <ScreenshotBlock
          caption="Your EEI score — the single number that matters"
          description="Velocity, quality, efficiency, experience, leverage, and platform health — measured in real time across every team and agent."
        >
          <EEIPanel />
        </ScreenshotBlock>

        <ScreenshotBlock
          caption="Compare teams. Spot the gaps."
          description="See which teams are getting ROI from AI tools and which aren't — before it becomes a problem."
        >
          <TeamsPanel />
        </ScreenshotBlock>

        <ScreenshotBlock
          caption="Actionable recommendations, not just dashboards"
          description="The platform tells you what to do — route models, unblock bottlenecks, export policy proposals — with estimated dollar impact."
        >
          <InsightsPanel />
        </ScreenshotBlock>
      </div>
    </section>
  );
}
