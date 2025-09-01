import React from 'react';
import SEO from '../components/SEO';

/**
 * PUBLIC_INTERFACE
 * NotFound - 404 page
 */
export default function NotFound() {
  return (
    <>
      <SEO title="404 — Not Found" />
      <section className="section">
        <div className="container">
          <h1 className="section-title">404 — Not Found</h1>
          <p className="muted">The page you are looking for does not exist.</p>
          <a className="btn" href="/">Go Home</a>
        </div>
      </section>
    </>
  );
}
