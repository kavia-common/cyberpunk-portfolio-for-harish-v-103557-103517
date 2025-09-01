import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Section from '../components/Section';
import blogIndex from '../data/blogIndex.json';
import { loadMarkdownBySlug } from '../utils/blogLoader';

/**
 * PUBLIC_INTERFACE
 * Blog - lists markdown posts using blogIndex.json and frontmatter metadata.
 */
export default function Blog() {
  const posts = React.useMemo(() => {
    // Attach optional summary from frontmatter if present
    return blogIndex.map((p) => {
      const loaded = loadMarkdownBySlug(p.slug);
      const summary = loaded?.data?.summary;
      return { ...p, summary };
    });
  }, []);

  return (
    <>
      <SEO title="Blog — Harish V" />
      <Section id="blog" title="Blog" subtitle="Notes on cybersecurity, AI, and engineering.">
        <ul className="list" aria-label="Blog posts">
          {posts.map((post) => (
            <li key={post.slug} className="list-item">
              <Link to={`/blog/${post.slug}`} className="list-link">
                <span className="list-title">{post.title}</span>
                <span className="list-meta">{post.date}</span>
              </Link>
              {post.summary && <p className="muted" style={{ marginTop: 6 }}>{post.summary}</p>}
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
