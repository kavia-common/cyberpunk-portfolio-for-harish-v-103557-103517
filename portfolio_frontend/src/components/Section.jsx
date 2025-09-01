import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Section - semantic wrapper with title/subtitle for consistent layout
 * Props:
 * - id?: string
 * - title?: string
 * - subtitle?: string
 * - layout?: 'default' | 'two-col' -> when 'two-col', children are arranged in responsive grid columns
 */
export default function Section({ id, title, subtitle, children, layout = 'default' }) {
  const sectionClass = `section${layout === 'two-col' ? ' section-two-col' : ''}`;
  return (
    <section id={id} className={sectionClass}>
      <div className="container">
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}
        <div className="section-content">{children}</div>
      </div>
    </section>
  );
}
