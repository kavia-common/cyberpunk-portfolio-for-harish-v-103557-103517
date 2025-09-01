import React from 'react';
import SEO from '../components/SEO';
import Hero from '../components/Hero';
import Section from '../components/Section';
import Card from '../components/Card';
import Skills from '../components/Skills';
import projects from '../data/projects.json';
import internships from '../data/internships.json';
import about from '../data/about.json';
import skills from '../data/skills.json';

/**
 * PUBLIC_INTERFACE
 * Home - landing page with hero and key sections:
 * - About
 * - Skills
 * - Projects
 * - Experience/Internships
 */
export default function Home() {
  return (
    <>
      <SEO title="Home — Harish V" />
      <Hero />

      <Section
        id="about"
        title="About"
        subtitle="Security-focused engineer who loves building with AI and clean code."
        layout="two-col"
      >
        <div>
          <p style={{ marginTop: 0 }}>{about.summary}</p>
          <p className="muted">{about.details}</p>
          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            <a className="btn btn-primary" href="#projects">Explore Projects</a>
            <a className="btn btn-ghost" href="/assets/resume/HarishV-Resume.pdf" download>Download Resume</a>
          </div>
        </div>
        <div className="card accent-border">
          <h3 className="card-title">Currently</h3>
          <p className="card-desc">{about.current}</p>
          <div className="card-actions" aria-label="Highlights">
            {about.highlights?.map((h, idx) => (
              <span key={idx} className="btn btn-small btn-ghost" aria-label={h}>{h}</span>
            ))}
          </div>
        </div>
      </Section>

      <Section id="skills" title="Skills & Tools" subtitle="What I use to build.">
        <Skills items={skills} />
      </Section>

      <Section id="projects" title="Featured Projects" subtitle="A quick peek into what I build.">
        <div className="grid">
          {projects.slice(0, 6).map((p) => (
            <Card
              key={p.id}
              title={p.title}
              description={p.description}
              href={p.demo}
              actions={[{ label: 'GitHub', href: p.github }]}
            />
          ))}
        </div>
      </Section>

      <Section id="experience" title="Experience" subtitle="Internships and impactful work.">
        <div className="timeline">
          {internships.map((i) => (
            <div key={i.id} className="timeline-item">
              <div className="card">
                <h3 className="card-title">{i.role} @ {i.company}</h3>
                <p className="card-desc">{i.period} — {i.summary}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
