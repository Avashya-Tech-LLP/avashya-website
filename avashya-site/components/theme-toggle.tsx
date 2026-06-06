'use client';

import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'cream' | 'dark'>('cream');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
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
