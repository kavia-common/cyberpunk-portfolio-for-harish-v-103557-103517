import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Card - generic glassy/neon card for projects/blog items
 */
export default function Card({ title, description, href, actions }) {
  return (
    <article className="card">
      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        {description && <p className="card-desc">{description}</p>}
      </div>
      {(href || (actions && actions.length)) && (
        <div className="card-actions">
          {href && (
            <a className="btn btn-small" href={href} target="_blank" rel="noreferrer">
              Visit
            </a>
          )}
          {actions && actions.map((a, idx) => (
            <a key={idx} className="btn btn-small btn-ghost" href={a.href} target="_blank" rel="noreferrer">
              {a.label}
            </a>
          ))}
        </div>
      )}
    </article>
  );
}
