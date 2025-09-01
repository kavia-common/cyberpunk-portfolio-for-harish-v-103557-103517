import React from 'react';
import SEO from '../components/SEO';
import Hero from '../components/Hero';
import Section from '../components/Section';
import Card from '../components/Card';
import projects from '../data/projects.json';
import internships from '../data/internships.json';

/**
 * PUBLIC_INTERFACE
 * Home - landing page with hero and key sections (projects, internships)
 */
export default function Home() {
  return (
    <>
      <SEO title="Home — Harish V" />
      <Hero />
      <Section id="projects" title="Featured Projects" subtitle="A quick peek into what I build.">
        <div className="grid">
          {projects.slice(0, 6).map((p) => (
            <Card key={p.id} title={p.title} description={p.description} href={p.demo} actions={[
              { label: 'GitHub', href: p.github },
            ]} />
          ))}
        </div>
      </Section>
      <Section id="experience" title="Internships & Experience" subtitle="Hands-on learning and impact.">
        <div className="grid">
          {internships.map((i) => (
            <Card key={i.id} title={`${i.role} @ ${i.company}`} description={`${i.period} — ${i.summary}`} />
          ))}
        </div>
      </Section>
    </>
  );
}
