import React from 'react';
import SEO from '../components/SEO';
import Section from '../components/Section';

/**
 * PUBLIC_INTERFACE
 * Contact - static placeholder for future Firebase form integration
 */
export default function Contact() {
  return (
    <>
      <SEO title="Contact — Harish V" />
      <Section id="contact" title="Get in touch" subtitle="Open to internships, collaborations, and interesting problems.">
        <p className="muted">
          Contact form will be integrated with Firebase later. For now, email at:
          <br />
          <a className="link" href="mailto:someone@example.com">someone@example.com</a>
        </p>
      </Section>
    </>
  );
}
