import React from 'react';

/**
 * PUBLIC_INTERFACE
 * SEO - basic document title/meta setter (placeholder; expand later)
 */
export default function SEO({ title = 'Harish V — Portfolio', description = 'Cybersecurity • AI • Software' }) {
  React.useEffect(() => {
    document.title = title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', description);
    } else {
      const m = document.createElement('meta');
      m.setAttribute('name', 'description');
      m.setAttribute('content', description);
      document.head.appendChild(m);
    }
  }, [title, description]);

  return null;
}
