'use client';

import { useEffect, useState } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Toast from './toast';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const [formData, setFormData] = useState({ email: '', company: '', teamSize: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' }>({ show: false, message: '', type: 'success' });

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    const handleEscape = (e: KeyboardEvent) => { if (e.key === 'Escape' && isOpen) onClose(); };
    document.addEventListener('keydown', handleEscape);
    return () => { document.removeEventListener('keydown', handleEscape); document.body.style.overflow = 'unset'; };
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (apiUrl) {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: '', email: formData.email, company: formData.company, message: `Team size: ${formData.teamSize}` }),
        });
        if (response.ok) {
          setToast({ show: true, message: "We'll be in touch within 24 hours.", type: 'success' });
          setFormData({ email: '', company: '', teamSize: '' });
          setTimeout(onClose, 1500);
        } else {
          setToast({ show: true, message: 'Something went wrong. Please try again.', type: 'error' });
        }
      } else {
        const subject = encodeURIComponent(`Demo Request - ${formData.company}`);
        const body = encodeURIComponent(`Email: ${formData.email}\nCompany: ${formData.company}\nTeam Size: ${formData.teamSize}`);
        window.location.href = `mailto:pradipta.dash@avashya.tech?subject=${subject}&body=${body}`;
        setToast({ show: true, message: "Opening email client...", type: 'success' });
        setFormData({ email: '', company: '', teamSize: '' });
        setTimeout(onClose, 1500);
      }
    } catch {
      setToast({ show: true, message: 'Failed to send. Please email pradipta.dash@avashya.tech', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="w-full max-w-md rounded-3xl border shadow-2xl overflow-hidden" style={{ background: '#FAF8F5', borderColor: 'rgba(0,0,0,0.05)' }}>
                <div className="flex items-center justify-between p-6" style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                  <div>
                    <h2 className="text-xl font-semibold" style={{ color: '#1A1A1A' }}>Request a Demo</h2>
                    <p className="text-sm mt-1" style={{ color: '#8A8A8A' }}>We'll reach out within 24 hours</p>
                  </div>
                  <button onClick={onClose} className="p-2 rounded-full hover:bg-black/5 transition-colors" style={{ color: '#8A8A8A' }} aria-label="Close">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  <div>
                    <label htmlFor="demo-email" className="block text-sm mb-1.5 font-medium" style={{ color: '#4A4A4A' }}>Work email</label>
                    <input type="email" id="demo-email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
                      style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.1)', color: '#1A1A1A' }}
                      placeholder="you@company.com" required />
                  </div>
                  <div>
                    <label htmlFor="demo-company" className="block text-sm mb-1.5 font-medium" style={{ color: '#4A4A4A' }}>Company</label>
                    <input type="text" id="demo-company" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
                      style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.1)', color: '#1A1A1A' }}
                      placeholder="Acme Corp" required />
                  </div>
                  <div>
                    <label htmlFor="demo-team-size" className="block text-sm mb-1.5 font-medium" style={{ color: '#4A4A4A' }}>Engineering team size</label>
                    <select id="demo-team-size" value={formData.teamSize} onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all appearance-none"
                      style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.1)', color: '#1A1A1A' }}
                      required>
                      <option value="" disabled>Select team size</option>
                      <option value="1-10">1–10 engineers</option>
                      <option value="11-50">11–50 engineers</option>
                      <option value="51-200">51–200 engineers</option>
                      <option value="200+">200+ engineers</option>
                    </select>
                  </div>
                  <button type="submit" disabled={isSubmitting}
                    className="w-full px-6 py-3.5 text-sm font-semibold rounded-full flex items-center justify-center gap-2 min-h-[48px] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    style={{ background: '#7C3AED', color: '#FFFFFF' }}>
                    <span>{isSubmitting ? 'Sending...' : 'Request Demo'}</span>
                    {!isSubmitting && <ArrowRight className="w-4 h-4" />}
                  </button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <Toast message={toast.message} type={toast.type} isVisible={toast.show} onClose={() => setToast({ ...toast, show: false })} />
    </>
  );
}
