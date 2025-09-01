import React from 'react';
import { useParams } from 'react-router-dom';
import SEO from '../components/SEO';

/**
 * PUBLIC_INTERFACE
 * BlogPost - placeholder that will later render markdown by slug
 * For now, it shows a static message guiding where content will appear.
 */
export default function BlogPost() {
  const { slug } = useParams();

  return (
    <>
      <SEO title={`Blog — ${slug}`} />
      <section className="section">
        <div className="container">
          <h1 className="section-title">Blog Post: {slug}</h1>
          <p className="muted">
            Placeholder. The markdown content for this post will be loaded from
            /src/content/blog/{slug}.md and rendered here.
          </p>
        </div>
      </section>
    </>
  );
}
