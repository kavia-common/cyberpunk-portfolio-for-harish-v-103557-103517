import React from 'react';

/**
 * PUBLIC_INTERFACE
 * EmailLink - Accessible email anchor with optional subject/body and consistent styling.
 * Props:
 *  - email: string (required)
 *  - subject?: string
 *  - body?: string
 *  - children?: ReactNode (defaults to email)
 *  - className?: string (extra classes)
 */
export default function EmailLink({ email, subject = '', body = '', children, className = '' }) {
  const params = new URLSearchParams();
  if (subject) params.set('subject', subject);
  if (body) params.set('body', body);
  const href = `mailto:${email}${params.toString() ? `?${params.toString()}` : ''}`;

  return (
    <a
      href={href}
      className={`link ${className}`}
      aria-label={`Send email to ${email}${subject ? ` about ${subject}` : ''}`}
    >
      <span style={{ fontFamily: 'var(--font-mono)' }}>
        {children || email}
      </span>
    </a>
  );
}
