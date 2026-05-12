'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Zap, Code2, TrendingUp } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bg-primary">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)`,
          backgroundSize: '64px 64px'
        }} />
      </div>

      {/* Gradient Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24">
        <div className="text-center space-y-6 sm:space-y-8">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex"
          >
            <div className="glass-effect rounded-full px-4 sm:px-6 py-2 inline-flex items-center gap-2">
              <Zap className="w-4 h-4 text-accent flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium text-text-secondary">
                The Avashya Intelligence Platform
              </span>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight px-2"
          >
            <span className="text-text-primary">Maximize Engineering</span>
            <br />
            <span className="text-text-primary">Velocity with </span>
            <span className="gradient-text">Agentic Optimization</span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-text-secondary max-w-4xl mx-auto leading-relaxed px-2"
          >
            Transform AI coding assistants from experimental tools into measurable productivity multipliers.
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            Optimize context management, orchestrate team agents, and ship with confidence.
          </motion.p>

          {/* Value Props Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-4xl mx-auto pt-6 sm:pt-8 px-2"
          >
            {[
              { icon: Code2, label: '3x Context Efficiency', description: 'Eliminate redundant token usage' },
              { icon: TrendingUp, label: '40% Faster Iterations', description: 'Measurable cycle time reduction' },
              { icon: Zap, label: 'Zero Trust Agent Security', description: 'Enterprise-grade governance' },
            ].map((item, index) => (
              <div
                key={index}
                className="glass-effect rounded-xl sm:rounded-2xl p-4 sm:p-6 text-left hover:border-primary/30 transition-all duration-300"
              >
                <item.icon className="w-6 sm:w-8 h-6 sm:h-8 text-primary mb-2 sm:mb-3" />
                <h3 className="text-base sm:text-lg font-semibold text-text-primary mb-1">{item.label}</h3>
                <p className="text-xs sm:text-sm text-text-tertiary">{item.description}</p>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center pt-6 sm:pt-8 px-2"
          >
            <button className="group relative px-6 sm:px-8 py-3.5 sm:py-4 bg-primary hover:bg-primary-light rounded-full font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden min-h-[48px]">
              <span className="relative z-10 text-sm sm:text-base">Request Platform Demo</span>
              <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 transition-transform flex-shrink-0" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            <button className="px-6 sm:px-8 py-3.5 sm:py-4 glass-effect hover:border-primary/50 rounded-full font-semibold text-text-primary transition-all duration-300 text-sm sm:text-base min-h-[48px]">
              Assess Your Engineering Effectiveness
            </button>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="pt-12 sm:pt-16 px-2"
          >
            <p className="text-xs sm:text-sm text-text-tertiary mb-4">Trusted by engineering teams optimizing AI workflows</p>
            <div className="flex justify-center items-center gap-4 sm:gap-6 md:gap-8 opacity-50 overflow-x-auto">
              {/* Placeholder for company logos */}
              <div className="w-20 sm:w-24 h-6 sm:h-8 bg-text-tertiary/20 rounded flex-shrink-0" />
              <div className="w-20 sm:w-24 h-6 sm:h-8 bg-text-tertiary/20 rounded flex-shrink-0" />
              <div className="w-20 sm:w-24 h-6 sm:h-8 bg-text-tertiary/20 rounded flex-shrink-0 hidden sm:block" />
              <div className="w-20 sm:w-24 h-6 sm:h-8 bg-text-tertiary/20 rounded flex-shrink-0 hidden sm:block" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-text-tertiary/50 rounded-full flex items-start justify-center p-2"
        >
          <div className="w-1 h-2 bg-text-tertiary/50 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
