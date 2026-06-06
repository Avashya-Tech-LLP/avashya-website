'use client';

import { motion } from 'framer-motion';
import { Mail, Building2, User, MessageSquare, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import Toast from './toast';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error';
  }>({
    show: false,
    message: '',
    type: 'success',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Success
        setToast({
          show: true,
          message: "Message sent! We'll respond within 24 hours.",
          type: 'success',
        });
        // Clear form
        setFormData({
          name: '',
          email: '',
          company: '',
          message: '',
        });
      } else {
        // Error from API
        setToast({
          show: true,
          message: data.error || 'Something went wrong. Please try again.',
          type: 'error',
        });
      }
    } catch (error) {
      // Network error
      setToast({
        show: true,
        message: 'Failed to send message. Please try again or email us at hello@avashya.tech',
        type: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-16 sm:py-20 md:py-24 lg:py-32 bg-bg-primary overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-start lg:items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect mb-6">
              <Mail className="w-4 h-4 text-accent flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium text-text-secondary">Get Started</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-4 sm:mb-6">
              Ready to
              <br />
              <span className="gradient-text">Optimize Your Agents?</span>
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-text-secondary mb-6 sm:mb-8 leading-relaxed">
              Schedule a technical consultation to assess your Engineering Effectiveness Index
              and map optimization opportunities in your ISDLC.
            </p>

            <div className="space-y-5 sm:space-y-6">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-bold text-sm sm:text-base">1</span>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-text-primary mb-1">
                    Baseline Assessment
                  </h3>
                  <p className="text-sm sm:text-base text-text-tertiary leading-relaxed">
                    We analyze your current agent usage patterns, context efficiency, and iteration overhead
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-lg sm:rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-secondary font-bold text-sm sm:text-base">2</span>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-text-primary mb-1">
                    ISDLC Mapping
                  </h3>
                  <p className="text-sm sm:text-base text-text-tertiary leading-relaxed">
                    Identify gaps across Intend, Structure, Develop, Launch, and Continuously Evolve phases
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-lg sm:rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-accent font-bold text-sm sm:text-base">3</span>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-text-primary mb-1">
                    Optimization Roadmap
                  </h3>
                  <p className="text-sm sm:text-base text-text-tertiary leading-relaxed">
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
              className="glass-effect rounded-xl sm:rounded-2xl p-6 sm:p-8 border-primary/20"
            >
              <div className="space-y-5 sm:space-y-6">
                <div>
                  <label htmlFor="name" className="flex items-center gap-2 text-xs sm:text-sm font-medium text-text-secondary mb-2">
                    <User className="w-3.5 sm:w-4 h-3.5 sm:h-4 flex-shrink-0" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-bg-secondary border border-primary/10 rounded-lg sm:rounded-xl text-sm sm:text-base text-text-primary placeholder-text-tertiary focus:outline-none focus:border-primary/50 transition-colors min-h-[44px]"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="flex items-center gap-2 text-xs sm:text-sm font-medium text-text-secondary mb-2">
                    <Mail className="w-3.5 sm:w-4 h-3.5 sm:h-4 flex-shrink-0" />
                    Work Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-bg-secondary border border-primary/10 rounded-lg sm:rounded-xl text-sm sm:text-base text-text-primary placeholder-text-tertiary focus:outline-none focus:border-primary/50 transition-colors min-h-[44px]"
                    placeholder="john@company.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="company" className="flex items-center gap-2 text-xs sm:text-sm font-medium text-text-secondary mb-2">
                    <Building2 className="w-3.5 sm:w-4 h-3.5 sm:h-4 flex-shrink-0" />
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 bg-bg-secondary border border-primary/10 rounded-lg sm:rounded-xl text-sm sm:text-base text-text-primary placeholder-text-tertiary focus:outline-none focus:border-primary/50 transition-colors min-h-[44px]"
                    placeholder="Acme Corp"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="flex items-center gap-2 text-xs sm:text-sm font-medium text-text-secondary mb-2">
                    <MessageSquare className="w-3.5 sm:w-4 h-3.5 sm:h-4 flex-shrink-0" />
                    Tell us about your current agent workflow
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 bg-bg-secondary border border-primary/10 rounded-lg sm:rounded-xl text-sm sm:text-base text-text-primary placeholder-text-tertiary focus:outline-none focus:border-primary/50 transition-colors resize-none min-h-[100px]"
                    placeholder="We're using Claude/Copilot/Cursor across 15 engineers..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full group relative px-6 py-3.5 sm:py-4 bg-primary hover:bg-primary-light rounded-lg sm:rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden text-sm sm:text-base min-h-[48px] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10">
                    {isSubmitting ? 'Sending...' : 'Request Consultation'}
                  </span>
                  {!isSubmitting && (
                    <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>

                <p className="text-[10px] sm:text-xs text-text-tertiary text-center leading-relaxed">
                  We typically respond within 24 hours. Your data is handled per our privacy policy.
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </section>
  );
}
