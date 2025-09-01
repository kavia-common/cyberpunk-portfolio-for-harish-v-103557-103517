import React, { useEffect, useMemo } from 'react';

/**
 * PUBLIC_INTERFACE
 * ThemeToggle - floating toggle button (controlled component)
 * Adds prefers-color-scheme support on first mount when no localStorage value exists.
 * Keeps UI label and aria attributes updated. Visual style defined via CSS.
 */
export default function ThemeToggle({ theme, onToggle }) {
  // Determine initial preference only for label/icon (App controls actual theme)
  const prefersDark = useMemo(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }, []);

  // Provide a gentle nudge for users on first load if no stored selection
  useEffect(() => {
    const key = 'hv_theme';
    const stored = window.localStorage.getItem(key);
    if (!stored) {
      // Set initial theme based on prefers-color-scheme (App will read and apply next mount)
      const preferred = prefersDark ? 'dark' : 'light';
      try { window.localStorage.setItem(key, preferred); } catch (_) { /* no-op */ }
      // If the current theme from App differs, we can trigger a toggle by intention
      // but to avoid unexpected flip when App has already chosen, we keep it passive here.
    }
  }, [prefersDark]);

  const nextTheme = theme === 'light' ? 'dark' : 'light';
  const label = `Switch to ${nextTheme} mode`;
  const icon = theme === 'light' ? '🌙' : '☀️';

  return (
    <button
      className="theme-toggle neon-accent scanlines"
      onClick={onToggle}
      aria-label={label}
      title={label}
    >
      <span aria-hidden="true">{icon}</span>
      <span style={{ fontFamily: 'var(--font-mono)' }}>
        {theme === 'light' ? 'Dark' : 'Light'}
      </span>
    </button>
  );
}
