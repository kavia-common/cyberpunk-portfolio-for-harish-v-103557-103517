import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Icon - simple inline icon component (placeholder SVGs)
 */
export default function Icon({ name, size = 20 }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'currentColor', 'aria-hidden': true };
  if (name === 'github') {
    return (
      <svg {...common}><path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.1-.75.08-.73.08-.73 1.22.09 1.86 1.27 1.86 1.27 1.08 1.85 2.83 1.32 3.52 1.01.11-.78.42-1.31.77-1.61-2.67-.3-5.47-1.33-5.47-5.94 0-1.31.47-2.38 1.24-3.22-.12-.31-.54-1.56.12-3.25 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.69.24 2.94.12 3.25.77.84 1.24 1.91 1.24 3.22 0 4.62-2.8 5.64-5.47 5.94.43.37.82 1.09.82 2.2v3.26c0 .32.21.69.83.58A12 12 0 0 0 12 .5Z"/></svg>
    );
  }
  if (name === 'linkedin') {
    return (
      <svg {...common}><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5.001 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM14.5 9c-2.21 0-4 1.79-4 4v8h4v-7c0-.55.45-1 1-1s1 .45 1 1v7h4v-8c0-2.21-1.79-4-4-4z"/></svg>
    );
  }
  if (name === 'mail') {
    return (
      <svg {...common}><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5L4 8V6l8 5 8-5v2z"/></svg>
    );
  }
  if (name === 'logo') {
    return (
      <svg {...common}><path d="M3 12h6l3-6 3 6h6l-6 3 3 6-6-3-6 3 3-6-6-3z"/></svg>
    );
  }
  return <span style={{ display: 'inline-block', width: size, height: size }} />;
}
