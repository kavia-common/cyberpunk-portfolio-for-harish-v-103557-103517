import React, { useState, useEffect } from 'react';
import './App.css';
import './styles/global.css';
import './styles/theme.css';
import AppRouter from './router';
import ThemeToggle from './components/ThemeToggle';

/**
 * PUBLIC_INTERFACE
 * App is the top-level component that:
 * - Manages theme state (light/dark) with prefers-color-scheme + localStorage
 * - Applies theme to the document for CSS variables
 * - Wraps the application with the Router-driven layout
 */
function App() {
  const getInitialTheme = () => {
    const saved = typeof window !== 'undefined' ? window.localStorage.getItem('hv_theme') : null;
    if (saved === 'light' || saved === 'dark') return saved;
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  };

  const [theme, setTheme] = useState(getInitialTheme);

  // Apply theme and persist on changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try { window.localStorage.setItem('hv_theme', theme); } catch (_) { /* ignore */ }
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="app-shell accent-bg">
      <ThemeToggle theme={theme} onToggle={toggleTheme} />
      <AppRouter />
    </div>
  );
}

export default App;
