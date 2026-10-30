import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const THEMES = {
  FRESH: {
    id: 'fresh',
    name: 'Fresh Green & Crisp White',
    subtitle: 'Modern Grocery Brand',
    primaryColor: '#10b981',
    headerBg: 'bg-emerald-600',
    buttonClass: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    cardBorder: 'border-emerald-100 hover:border-emerald-300',
    accentText: 'text-emerald-700',
  },
  PREMIUM: {
    id: 'premium',
    name: 'Dark Emerald & Cream',
    subtitle: 'Artisanal Bulk Club',
    primaryColor: '#064e3b',
    headerBg: 'bg-emerald-950',
    buttonClass: 'bg-emerald-900 hover:bg-emerald-950 text-amber-100',
    badgeClass: 'bg-amber-100 text-amber-900 border-amber-300',
    cardBorder: 'border-stone-200 hover:border-emerald-800',
    accentText: 'text-amber-800',
  },
  COLORFUL: {
    id: 'colorful',
    name: 'Friendly & Colorful',
    subtitle: 'Warm Family-Focused',
    primaryColor: '#ea580c',
    headerBg: 'bg-orange-600',
    buttonClass: 'bg-orange-600 hover:bg-orange-700 text-white',
    badgeClass: 'bg-orange-100 text-orange-800 border-orange-200',
    cardBorder: 'border-orange-100 hover:border-orange-300',
    accentText: 'text-orange-700',
  },
};

export function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem('cgh_theme') || 'fresh';
  });

  useEffect(() => {
    localStorage.setItem('cgh_theme', currentTheme);
    const root = document.documentElement;
    root.classList.remove('theme-fresh', 'theme-premium', 'theme-colorful');
    root.classList.add(`theme-${currentTheme}`);
  }, [currentTheme]);

  const activeTheme = THEMES[currentTheme.toUpperCase()] || THEMES.FRESH;

  return (
    <ThemeContext.Provider value={{ currentTheme, setCurrentTheme, activeTheme, THEMES }}>
      <div className={`theme-${currentTheme} min-h-screen transition-colors duration-300`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
