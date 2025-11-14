"use client";

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, systemTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return a placeholder with the same dimensions to avoid layout shift
    return (
      <div className={`p-2 rounded-lg w-10 h-10 ${className}`}>
        <div className="w-6 h-6 animate-pulse bg-white/20 rounded"></div>
      </div>
    );
  }

  const currentTheme = theme === 'system' ? systemTheme : theme;

  const toggleTheme = () => {
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-lg hover:bg-white/10 dark:hover:bg-white/10 hover:bg-black/10 text-gray-700 dark:text-white/70 hover:text-gray-900 dark:hover:text-white transition-colors group ${className}`}
      title={`Switch to ${currentTheme === 'dark' ? 'light' : 'dark'} mode`}
      aria-label={`Switch to ${currentTheme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <div className="relative w-6 h-6 overflow-hidden">
        {/* Sun Icon */}
        <svg
          className={`absolute inset-0 w-6 h-6 transition-transform duration-300 ${
            currentTheme === 'dark' 
              ? 'rotate-90 scale-0 opacity-0' 
              : 'rotate-0 scale-100 opacity-100'
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="5" strokeWidth={2} />
          <path strokeWidth={2} d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>

        {/* Moon Icon */}
        <svg
          className={`absolute inset-0 w-6 h-6 transition-transform duration-300 ${
            currentTheme === 'dark' 
              ? 'rotate-0 scale-100 opacity-100' 
              : '-rotate-90 scale-0 opacity-0'
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeWidth={2} d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </div>
    </button>
  );
}