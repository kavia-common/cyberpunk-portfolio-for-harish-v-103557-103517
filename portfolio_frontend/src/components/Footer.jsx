import React from 'react';
import Icon from './Icon';

/**
 * PUBLIC_INTERFACE
 * Footer - global footer with social links placeholders
 */
export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer-inner">
        <p className="muted">© {new Date().getFullYear()} Harish V — Built with React</p>
        <div className="socials">
          <a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub">
            <Icon name="github" />
          </a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <Icon name="linkedin" />
          </a>
          <a href="mailto:someone@example.com" aria-label="Email">
            <Icon name="mail" />
          </a>
        </div>
      </div>
    </footer>
  );
}
