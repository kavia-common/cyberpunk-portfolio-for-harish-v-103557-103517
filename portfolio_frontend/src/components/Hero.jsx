import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Hero - landing hero with tagline and CTA placeholders
 */
export default function Hero() {
  return (
    <section className="hero" aria-label="Intro">
      <div className="container">
        <h1 className="title glitch" data-text="Cybersecurity • AI • Software">
          Cybersecurity • AI • Software
        </h1>
        <p className="subtitle">
          I build secure and intelligent systems with a hacker-inspired aesthetic.
        </p>
        <div className="cta">
          <a className="btn btn-primary" href="#projects">View Projects</a>
          <a className="btn btn-ghost" href="/contact">Contact</a>
        </div>
      </div>
    </section>
  );
}
