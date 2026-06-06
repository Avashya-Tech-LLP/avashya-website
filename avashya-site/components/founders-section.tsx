'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function FoundersSection() {
  const founders = [
    { name: 'Varun Kumar', credentials: 'Co-founder · Ex-AWS, Ex-Microsoft', initials: 'VK', photo: '/founders/varun.jpg', linkedin: 'https://www.linkedin.com/in/varun-kumar-64576825/' },
    { name: 'Pradipta Dash', credentials: 'Co-founder · Ex-AWS, Ex-Microsoft', initials: 'PD', photo: '/founders/pradipta.jpg', linkedin: 'https://www.linkedin.com/in/pradipta-dash/' },
    { name: 'Supreeth Angadi', credentials: 'Co-founder · Ex-AWS', initials: 'SA', photo: '/founders/supreeth.jpg', linkedin: 'https://www.linkedin.com/in/supreeth-s-angadi-64843116a/' },
    { name: 'Hirdesh Singhal', credentials: 'Co-founder', initials: 'HS', photo: '/founders/hirdesh.jpg', linkedin: 'https://www.linkedin.com/in/hirdeshsinghal' },
  ];

  return (
    <section id="company" className="relative py-24 sm:py-32" style={{ background: 'var(--color-cream)' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Testimonial quote placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mb-20 p-8 sm:p-12 rounded-2xl border-2 border-dashed text-center"
          style={{ borderColor: 'var(--color-border)', background: 'var(--color-card-bg)' }}
        >
          <p className="text-[11px] uppercase tracking-widest mb-6" style={{ color: 'var(--color-text-tertiary)' }}>Customer Testimonial Placeholder</p>
          <blockquote className="text-lg sm:text-xl font-medium italic leading-relaxed mb-6" style={{ color: 'var(--color-text-primary)' }}>
            &ldquo;We were spending $180k/year on AI coding tool licenses with no idea if it was working. Avashya showed us in the first week.&rdquo;
          </blockquote>
          <p className="text-sm" style={{ color: 'var(--color-text-tertiary)' }}>— VP Engineering, Series C Fintech (replace with real quote)</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.15] mb-5">
            <span className="text-text-primary">Built by engineers who scaled</span>
            <br />
            <span className="heading-serif text-text-secondary">hyperscaler infrastructure</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-lg mx-auto">
            We built systems that run millions of workloads. Now we're building the observability layer for AI engineering.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {founders.map((founder, index) => (
            <motion.div
              key={founder.name}
              initial={{ opacity: 0, y: 30, filter: 'blur(4px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, boxShadow: '0 25px 50px -15px rgba(0,0,0,0.1)' }}
              className="text-center py-10 px-6 rounded-2xl bg-white border border-black/[0.04] transition-all duration-300 relative overflow-hidden flex flex-col items-center"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
              <motion.div
                whileHover={{ scale: 1.08, rotate: 3 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="w-20 h-20 rounded-full border-2 flex items-center justify-center overflow-hidden flex-shrink-0"
                style={{ background: 'var(--color-section-alt)', borderColor: 'rgba(139, 92, 246, 0.15)' }}
              >
                <Image
                  src={founder.photo}
                  alt={founder.name}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <h3 className="text-base font-semibold text-text-primary mt-4 mb-0.5">{founder.name}</h3>
              <p className="text-[11px] text-text-tertiary flex-1">{founder.credentials}</p>
              <a
                href={founder.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[11px] font-medium transition-colors mt-3"
                style={{ color: 'var(--color-text-tertiary)' }}
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                LinkedIn
              </a>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-14 flex justify-center"
        >
          <div className="flex flex-wrap items-center justify-center gap-3">
            <div className="px-4 py-2.5 rounded-full bg-white border border-black/[0.06] shadow-sm">
              <span className="text-xs text-text-tertiary">
                <span className="text-[#D97706]">●</span>{' '}Official Claude Partner
              </span>
            </div>
            <div className="px-4 py-2.5 rounded-full bg-white border border-black/[0.06] shadow-sm">
              <span className="text-xs text-text-tertiary">
                <span className="text-aws-orange">●</span>{' '}AWS Advanced Tier Partner
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
