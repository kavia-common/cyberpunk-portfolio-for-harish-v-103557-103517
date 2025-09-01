import React from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Section from '../components/Section';
import { loadMarkdownBySlug } from '../utils/blogLoader';
import { renderMarkdownToReact } from '../utils/markdown';

/**
 * PUBLIC_INTERFACE
 * BlogPost - loads markdown post by slug, parses frontmatter, and renders markdown with a minimal renderer.
 */
export default function BlogPost() {
  const { slug } = useParams();
  const [state, setState] = React.useState({
    title: '',
    date: '',
    content: '',
    notFound: false,
    loading: true,
  });

  React.useEffect(() => {
    // Synchronous load, but we still use a loading flag to keep hooks order stable
    const loaded = loadMarkdownBySlug(slug);
    if (!loaded) {
      setState({
        title: '',
        date: '',
        content: '',
        notFound: true,
        loading: false,
      });
    } else {
      setState({
        title: loaded.data?.title || slug,
        date: loaded.data?.date || '',
        content: loaded.content || '',
        notFound: false,
        loading: false,
      });
    }
  }, [slug]);

  // Always call hooks in the same order; compute body unconditionally
  const body = React.useMemo(() => renderMarkdownToReact(state.content || ''), [state.content]);

  return (
    <>
      <SEO title={`${state.notFound ? 'Blog — Not Found' : `${state.title} — Blog`}`} />
      <Section id="post" title={state.notFound ? 'Post not found' : state.title} subtitle={state.notFound ? '' : state.date}>
        <article className="scanlines" aria-label="Blog post content">
          {state.loading && (
            <p className="muted">Loading...</p>
          )}
          {!state.loading && state.notFound && (
            <>
              <p className="muted">
                We couldn't locate a post for the slug:{' '}
                <code style={{ fontFamily: 'var(--font-mono)' }}>{slug}</code>
              </p>
              <Link className="btn" to="/blog">Back to Blog</Link>
            </>
          )}
          {!state.loading && !state.notFound && body}
        </article>
        {!state.notFound && !state.loading && (
          <div style={{ marginTop: 16 }}>
            <Link className="btn btn-ghost" to="/blog">← Back to Blog</Link>
          </div>
        )}
      </Section>
    </>
  );
}
