import React from 'react';
import SEO from '../components/SEO';
import Section from '../components/Section';
import SocialLinks from '../components/SocialLinks';
import EmailLink from '../components/EmailLink';

/**
 * PUBLIC_INTERFACE
 * Contact - Accessible contact page with a responsive form UI (name/email/message),
 *           EmailLink, and SocialLinks with neon/glow styling.
 * Notes:
 * - This is UI-only; submission is prevented and shows a basic acknowledgement.
 * - Replace handleSubmit with integration to a backend/Firebase in the future.
 */
export default function Contact() {
  const [status, setStatus] = React.useState({ sent: false, error: '' });
  const nameRef = React.useRef(null);
  const emailRef = React.useRef(null);
  const messageRef = React.useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = nameRef.current?.value.trim();
    const email = emailRef.current?.value.trim();
    const message = messageRef.current?.value.trim();
    if (!name || !email || !message) {
      setStatus({ sent: false, error: 'Please fill in all the fields.' });
      return;
    }
    // UI-only acknowledgement for now
    setStatus({ sent: true, error: '' });
    try {
      // Reset form after a short delay to allow SR users to hear the status
      setTimeout(() => {
        if (nameRef.current) nameRef.current.value = '';
        if (emailRef.current) emailRef.current.value = '';
        if (messageRef.current) messageRef.current.value = '';
      }, 150);
    } catch (_) { /* no-op */ }
  };

  return (
    <>
      <SEO
        title="Contact — Harish V"
        description="Reach out to Harish V for internships, collaborations, and interesting problems."
      />
      <Section
        id="contact"
        title="Get in touch"
        subtitle="Open to internships, collaborations, and interesting problems."
        layout="two-col"
      >
        {/* Left: Form */}
        <form
          className="card accent-border scanlines"
          onSubmit={handleSubmit}
          aria-label="Contact form"
          noValidate
        >
          <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
            <legend className="card-title" style={{ marginBottom: 12 }}>
              Send a message
            </legend>

            {/* Name */}
            <div style={{ marginBottom: 12 }}>
              <label htmlFor="name" className="muted" style={{ display: 'block', marginBottom: 6 }}>
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                ref={nameRef}
                placeholder="Neo"
                required
                aria-required="true"
                className="input"
              />
            </div>

            {/* Email */}
            <div style={{ marginBottom: 12 }}>
              <label htmlFor="email" className="muted" style={{ display: 'block', marginBottom: 6 }}>
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                ref={emailRef}
                placeholder="neo@matrix.io"
                required
                aria-required="true"
                className="input"
              />
            </div>

            {/* Message */}
            <div style={{ marginBottom: 12 }}>
              <label htmlFor="message" className="muted" style={{ display: 'block', marginBottom: 6 }}>
                Message
              </label>
              <textarea
                id="message"
                name="message"
                ref={messageRef}
                placeholder="I have an exciting opportunity for you..."
                rows={6}
                required
                aria-required="true"
                className="textarea"
              />
            </div>

            {/* Status for screen readers */}
            <div
              role="status"
              aria-live="polite"
              style={{ minHeight: 20, marginBottom: 8 }}
              className={status.error ? 'neon-magenta' : status.sent ? 'neon-accent' : ''}
            >
              {status.error && <span>{status.error}</span>}
              {status.sent && <span>Message ready — submission will be enabled soon.</span>}
            </div>

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <button type="submit" className="btn btn-primary">Send</button>
              <a className="btn btn-ghost" href="/" aria-label="Go back home">Back Home</a>
            </div>
          </fieldset>
        </form>

        {/* Right: Social/contact alternatives */}
        <aside className="card accent-border" aria-label="Alternative contact options">
          <h3 className="card-title" style={{ marginTop: 0 }}>Connect</h3>
          <p className="card-desc" style={{ marginTop: 4 }}>
            Prefer email? You can also reach me directly:
            {' '}
            <EmailLink email="someone@example.com" subject="Hello from your portfolio" />
          </p>
          <div style={{ marginTop: 10 }}>
            <SocialLinks
              githubUrl="https://github.com/"
              linkedinUrl="https://www.linkedin.com/"
              email="someone@example.com"
              variant="column"
              size={18}
            />
          </div>
          <p className="muted" style={{ marginTop: 12, fontSize: 14 }}>
            Tip: The form above is UI-only in this version. Integration with a backend or Firebase
            will be added later.
          </p>
        </aside>
      </Section>
    </>
  );
}
