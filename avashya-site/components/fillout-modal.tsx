'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FilloutModalProps {
  isOpen: boolean;
  onClose: () => void;
  formId?: string;
}

export default function FilloutModal({ isOpen, onClose, formId = 'YOUR_FILLOUT_FORM_ID' }: FilloutModalProps) {
  useEffect(() => {
    // Prevent body scroll when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Handle escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-4 sm:inset-8 md:inset-16 lg:inset-24 z-50 flex items-center justify-center"
          >
            <div className="relative w-full h-full max-w-4xl mx-auto bg-bg-secondary rounded-2xl shadow-2xl overflow-hidden border border-primary/20">
              {/* Header */}
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-primary/10 bg-bg-primary">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-text-primary">Request Platform Demo</h2>
                  <p className="text-sm text-text-secondary mt-1">Fill out the form below and we'll get back to you shortly</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-primary/10 transition-colors text-text-secondary hover:text-text-primary"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Fillout Form Embed */}
              <div className="h-[calc(100%-80px)] sm:h-[calc(100%-96px)] overflow-hidden">
                <iframe
                  src={`https://forms.fillout.com/t/${formId}?theme=dark`}
                  className="w-full h-full border-0"
                  allow="payment"
                  title="Request Platform Demo"
                />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
