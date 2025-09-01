import React, { useState, useEffect } from 'react';
import './App.css';
import './styles/global.css';
import './styles/theme.css';
import AppRouter from './router';
import ThemeToggle from './components/ThemeToggle';

/**
 * PUBLIC_INTERFACE
 * App is the top-level component that:
 * - Manages theme state (light/dark)
 * - Applies theme to the document for CSS variables
 * - Wraps the application with the Router-driven layout
 */
function App() {
  const [theme, setTheme] = useState('light');

  // Persist theme choice in localStorage for UX continuity
  useEffect(() => {
    const saved = window.localStorage.getItem('hv_theme');
    if (saved) setTheme(saved);
  }, []);

  // Apply theme and persist on changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem('hv_theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="App app-shell">
      <ThemeToggle theme={theme} onToggle={toggleTheme} />
      <AppRouter />
    </div>
  );
}

export default App;
