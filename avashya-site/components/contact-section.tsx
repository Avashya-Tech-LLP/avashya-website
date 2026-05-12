'use client';

import { motion } from 'framer-motion';
import { Mail, Building2, User, MessageSquare, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 bg-bg-primary overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect mb-6">
              <Mail className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-text-secondary">Get Started</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
              Ready to
              <br />
              <span className="gradient-text">Optimize Your Agents?</span>
            </h2>

            <p className="text-xl text-text-secondary mb-8 leading-relaxed">
              Schedule a technical consultation to assess your Engineering Effectiveness Index
              and map optimization opportunities in your AIDLC.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-text-primary mb-1">
                    Baseline Assessment
                  </h3>
                  <p className="text-text-tertiary">
                    We analyze your current agent usage patterns, context efficiency, and iteration overhead
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-secondary font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-text-primary mb-1">
                    AIDLC Mapping
                  </h3>
                  <p className="text-text-tertiary">
                    Identify gaps in discovery, development, testing, and deployment phases
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-accent font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-text-primary mb-1">
                    Optimization Roadmap
                  </h3>
                  <p className="text-text-tertiary">
                    Receive a prioritized implementation plan with measurable ROI projections
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form
              onSubmit={handleSubmit}
              className="glass-effect rounded-2xl p-8 border-primary/20"
            >
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="flex items-center gap-2 text-sm font-medium text-text-secondary mb-2">
                    <User className="w-4 h-4" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-bg-secondary border border-primary/10 rounded-xl text-text-primary placeholder-text-tertiary focus:outline-none focus:border-primary/50 transition-colors"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-text-secondary mb-2">
                    <Mail className="w-4 h-4" />
                    Work Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-bg-secondary border border-primary/10 rounded-xl text-text-primary placeholder-text-tertiary focus:outline-none focus:border-primary/50 transition-colors"
                    placeholder="john@company.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="company" className="flex items-center gap-2 text-sm font-medium text-text-secondary mb-2">
                    <Building2 className="w-4 h-4" />
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 bg-bg-secondary border border-primary/10 rounded-xl text-text-primary placeholder-text-tertiary focus:outline-none focus:border-primary/50 transition-colors"
                    placeholder="Acme Corp"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="flex items-center gap-2 text-sm font-medium text-text-secondary mb-2">
                    <MessageSquare className="w-4 h-4" />
                    Tell us about your current agent workflow
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 bg-bg-secondary border border-primary/10 rounded-xl text-text-primary placeholder-text-tertiary focus:outline-none focus:border-primary/50 transition-colors resize-none"
                    placeholder="We're using Claude/Copilot/Cursor across 15 engineers..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full group relative px-6 py-4 bg-primary hover:bg-primary-light rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden"
                >
                  <span className="relative z-10">Request Consultation</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>

                <p className="text-xs text-text-tertiary text-center">
                  We typically respond within 24 hours. Your data is handled per our privacy policy.
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
