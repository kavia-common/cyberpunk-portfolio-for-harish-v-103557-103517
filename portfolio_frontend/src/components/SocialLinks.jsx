import React from 'react';
import Icon from './Icon';
import EmailLink from './EmailLink';

/**
 * PUBLIC_INTERFACE
 * SocialLinks - Inline social icons with labels/aria for accessibility.
 * Props:
 *  - githubUrl: string
 *  - linkedinUrl: string
 *  - email: string
 *  - variant?: 'row' | 'column' (layout preference)
 *  - size?: number (icon size)
 */
export default function SocialLinks({
  githubUrl = 'https://github.com/',
  linkedinUrl = 'https://www.linkedin.com/',
  email = 'someone@example.com',
  variant = 'row',
  size = 20,
}) {
  const isRow = variant === 'row';
  return (
    <div
      className="social-links"
      role="group"
      aria-label="Social links"
      style={{
        display: 'flex',
        flexDirection: isRow ? 'row' : 'column',
        gap: isRow ? 12 : 10,
        alignItems: isRow ? 'center' : 'flex-start',
        flexWrap: 'wrap'
      }}
    >
      <a
        className="btn btn-small btn-ghost"
        href={githubUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="GitHub profile"
      >
        <Icon name="github" size={size} />
        <span style={{ marginLeft: 8 }}>GitHub</span>
      </a>
      <a
        className="btn btn-small btn-ghost"
        href={linkedinUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="LinkedIn profile"
      >
        <Icon name="linkedin" size={size} />
        <span style={{ marginLeft: 8 }}>LinkedIn</span>
      </a>
      <EmailLink email={email} className="btn btn-small btn-ghost" subject="Hello from your portfolio">
        <span style={{ display: 'inline-flex', alignItems: 'center' }}>
          <Icon name="mail" size={size} />
          <span style={{ marginLeft: 8 }}>Email</span>
        </span>
      </EmailLink>
    </div>
  );
}
