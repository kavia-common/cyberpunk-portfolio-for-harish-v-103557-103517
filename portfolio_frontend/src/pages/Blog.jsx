import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Section from '../components/Section';
import blogIndex from '../data/blogIndex.json';

/**
 * PUBLIC_INTERFACE
 * Blog - list of markdown posts (placeholder links)
 */
export default function Blog() {
  return (
    <>
      <SEO title="Blog — Harish V" />
      <Section id="blog" title="Blog" subtitle="Notes on cybersecurity, AI, and engineering.">
        <ul className="list">
          {blogIndex.map((post) => (
            <li key={post.slug} className="list-item">
              <Link to={`/blog/${post.slug}`} className="list-link">
                <span className="list-title">{post.title}</span>
                <span className="list-meta">{post.date}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
