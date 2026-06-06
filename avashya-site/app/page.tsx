'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import {
  ArrowRight,
  Zap,
  Shield,
  BarChart3,
  Code2,
  Brain,
  Workflow,
  Users,
  TrendingUp,
  Globe,
  Moon,
  Sun,
  Play,
} from 'lucide-react';

// ─── Theme Toggle ────────────────────────────────────────────────────────────

function ThemeToggle() {
  const [theme, setTheme] = useState<'cream' | 'dark'>('cream');

  useEffect(() => {
    const saved = localStorage.getItem('avashya-theme') as 'cream' | 'dark' | null;
    if (saved) {
      setTheme(saved);
      document.documentElement.setAttribute('data-theme', saved);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('avashya-theme', theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === 'cream' ? 'dark' : 'cream')}
      className="fixed bottom-6 right-6 z-[100] w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 border hover:scale-110"
      style={{
        background: theme === 'cream' ? '#1A1A1A' : '#FAF8F5',
        borderColor: theme === 'cream' ? '#333' : '#ddd',
      }}
      aria-label={theme === 'cream' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      {theme === 'cream' ? (
        <Moon className="w-4 h-4" style={{ color: '#FAF8F5' }} />
      ) : (
        <Sun className="w-4 h-4" style={{ color: '#1A1A1A' }} />
      )}
    </button>
  );
}

// ─── Neural Network Canvas ───────────────────────────────────────────────────

function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Array<{ x: number; y: number; vx: number; vy: number; radius: number }>>([]);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let w = 0;
    let h = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);

      if (nodesRef.current.length === 0) {
        const count = Math.min(80, Math.floor((w * h) / 12000));
        nodesRef.current = Array.from({ length: count }, () => ({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: 2 + Math.random() * 2,
        }));
      }
    };

    resize();
    window.addEventListener('resize', resize);

    let mouseX = -1000;
    let mouseY = -1000;
    let isDragging = false;
    let draggedNode: (typeof nodesRef.current)[0] | null = null;

    const getMousePos = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      return { x: clientX - rect.left, y: clientY - rect.top };
    };

    const findClosestNode = (x: number, y: number) => {
      let closest: (typeof nodesRef.current)[0] | null = null;
      let minDist = 30;
      for (const node of nodesRef.current) {
        const dx = node.x - x;
        const dy = node.y - y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < minDist) {
          minDist = dist;
          closest = node;
        }
      }
      return closest;
    };

    const onMouseDown = (e: MouseEvent | TouchEvent) => {
      const pos = getMousePos(e);
      mouseX = pos.x;
      mouseY = pos.y;
      draggedNode = findClosestNode(pos.x, pos.y);
      if (draggedNode) {
        isDragging = true;
        canvas.style.cursor = 'grabbing';
      }
    };

    const onMouseMove = (e: MouseEvent | TouchEvent) => {
      const pos = getMousePos(e);
      mouseX = pos.x;
      mouseY = pos.y;
      if (isDragging && draggedNode) {
        draggedNode.x = pos.x;
        draggedNode.y = pos.y;
        draggedNode.vx = 0;
        draggedNode.vy = 0;
      } else {
        const hovered = findClosestNode(pos.x, pos.y);
        canvas.style.cursor = hovered ? 'grab' : 'default';
      }
    };

    const onMouseUp = () => {
      if (isDragging && draggedNode) {
        draggedNode.vx = (Math.random() - 0.5) * 0.4;
        draggedNode.vy = (Math.random() - 0.5) * 0.4;
      }
      isDragging = false;
      draggedNode = null;
      canvas.style.cursor = 'default';
    };

    const onMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
      isDragging = false;
      draggedNode = null;
      canvas.style.cursor = 'default';
    };

    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('mouseleave', onMouseLeave);
    canvas.addEventListener('touchstart', onMouseDown, { passive: true });
    canvas.addEventListener('touchmove', onMouseMove, { passive: true });
    canvas.addEventListener('touchend', onMouseUp);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const nodes = nodesRef.current;
      const connectionDist = 250;
      const time = frameRef.current * 0.005;

      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const r = isDark ? 0 : 0;
      const g = isDark ? 180 : 119;
      const b = isDark ? 216 : 182;
      const nodeColor = `${r}, ${g}, ${b}`;

      const heartPhase = (time * 1.2) % (Math.PI * 2);
      const heartbeat = Math.pow(Math.max(0, Math.sin(heartPhase)), 8) * 0.7 +
                        Math.pow(Math.max(0, Math.sin(heartPhase + 0.4)), 12) * 0.3;

      for (const node of nodes) {
        if (isDragging && node === draggedNode) continue;

        node.x += node.vx + Math.sin(time + node.y * 0.008) * 0.1;
        node.y += node.vy + Math.cos(time + node.x * 0.008) * 0.1;

        if (mouseX > 0 && mouseY > 0 && !isDragging) {
          const dx = mouseX - node.x;
          const dy = mouseY - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150 && dist > 5) {
            const force = 0.3 / dist;
            node.x += dx * force;
            node.y += dy * force;
          }
        }

        if (node.x < -30) node.x = w + 30;
        if (node.x > w + 30) node.x = -30;
        if (node.y < -30) node.y = h + 30;
        if (node.y > h + 30) node.y = -30;
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDist) {
            const alpha = (1 - dist / connectionDist) * (0.25 + heartbeat * 0.1);
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(${nodeColor}, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      for (const node of nodes) {
        const pulse = 1 + heartbeat * 0.5 + Math.sin(time * 1.5 + node.x * 0.005 + node.y * 0.005) * 0.2;
        const glowSize = node.radius * pulse;

        const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, glowSize * 4);
        glow.addColorStop(0, `rgba(${nodeColor}, ${0.15 + heartbeat * 0.1})`);
        glow.addColorStop(0.5, `rgba(${nodeColor}, ${0.04 + heartbeat * 0.03})`);
        glow.addColorStop(1, `rgba(${nodeColor}, 0)`);
        ctx.beginPath();
        ctx.arc(node.x, node.y, glowSize * 4, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(node.x, node.y, glowSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${nodeColor}, ${0.6 + heartbeat * 0.3})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(node.x, node.y, glowSize * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${0.3 + heartbeat * 0.4})`;
        ctx.fill();
      }

      frameRef.current++;
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousedown', onMouseDown);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('mouseleave', onMouseLeave);
      canvas.removeEventListener('touchstart', onMouseDown);
      canvas.removeEventListener('touchmove', onMouseMove);
      canvas.removeEventListener('touchend', onMouseUp);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ cursor: 'default' }}
    />
  );
}

// ─── Video Placeholder ───────────────────────────────────────────────────────

function VideoPlaceholder({ title, aspectRatio = '16/9' }: { title: string; aspectRatio?: string }) {
  return (
    <div
      className="relative w-full rounded-2xl border-2 border-dashed overflow-hidden group cursor-pointer transition-all hover:shadow-lg"
      style={{ aspectRatio, borderColor: 'var(--color-border)', background: 'var(--color-surface-dark)' }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
        <div className="w-16 h-16 rounded-full flex items-center justify-center transition-transform group-hover:scale-110" style={{ background: 'rgba(255,255,255,0.1)' }}>
          <Play className="w-7 h-7 text-white/80 ml-1" />
        </div>
        <p className="text-sm font-medium text-white/60">{title}</p>
      </div>
    </div>
  );
}

// ─── Navigation ──────────────────────────────────────────────────────────────

function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b" style={{ background: 'var(--color-nav-bg)', borderColor: 'var(--color-border)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="Avashya" width={120} height={36} className="h-8 w-auto object-contain logo-themed" />
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#services" className="text-sm font-medium transition-colors hover:text-[var(--color-primary)]" style={{ color: 'var(--color-text-secondary)' }}>Services</a>
          <a href="#solutions" className="text-sm font-medium transition-colors hover:text-[var(--color-primary)]" style={{ color: 'var(--color-text-secondary)' }}>Solutions</a>
          <a href="#approach" className="text-sm font-medium transition-colors hover:text-[var(--color-primary)]" style={{ color: 'var(--color-text-secondary)' }}>Approach</a>
          <a href="/join-us" className="text-sm font-medium transition-colors hover:text-[var(--color-primary)]" style={{ color: 'var(--color-text-secondary)' }}>Join Us</a>
        </div>
        <a href="#contact" className="btn-primary px-5 py-2.5 text-sm font-semibold inline-flex items-center gap-2">
          Book a Call <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </nav>
  );
}

// ─── Hero Section ────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: 'var(--color-cream)' }}>
      <NeuralCanvas />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-40 pb-20">
        {/* Partner badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-10"
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border" style={{ borderColor: 'var(--color-border)', background: 'var(--color-card-bg)' }}>
            <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.304 3.541h-3.672l6.696 16.918H24l-6.696-16.918Zm-10.608 0L0 20.459h3.744l1.37-3.553h7.005l1.37 3.553h3.744L10.536 3.541H6.696Zm-.371 10.223 2.291-5.946 2.292 5.946H6.325Z" fill="#D97757"/>
            </svg>
            <span className="text-xs font-semibold" style={{ color: 'var(--color-text-primary)' }}>Claude Partner Network</span>
          </div>
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border" style={{ borderColor: 'var(--color-border)', background: 'var(--color-card-bg)' }}>
            <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path fill="var(--color-text-primary)" d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 0 1-.287-.375 6.18 6.18 0 0 1-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.031-.863.103-.295.072-.583.16-.862.272a2.287 2.287 0 0 1-.28.104.488.488 0 0 1-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 0 1 .224-.167c.279-.144.614-.264 1.005-.36a4.84 4.84 0 0 1 1.246-.151c.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963v2.586zm-3.24 1.214c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 0 0-.735-.136 6.02 6.02 0 0 0-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.47.296.838.296zm6.41.862c-.144 0-.24-.024-.304-.08-.064-.048-.12-.16-.168-.311L7.586 5.55a1.398 1.398 0 0 1-.072-.32c0-.128.064-.2.191-.2h.783c.151 0 .255.025.31.08.065.048.113.16.16.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.151-.312a.549.549 0 0 1 .32-.08h.638c.152 0 .256.025.32.08.063.048.12.16.151.312l1.261 5.348 1.381-5.348c.048-.16.104-.264.16-.312a.52.52 0 0 1 .311-.08h.743c.127 0 .2.065.2.2 0 .04-.009.08-.017.128a1.137 1.137 0 0 1-.056.2l-1.923 6.17c-.048.16-.104.263-.168.311a.51.51 0 0 1-.303.08h-.687c-.151 0-.255-.024-.32-.08-.063-.056-.119-.16-.15-.32l-1.238-5.148-1.23 5.14c-.04.16-.087.264-.15.32-.065.056-.177.08-.32.08zm10.256.215c-.415 0-.83-.048-1.229-.143-.399-.096-.71-.2-.918-.32-.128-.071-.215-.151-.247-.223a.563.563 0 0 1-.048-.224v-.407c0-.167.064-.247.183-.247.048 0 .096.008.144.024.048.016.12.048.2.08.271.12.566.215.878.279.319.064.63.096.95.096.502 0 .894-.088 1.165-.264a.86.86 0 0 0 .415-.758.777.777 0 0 0-.215-.559c-.144-.151-.416-.287-.807-.415l-1.157-.36c-.583-.183-1.014-.454-1.277-.813a1.902 1.902 0 0 1-.4-1.158c0-.335.073-.63.216-.886.144-.255.335-.479.575-.654.24-.184.51-.32.83-.415.32-.096.655-.136 1.006-.136.175 0 .359.008.535.032.183.024.35.056.518.088.16.04.312.08.455.127.144.048.256.096.336.144a.69.69 0 0 1 .24.2.43.43 0 0 1 .071.263v.375c0 .168-.064.256-.184.256a.83.83 0 0 1-.303-.096 3.652 3.652 0 0 0-1.532-.311c-.455 0-.815.071-1.062.223-.248.152-.375.383-.375.71 0 .224.08.416.24.567.159.152.454.304.877.44l1.134.358c.574.184.99.44 1.237.767.247.327.367.702.367 1.117 0 .343-.072.655-.207.926-.144.272-.336.511-.583.703-.248.2-.543.343-.886.447-.36.111-.734.167-1.142.167z"/>
              <path fill="#FF9900" d="M21.698 16.207c-2.626 1.94-6.442 2.969-9.722 2.969-4.598 0-8.74-1.7-11.87-4.526-.247-.223-.024-.527.272-.351 3.384 1.963 7.559 3.153 11.877 3.153 2.914 0 6.114-.607 9.06-1.852.439-.2.814.287.383.607zM22.792 14.961c-.336-.43-2.22-.207-3.074-.103-.255.032-.295-.192-.063-.36 1.5-1.053 3.967-.75 4.254-.399.287.36-.08 2.826-1.485 4.007-.215.184-.423.088-.327-.151.32-.79 1.03-2.57.695-2.994z"/>
            </svg>
            <span className="text-xs font-semibold" style={{ color: 'var(--color-text-primary)' }}>AWS Advanced Tier Partner</span>
          </div>
        </motion.div>

        {/* Category label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="text-center text-[11px] font-semibold uppercase tracking-widest mb-5"
          style={{ color: 'var(--color-primary)' }}
        >
          AI Engineering Transformation
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-center text-[clamp(2.5rem,6.5vw,4.5rem)] font-bold tracking-tight leading-[1.08]"
          style={{ color: 'var(--color-text-primary)' }}
        >
          Production AI Systems
          <br />
          <span className="heading-serif" style={{ color: 'var(--color-primary)' }}>Deployed in Weeks</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-6 text-center text-[clamp(1.05rem,2vw,1.25rem)] max-w-2xl mx-auto leading-relaxed"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          We embed with engineering teams to deploy AI agents, governance platforms, and intelligent automation on AWS — with measurable outcomes from day one.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a href="#contact" className="btn-primary btn-glow px-8 py-4 text-sm font-semibold inline-flex items-center gap-2">
            Book a Call <ArrowRight className="w-4 h-4" />
          </a>
          <a href="#services" className="btn-orbit px-8 py-4 text-sm font-semibold rounded-full transition-all hover:shadow-md inline-flex items-center gap-2 relative" style={{ color: 'var(--color-text-primary)' }}>
            Explore Services
          </a>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 max-w-3xl mx-auto"
        >
          {[
            { value: '50+', label: 'AI Workloads Shipped' },
            { value: '<2 Wks', label: 'To First Production Deploy' },
            { value: '3x', label: 'Average Throughput Gain' },
            { value: '92%', label: 'Agent Adoption Rate' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + i * 0.1 }}
              className="text-center"
            >
              <div className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--color-primary)' }}>{stat.value}</div>
              <div className="text-[11px] mt-1 font-medium" style={{ color: 'var(--color-text-tertiary)' }}>{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Services Section ────────────────────────────────────────────────────────

function ServicesSection() {
  const services = [
    {
      icon: Code2,
      title: 'Coding Agent Harness Engineering',
      description: 'Deploy and govern Claude Code, Copilot, Cursor at scale. Session-to-PR attribution, EEI measurement frameworks, policy-as-code enforcement, and ROI dashboards.',
      color: '#0077B6',
    },
    {
      icon: Brain,
      title: 'Agentic Solutions',
      description: 'Multi-agent architectures on AWS Bedrock. Intent classification across 60+ categories, RAG pipelines, tool-use orchestration with compliance guardrails.',
      color: '#FF9900',
    },
    {
      icon: Shield,
      title: 'AI Security & Observability',
      description: 'Video liveness detection, anti-deepfake verification, model drift monitoring, and cost attribution. Real-time fraud prevention for regulated environments.',
      color: '#10B981',
    },
    {
      icon: Workflow,
      title: 'Voice AI',
      description: 'Sub-200ms voice companions, real-time speech synthesis, and personality engines. Production-grade streaming with natural multi-turn conversation.',
      color: '#8B5CF6',
    },
    {
      icon: Globe,
      title: 'Bedrock Agent Core',
      description: 'End-to-end agent infrastructure on AWS Bedrock. Knowledge bases, action groups, guardrails configuration, and production deployment pipelines.',
      color: '#3B82F6',
    },
    {
      icon: Users,
      title: 'Model Training & Hosting on SageMaker',
      description: 'Custom model training, fine-tuning, and inference hosting. From Gemma 4 deployments to RL pipelines — research to production with cost-optimized endpoints.',
      color: '#EC4899',
    },
  ];

  return (
    <section id="services" className="relative py-24 sm:py-32" style={{ background: 'var(--color-section-alt)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6" style={{ borderColor: 'var(--color-border)', background: 'var(--color-card-bg)' }}>
            <div className="w-2 h-2 rounded-full" style={{ background: 'var(--color-primary)' }} />
            <span className="text-xs font-semibold" style={{ color: 'var(--color-text-secondary)' }}>Our Services</span>
          </div>
          <h2 className="text-[clamp(2rem,5vw,3.2rem)] font-bold leading-[1.15]" style={{ color: 'var(--color-text-primary)' }}>
            Six engineering disciplines,
            <br />
            <span className="heading-serif" style={{ color: 'var(--color-primary)' }}>one embedded team</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden"
              style={{
                borderColor: 'var(--color-border)',
                background: 'var(--color-card-bg)',
              }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{ boxShadow: `inset 0 1px 0 0 ${service.color}40, 0 0 40px -10px ${service.color}20` }}
              />

              <div className="relative z-10">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5" style={{ background: `${service.color}15` }}>
                  <service.icon className="w-5 h-5" style={{ color: service.color }} />
                </div>

                <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--color-text-primary)' }}>
                  {service.title}
                </h3>

                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Solutions Section ───────────────────────────────────────────────────────

function SolutionsSection() {
  const solutions = [
    {
      name: 'Agentic AI Chatbot',
      tagline: 'Multi-Agent on AWS Bedrock',
      description: 'Multi-agent chatbot replacing rule-based node-flow. Intent classification across 60+ categories in 8 languages including Hinglish. Deployed for a leading fintech serving 50M+ users.',
      gradient: 'from-[#0077B6] to-[#00B4D8]',
    },
    {
      name: 'Video Liveness Detection',
      tagline: 'Anti-Fraud Identity Verification',
      description: 'Anti-fraud liveness for PWA platform. Combating AI-generated video attacks on KYC with real-time deepfake detection. 99.2% accuracy, zero false accepts.',
      gradient: 'from-[#FF9900] to-[#FFBF00]',
    },
    {
      name: 'Voice AI Companion',
      tagline: 'Real-Time Streaming Voice Agent',
      description: 'Sub-200ms voice companion with personality engine and multi-turn memory. Production-grade streaming for a social entertainment platform serving 100K+ concurrent users.',
      gradient: 'from-[#8B5CF6] to-[#A78BFA]',
    },
    {
      name: 'AI Agent Governance & ISDLC',
      tagline: '300+ Developer Team Enablement',
      description: 'End-to-end governance platform with ISDLC workshop delivery for a 300+ developer org. Session-to-PR attribution, EEI metrics, policy enforcement across Claude Code, Cursor, Copilot. 92% adoption in 6 weeks.',
      gradient: 'from-[#10B981] to-[#34D399]',
    },
  ];

  return (
    <section id="solutions" className="relative py-24 sm:py-32" style={{ background: 'var(--color-cream)' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-[11px] font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--color-primary)' }}>
            Shipped & Running at Scale
          </p>
          <h2 className="text-[clamp(2rem,5vw,3.2rem)] font-bold leading-[1.15]" style={{ color: 'var(--color-text-primary)' }}>
            Highlights from <span className="heading-serif" style={{ color: 'var(--color-primary)' }}>production systems</span>
          </h2>
          <p className="text-base mt-4 max-w-xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
            A few of our engagements serving 100K+ users in production. Each built, deployed, and hardened by our team.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {solutions.map((solution, i) => (
            <motion.div
              key={solution.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="p-8 rounded-2xl border relative overflow-hidden group hover:shadow-xl transition-all duration-300"
              style={{ borderColor: 'var(--color-border)', background: 'var(--color-card-bg)' }}
            >
              <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${solution.gradient}`} />
              <h3 className="text-xl font-bold mt-2" style={{ color: 'var(--color-text-primary)' }}>{solution.name}</h3>
              <p className="text-xs font-semibold uppercase tracking-wider mt-1 mb-4" style={{ color: 'var(--color-text-tertiary)' }}>{solution.tagline}</p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{solution.description}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

// ─── Differentiators Section ─────────────────────────────────────────────────

function DifferentiatorsSection() {
  const points = [
    {
      icon: Zap,
      title: 'We ship, not advise',
      description: 'Engineers who embed with your team and deploy production systems. No slide decks, no handoffs to juniors.',
    },
    {
      icon: BarChart3,
      title: 'Measurable or free',
      description: 'Baseline and target on every engagement. If we can\'t prove ROI, we don\'t bill.',
    },
    {
      icon: TrendingUp,
      title: 'Production at scale',
      description: 'Every system we build is battle-tested at 100K+ traffic. We engineer for real load, not demo environments.',
    },
    {
      icon: Shield,
      title: 'Platform-level access',
      description: 'AWS Advanced Tier + Claude Partner Network. Direct engineering relationships, not just certifications.',
    },
  ];

  return (
    <section className="relative py-24 sm:py-32" style={{ background: 'var(--color-section-alt)' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-[11px] font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--color-primary)' }}>
            Why Avashya
          </p>
          <h2 className="text-[clamp(2rem,5vw,3.2rem)] font-bold leading-[1.15]" style={{ color: 'var(--color-text-primary)' }}>
            Why teams choose <span className="heading-serif" style={{ color: 'var(--color-primary)' }}>us</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10">
          {points.map((point, i) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex gap-4"
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(0, 119, 182, 0.08)' }}>
                <point.icon className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
              </div>
              <div>
                <h3 className="text-base font-bold mb-1.5" style={{ color: 'var(--color-text-primary)' }}>{point.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{point.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Approach Section ────────────────────────────────────────────────────────

function ApproachSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start center', 'end center'] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const steps = [
    {
      number: '01',
      title: 'Discover & Architect',
      duration: 'Week 1',
      description: 'Audit current AI usage, workflows, infrastructure. Establish baseline. Design target state with concrete outcomes, cost model, and architecture decisions.',
      detail: 'Zero engineering time required from you. You get a concrete plan by end of week — not a slide deck.',
    },
    {
      number: '02',
      title: 'Ship',
      duration: 'Week 2',
      description: 'Deploy alongside your teams. Production configs, pipelines, dashboards, governance. We do the engineering.',
      detail: 'White-glove delivery. Your engineers ship features, we ship AI infrastructure.',
    },
    {
      number: '03',
      title: 'Prove',
      duration: 'Ongoing',
      description: 'Continuous improvement from production data. Monthly ROI reviews. If we can\'t show value, we stop billing.',
      detail: 'Measurable outcomes every month. No value, no invoice.',
    },
  ];

  return (
    <section id="approach" ref={containerRef} className="relative py-24 sm:py-32" style={{ background: 'var(--color-cream)' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14 sm:mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--color-primary)' }}>
            How We Work
          </p>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.15] mb-5" style={{ color: 'var(--color-text-primary)' }}>
            Two weeks to production,
            <br />
            <span className="heading-serif" style={{ color: 'var(--color-primary)' }}>not quarters</span>
          </h2>
          <p className="text-lg mx-auto whitespace-nowrap" style={{ color: 'var(--color-text-secondary)' }}>
            We embed with your team. You get production systems, not proposals.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-[18px] sm:left-[22px] top-0 bottom-0 w-[2px] rounded-full" style={{ background: 'var(--color-border)' }}>
            <motion.div style={{ scaleY: lineScale, transformOrigin: 'top' }} className="w-full h-full rounded-full bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-primary-light)]" />
          </div>

          <div className="space-y-12 sm:space-y-14">
            {steps.map((step) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8 }}
                className="relative pl-14 sm:pl-16"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="absolute left-2 sm:left-3 top-2 w-4 h-4 rounded-full border-2 flex items-center justify-center"
                  style={{ borderColor: 'var(--color-primary)', background: 'var(--color-cream)' }}
                >
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--color-primary)' }} />
                </motion.div>

                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[11px] font-mono" style={{ color: 'var(--color-text-tertiary)' }}>{step.number}</span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full" style={{ background: 'rgba(0, 119, 182, 0.08)', color: 'var(--color-primary)' }}>{step.duration}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold mt-1 mb-3" style={{ color: 'var(--color-text-primary)' }}>{step.title}</h3>
                <p className="text-base sm:text-lg leading-relaxed mb-2 max-w-lg" style={{ color: 'var(--color-text-secondary)' }}>{step.description}</p>
                <p className="text-sm" style={{ color: 'var(--color-text-tertiary)' }}>{step.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Results Section ─────────────────────────────────────────────────────────

function ResultsSection() {
  const caseStudies = [
    {
      tag: 'AGENTIC AI CHATBOT',
      title: 'Leading Fintech — 50M+ Users',
      challenge: 'Rule-based node-flow chatbot couldn\'t scale. 60+ intent categories across 8 languages needed. RBI compliance required. Previous system had 40% fallback rate.',
      result: 'Multi-agent chatbot on AWS Bedrock with intent classification in 8 languages including Hinglish. 4 specialized agents with compliance guardrails. Deployed in production serving 50M+ users.',
      metrics: [
        { value: '60+', label: 'Intent Categories' },
        { value: '8', label: 'Languages' },
        { value: '4', label: 'Specialized Agents' },
      ],
    },
    {
      tag: 'AI AGENT GOVERNANCE',
      title: 'Fintech — 200 Engineers',
      challenge: 'Spending on AI coding licenses with no visibility into adoption or ROI. 3 different tools across teams with no measurement or governance.',
      result: 'Deployed governance platform with session-to-PR attribution, EEI metrics, cost tracking, and policy enforcement across Claude Code, Cursor, Copilot. 92% adoption in 6 weeks.',
      metrics: [
        { value: '92%', label: 'Adoption Rate' },
        { value: '30+', label: 'EEI Metrics' },
        { value: '6 Wks', label: 'Full Rollout' },
      ],
    },
  ];

  return (
    <section id="results" className="relative py-24 sm:py-32" style={{ background: 'var(--color-section-alt)' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-[11px] font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--color-primary)' }}>
            Customer Results
          </p>
          <h2 className="text-[clamp(2rem,5vw,3.2rem)] font-bold leading-[1.15]" style={{ color: 'var(--color-text-primary)' }}>
            Measured outcomes, <span className="heading-serif" style={{ color: 'var(--color-primary)' }}>not promises</span>
          </h2>
        </motion.div>

        <div className="space-y-8">
          {caseStudies.map((study, i) => (
            <motion.div
              key={study.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="p-8 sm:p-10 rounded-2xl border relative overflow-hidden"
              style={{ borderColor: 'var(--color-border)', background: 'var(--color-card-bg)' }}
            >
              <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--color-primary)' }}>
                {study.tag}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold mt-2 mb-6" style={{ color: 'var(--color-text-primary)' }}>
                {study.title}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-tertiary)' }}>Challenge</p>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{study.challenge}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-tertiary)' }}>Result</p>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{study.result}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-8 pt-6 border-t" style={{ borderColor: 'var(--color-border)' }}>
                {study.metrics.map((metric) => (
                  <div key={metric.label}>
                    <div className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--color-primary)' }}>{metric.value}</div>
                    <div className="text-xs mt-0.5 font-medium" style={{ color: 'var(--color-text-tertiary)' }}>{metric.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Client story video */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-12"
        >
          <VideoPlaceholder title="Client testimonial — AI transformation at scale" />
        </motion.div>
      </div>
    </section>
  );
}

// ─── Testimonials Section ────────────────────────────────────────────────────

function TestimonialsSection() {
  const testimonials = [
    {
      quote: 'They didn\'t just set up the tools — they changed how our teams think about AI-assisted development. Adoption went from 30% to 92% in six weeks.',
      author: 'VP Engineering',
      company: 'Leading Fintech, 200 engineers',
    },
    {
      quote: 'The multi-agent chatbot handles 60+ intents across 8 languages. Our previous rule-based system had a 40% fallback rate. Now it\'s under 5%.',
      author: 'Head of Product',
      company: 'Fintech, 50M+ users',
    },
    {
      quote: 'Sub-200ms voice latency in production. We thought that was impossible without a massive infra team. Avashya shipped it in 4 weeks.',
      author: 'CTO',
      company: 'Social Entertainment Platform',
    },
  ];

  return (
    <section className="relative py-24 sm:py-32" style={{ background: 'var(--color-cream)' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-[11px] font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--color-primary)' }}>
            What Clients Say
          </p>
          <h2 className="text-[clamp(2rem,5vw,3.2rem)] font-bold leading-[1.15]" style={{ color: 'var(--color-text-primary)' }}>
            Trusted by engineering <span className="heading-serif" style={{ color: 'var(--color-primary)' }}>leaders</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-6 rounded-2xl border"
              style={{ borderColor: 'var(--color-border)', background: 'var(--color-card-bg)' }}
            >
              <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <p className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>{t.author}</p>
                <p className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>{t.company}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA Section ─────────────────────────────────────────────────────────────

function CTASection() {
  return (
    <section id="contact" className="relative py-24 sm:py-32" style={{ background: 'var(--color-section-alt)' }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="section-dark p-10 sm:p-16 text-center"
        >
          <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-bold text-white leading-[1.15] mb-4">
            Stop paying for AI chaos.
            <br />
            <span className="heading-serif text-[var(--color-primary-light)]">Start shipping with governance.</span>
          </h2>
          <p className="text-base text-white/70 max-w-md mx-auto mb-8">
            30-minute call. We diagnose your highest-leverage AI opportunity and tell you exactly what we&apos;d build — even if you don&apos;t hire us.
          </p>
          <a href="mailto:hello@avashya.com" className="btn-primary px-8 py-4 text-sm font-semibold inline-flex items-center gap-2">
            Book a Call <ArrowRight className="w-4 h-4" />
          </a>
          <p className="text-xs text-white/40 mt-6">Or email us directly: hello@avashya.com</p>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="py-12 border-t" style={{ borderColor: 'var(--color-border)', background: 'var(--color-cream)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="Avashya" width={100} height={28} className="h-6 w-auto object-contain logo-themed" />
            <span className="text-xs font-medium" style={{ color: 'var(--color-text-tertiary)' }}>AI Engineering Transformation</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fill="var(--color-text-primary)" d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 0 1-.287-.375 6.18 6.18 0 0 1-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.031-.863.103-.295.072-.583.16-.862.272a2.287 2.287 0 0 1-.28.104.488.488 0 0 1-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 0 1 .224-.167c.279-.144.614-.264 1.005-.36a4.84 4.84 0 0 1 1.246-.151c.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963v2.586zm-3.24 1.214c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 0 0-.735-.136 6.02 6.02 0 0 0-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.47.296.838.296zm6.41.862c-.144 0-.24-.024-.304-.08-.064-.048-.12-.16-.168-.311L7.586 5.55a1.398 1.398 0 0 1-.072-.32c0-.128.064-.2.191-.2h.783c.151 0 .255.025.31.08.065.048.113.16.16.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.151-.312a.549.549 0 0 1 .32-.08h.638c.152 0 .256.025.32.08.063.048.12.16.151.312l1.261 5.348 1.381-5.348c.048-.16.104-.264.16-.312a.52.52 0 0 1 .311-.08h.743c.127 0 .2.065.2.2 0 .04-.009.08-.017.128a1.137 1.137 0 0 1-.056.2l-1.923 6.17c-.048.16-.104.263-.168.311a.51.51 0 0 1-.303.08h-.687c-.151 0-.255-.024-.32-.08-.063-.056-.119-.16-.15-.32l-1.238-5.148-1.23 5.14c-.04.16-.087.264-.15.32-.065.056-.177.08-.32.08zm10.256.215c-.415 0-.83-.048-1.229-.143-.399-.096-.71-.2-.918-.32-.128-.071-.215-.151-.247-.223a.563.563 0 0 1-.048-.224v-.407c0-.167.064-.247.183-.247.048 0 .096.008.144.024.048.016.12.048.2.08.271.12.566.215.878.279.319.064.63.096.95.096.502 0 .894-.088 1.165-.264a.86.86 0 0 0 .415-.758.777.777 0 0 0-.215-.559c-.144-.151-.416-.287-.807-.415l-1.157-.36c-.583-.183-1.014-.454-1.277-.813a1.902 1.902 0 0 1-.4-1.158c0-.335.073-.63.216-.886.144-.255.335-.479.575-.654.24-.184.51-.32.83-.415.32-.096.655-.136 1.006-.136.175 0 .359.008.535.032.183.024.35.056.518.088.16.04.312.08.455.127.144.048.256.096.336.144a.69.69 0 0 1 .24.2.43.43 0 0 1 .071.263v.375c0 .168-.064.256-.184.256a.83.83 0 0 1-.303-.096 3.652 3.652 0 0 0-1.532-.311c-.455 0-.815.071-1.062.223-.248.152-.375.383-.375.71 0 .224.08.416.24.567.159.152.454.304.877.44l1.134.358c.574.184.99.44 1.237.767.247.327.367.702.367 1.117 0 .343-.072.655-.207.926-.144.272-.336.511-.583.703-.248.2-.543.343-.886.447-.36.111-.734.167-1.142.167z"/>
                <path fill="#FF9900" d="M21.698 16.207c-2.626 1.94-6.442 2.969-9.722 2.969-4.598 0-8.74-1.7-11.87-4.526-.247-.223-.024-.527.272-.351 3.384 1.963 7.559 3.153 11.877 3.153 2.914 0 6.114-.607 9.06-1.852.439-.2.814.287.383.607zM22.792 14.961c-.336-.43-2.22-.207-3.074-.103-.255.032-.295-.192-.063-.36 1.5-1.053 3.967-.75 4.254-.399.287.36-.08 2.826-1.485 4.007-.215.184-.423.088-.327-.151.32-.79 1.03-2.57.695-2.994z"/>
              </svg>
              <span className="text-xs font-medium" style={{ color: 'var(--color-text-tertiary)' }}>AWS Advanced Tier</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.304 3.541h-3.672l6.696 16.918H24l-6.696-16.918Zm-10.608 0L0 20.459h3.744l1.37-3.553h7.005l1.37 3.553h3.744L10.536 3.541H6.696Zm-.371 10.223 2.291-5.946 2.292 5.946H6.325Z" fill="#D97757"/>
              </svg>
              <span className="text-xs font-medium" style={{ color: 'var(--color-text-tertiary)' }}>Claude Partner</span>
            </div>
          </div>
          <p className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
            &copy; 2025 Avashya. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <main className="min-h-screen" style={{ background: 'var(--background)' }}>
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <SolutionsSection />
      <DifferentiatorsSection />
      <ApproachSection />
      <ResultsSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
      <ThemeToggle />
    </main>
  );
}
