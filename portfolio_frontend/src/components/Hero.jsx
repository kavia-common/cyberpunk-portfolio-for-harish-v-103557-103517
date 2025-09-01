import React from 'react';
import ResumeButton from './ResumeButton';

/**
 * PUBLIC_INTERFACE
 * Hero - landing hero with neon headline and a lightweight typewriter effect
 * - No external deps; uses setInterval
 * - Accessible: announces rotating roles via aria-live
 */
export default function Hero() {
  const phrases = React.useMemo(
    () => [
      'Cybersecurity',
      'AI Engineering',
      'Software Craft',
      'Threat Modeling',
      'Red Team Mindset',
    ],
    []
  );

  const [index, setIndex] = React.useState(0);
  const [display, setDisplay] = React.useState('');
  const [typing, setTyping] = React.useState(true);

  // Typewriter effect
  React.useEffect(() => {
    const current = phrases[index % phrases.length];
    let i = 0;
    let deleting = false;

    const step = () => {
      if (typing && !deleting) {
        if (i < current.length) {
          setDisplay(current.slice(0, i + 1));
          i += 1;
        } else {
          // pause at full text then start deleting
          deleting = true;
          setTimeout(step, 1000);
          return;
        }
      } else {
        // deleting
        if (i > 0) {
          setDisplay(current.slice(0, i - 1));
          i -= 1;
        } else {
          deleting = false;
          setIndex((v) => (v + 1) % phrases.length);
          setTimeout(step, 260);
          return;
        }
      }
      setTimeout(step, deleting ? 40 : 70);
    };

    const id = setTimeout(step, 260);
    return () => clearTimeout(id);
  }, [index, phrases, typing]);

  return (
    <section className="hero" aria-label="Intro">
      <div className="container">
        <h1 className="title neon glitch" data-text="Harish V — Cyberpunk Engineer">
          Harish V — Cyberpunk Engineer
        </h1>
        <p className="subtitle" aria-live="polite">
          <span className="neon-accent" style={{ fontFamily: 'var(--font-mono)' }}>
            {'>'} {display}
            <span aria-hidden="true" className="cursor" style={{ marginLeft: 2 }}>
              _
            </span>
          </span>
        </p>
        <p className="muted" style={{ maxWidth: 720 }}>
          I build secure and intelligent systems with a hacker-inspired aesthetic — blending
          cybersecurity, AI, and software to ship impactful products.
        </p>
        <div className="cta" style={{ display: 'flex', gap: 10, marginTop: 14, flexWrap: 'wrap' }}>
          <a className="btn btn-primary" href="#projects">View Projects</a>
          <a className="btn btn-ghost" href="#skills">Skills</a>
          <a className="btn btn-ghost" href="/contact">Contact</a>
          <ResumeButton variant="ghost" label="Resume" />
        </div>
      </div>
    </section>
  );
}
