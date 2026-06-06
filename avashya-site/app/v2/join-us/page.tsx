'use client';

import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import { ArrowRight, Upload, CheckCircle2, Moon, Sun } from 'lucide-react';
import Image from 'next/image';
import { useEffect } from 'react';

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

function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b" style={{ background: 'var(--color-nav-bg)', borderColor: 'var(--color-border)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <a href="/v2" className="flex items-center gap-3">
          <Image src="/logo.png" alt="Avashya" width={120} height={36} className="h-8 w-auto object-contain logo-themed" />
        </a>
        <div className="hidden md:flex items-center gap-8">
          <a href="/v2#services" className="text-sm font-medium transition-colors hover:text-[var(--color-primary)]" style={{ color: 'var(--color-text-secondary)' }}>Services</a>
          <a href="/v2#solutions" className="text-sm font-medium transition-colors hover:text-[var(--color-primary)]" style={{ color: 'var(--color-text-secondary)' }}>Solutions</a>
          <a href="/v2#approach" className="text-sm font-medium transition-colors hover:text-[var(--color-primary)]" style={{ color: 'var(--color-text-secondary)' }}>Approach</a>
          <a href="/v2/join-us" className="text-sm font-medium transition-colors" style={{ color: 'var(--color-primary)' }}>Join Us</a>
        </div>
        <a href="/v2#contact" className="btn-primary px-5 py-2.5 text-sm font-semibold inline-flex items-center gap-2">
          Book a Call <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </nav>
  );
}

export default function JoinUsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    linkedin: '',
    message: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && (droppedFile.type === 'application/pdf' || droppedFile.name.endsWith('.pdf') || droppedFile.name.endsWith('.doc') || droppedFile.name.endsWith('.docx'))) {
      setFile(droppedFile);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Application: ${formData.role} — ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nRole: ${formData.role}\nLinkedIn: ${formData.linkedin}\n\n${formData.message}\n\n[Resume attached separately]`
    );
    window.location.href = `mailto:careers@avashya.com?subject=${subject}&body=${body}`;
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <main className="min-h-screen" style={{ background: 'var(--background)' }}>
        <Navigation />
        <section className="min-h-screen flex items-center justify-center pt-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center px-4"
          >
            <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
              <CheckCircle2 className="w-8 h-8" style={{ color: '#10B981' }} />
            </div>
            <h1 className="text-3xl font-bold mb-3" style={{ color: 'var(--color-text-primary)' }}>Application sent</h1>
            <p className="text-base mb-6" style={{ color: 'var(--color-text-secondary)' }}>
              Your email client should have opened with the details. Please attach your resume to the email before sending.
            </p>
            <a href="/v2/join-us" className="btn-primary px-6 py-3 text-sm font-semibold inline-flex items-center gap-2">
              Submit another <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </section>
        <ThemeToggle />
      </main>
    );
  }

  return (
    <main className="min-h-screen" style={{ background: 'var(--background)' }}>
      <Navigation />

      <section className="pt-32 sm:pt-40 pb-24" style={{ background: 'var(--color-cream)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <p className="text-[11px] font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--color-primary)' }}>
              Careers
            </p>
            <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.1]" style={{ color: 'var(--color-text-primary)' }}>
              Build production AI
              <br />
              <span className="heading-serif" style={{ color: 'var(--color-primary)' }}>at serious scale</span>
            </h1>
            <p className="text-base mt-5 max-w-lg mx-auto leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
              We&apos;re a small, senior team shipping AI systems for 100K+ user environments. If you want to work on real problems — not POCs that die in staging — we want to hear from you.
            </p>
          </motion.div>

          {/* What we look for */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12 p-6 rounded-2xl border"
            style={{ borderColor: 'var(--color-border)', background: 'var(--color-card-bg)' }}
          >
            <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>What we look for</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                'AWS infrastructure experience (Bedrock, SageMaker, Lambda)',
                'Production ML/AI systems — not just notebooks',
                'Comfort shipping fast in ambiguous environments',
                'Strong opinions on AI agent governance',
                'Experience with LLMs, RAG, or voice systems',
                'Bias toward building over theorizing',
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: 'var(--color-primary)' }} />
                  <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Application form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--color-text-secondary)' }}>Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all focus:ring-2 focus:ring-[var(--color-primary)]/30"
                  style={{ borderColor: 'var(--color-border)', background: 'var(--color-card-bg)', color: 'var(--color-text-primary)' }}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--color-text-secondary)' }}>Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all focus:ring-2 focus:ring-[var(--color-primary)]/30"
                  style={{ borderColor: 'var(--color-border)', background: 'var(--color-card-bg)', color: 'var(--color-text-primary)' }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--color-text-secondary)' }}>Role you&apos;re interested in *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AI Engineer, ML Platform, Solutions Architect"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all focus:ring-2 focus:ring-[var(--color-primary)]/30"
                  style={{ borderColor: 'var(--color-border)', background: 'var(--color-card-bg)', color: 'var(--color-text-primary)' }}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--color-text-secondary)' }}>LinkedIn</label>
                <input
                  type="url"
                  placeholder="https://linkedin.com/in/..."
                  value={formData.linkedin}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all focus:ring-2 focus:ring-[var(--color-primary)]/30"
                  style={{ borderColor: 'var(--color-border)', background: 'var(--color-card-bg)', color: 'var(--color-text-primary)' }}
                />
              </div>
            </div>

            {/* Resume upload */}
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--color-text-secondary)' }}>Resume *</label>
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className="w-full p-8 rounded-xl border-2 border-dashed cursor-pointer transition-all text-center"
                style={{
                  borderColor: isDragging ? 'var(--color-primary)' : 'var(--color-border)',
                  background: isDragging ? 'rgba(0, 119, 182, 0.04)' : 'var(--color-card-bg)',
                }}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.[0]) setFile(e.target.files[0]);
                  }}
                />
                {file ? (
                  <div className="flex items-center justify-center gap-3">
                    <CheckCircle2 className="w-5 h-5" style={{ color: '#10B981' }} />
                    <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{file.name}</span>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); setFile(null); }}
                      className="text-xs underline"
                      style={{ color: 'var(--color-text-tertiary)' }}
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <>
                    <Upload className="w-8 h-8 mx-auto mb-3" style={{ color: 'var(--color-text-tertiary)' }} />
                    <p className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                      Drop your resume here or click to browse
                    </p>
                    <p className="text-xs mt-1" style={{ color: 'var(--color-text-tertiary)' }}>PDF, DOC, DOCX — max 10MB</p>
                  </>
                )}
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--color-text-secondary)' }}>Anything else you want us to know?</label>
              <textarea
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="What excites you about working at Avashya?"
                className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all resize-none focus:ring-2 focus:ring-[var(--color-primary)]/30"
                style={{ borderColor: 'var(--color-border)', background: 'var(--color-card-bg)', color: 'var(--color-text-primary)' }}
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="btn-primary btn-glow px-8 py-4 text-sm font-semibold inline-flex items-center gap-2 w-full sm:w-auto justify-center"
              >
                Submit Application <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-xs mt-3" style={{ color: 'var(--color-text-tertiary)' }}>
                This will open your email client. Please attach your resume to the email before sending.
              </p>
            </div>
          </motion.form>
        </div>
      </section>

      <ThemeToggle />
    </main>
  );
}
