import React from 'react';
import SocialLinks from './SocialLinks';

/**
 * PUBLIC_INTERFACE
 * Footer - global footer with social links placeholders
 */
export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer-inner">
        <p className="muted">© {new Date().getFullYear()} Harish V — Built with React</p>
        <div className="socials" aria-label="Footer social links">
          <SocialLinks
            githubUrl="https://github.com/"
            linkedinUrl="https://www.linkedin.com/"
            email="someone@example.com"
            variant="row"
            size={18}
          />
        </div>
      </div>
    </footer>
  );
}
