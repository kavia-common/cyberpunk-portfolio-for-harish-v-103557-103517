import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Section - semantic wrapper with title/subtitle for consistent layout
 */
export default function Section({ id, title, subtitle, children }) {
  return (
    <section id={id} className="section">
      <div className="container">
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}
        <div className="section-content">{children}</div>
      </div>
    </section>
  );
}
