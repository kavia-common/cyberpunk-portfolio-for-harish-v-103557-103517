import React from 'react';
import Modal from './Modal';

/**
 * PUBLIC_INTERFACE
 * ResumeButton - Reusable button that opens a modal to preview and download the resume.
 *
 * Behavior:
 * - Attempts to preview /assets/resume/resume.pdf (preferred) or falls back to /assets/resume/placeholder.pdf if available.
 * - If neither exists, shows a helpful message with a link to README in assets.
 * - Provides an explicit Download button with `download` attribute.
 * - Accessible: proper aria labels, ESC/Backdrop close via Modal, and focus handling.
 *
 * Props:
 * - variant?: 'primary' | 'ghost' | 'default' - visual style for the trigger button (maps to .btn classes)
 * - label?: string - text for the trigger button (default: "Resume")
 * - size?: 'small' | 'normal' - size style mapping to .btn-small if 'small'
 * - hideIcon?: boolean - whether to hide the inline icon
 */
export default function ResumeButton({
  variant = 'ghost',
  label = 'Resume',
  size = 'normal',
  hideIcon = false,
}) {
  const [open, setOpen] = React.useState(false);
  const [src, setSrc] = React.useState('');
  const [status, setStatus] = React.useState({ loading: false, error: '' });

  // Determine best available resume source with graceful fallback.
  const resolveResumeSrc = React.useCallback(async () => {
    setStatus({ loading: true, error: '' });

    // Helper to check existence via HEAD; CRA dev server supports this for static files.
    const exists = async (url) => {
      try {
        const res = await fetch(url, { method: 'HEAD' });
        return res.ok;
      } catch (_) {
        return false;
      }
    };

    const primary = '/assets/resume/resume.pdf';
    const secondary = '/assets/resume/HarishV-Resume.pdf'; // existing references in code
    const placeholder = '/assets/resume/placeholder.pdf';

    let chosen = '';
    if (await exists(primary)) chosen = primary;
    else if (await exists(secondary)) chosen = secondary;
    else if (await exists(placeholder)) chosen = placeholder;

    if (!chosen) {
      setSrc('');
      setStatus({ loading: false, error: 'not-found' });
    } else {
      setSrc(chosen);
      setStatus({ loading: false, error: '' });
    }
  }, []);

  const onOpen = async () => {
    setOpen(true);
    await resolveResumeSrc();
  };

  const onClose = () => {
    setOpen(false);
  };

  // PUBLIC_INTERFACE
  const triggerClass = `btn ${variant === 'primary' ? 'btn-primary' : variant === 'ghost' ? 'btn-ghost' : ''} ${size === 'small' ? 'btn-small' : ''}`;

  return (
    <>
      <button
        type="button"
        className={triggerClass}
        onClick={onOpen}
        aria-haspopup="dialog"
        aria-expanded={open ? 'true' : 'false'}
        aria-controls="resume-modal"
      >
        {!hideIcon && <span aria-hidden="true" style={{ marginRight: 6 }}>📄</span>}
        <span style={{ fontFamily: 'var(--font-mono)' }}>{label}</span>
      </button>

      <Modal open={open} title="Resume Preview" onClose={onClose}>
        <div id="resume-modal" className="scanlines">
          {status.loading && <p className="muted">Loading preview…</p>}

          {!status.loading && status.error === 'not-found' && (
            <div className="card accent-border" role="note" aria-label="Resume not found">
              <h4 className="card-title" style={{ marginTop: 0 }}>No resume file found</h4>
              <p className="card-desc">
                Please add <code style={{ fontFamily: 'var(--font-mono)' }}>/src/assets/resume/resume.pdf</code>
                {' '}or{' '}
                <code style={{ fontFamily: 'var(--font-mono)' }}>/src/assets/resume/placeholder.pdf</code>.
              </p>
              <p className="muted" style={{ fontSize: 14 }}>
                You can also update references to use a specifically named file if preferred.
              </p>
            </div>
          )}

          {!status.loading && !status.error && src && (
            <>
              <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
                <a className="btn btn-primary" href={src} download aria-label="Download resume PDF">Download PDF</a>
                <a className="btn btn-ghost" href={src} target="_blank" rel="noreferrer" aria-label="Open resume in a new tab">
                  Open in new tab
                </a>
              </div>

              <div
                className="accent-border"
                style={{
                  border: '1px solid var(--border)',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                {/* Use embed for broader support; fallback link provided above */}
                <embed
                  src={src}
                  type="application/pdf"
                  style={{ width: '100%', height: '70vh', background: 'var(--bg-elev-1)' }}
                  aria-label="Embedded resume PDF preview"
                />
              </div>
              <p className="muted" style={{ marginTop: 8, fontSize: 12 }}>
                If the embedded preview does not load in your browser, use “Open in new tab” or “Download PDF”.
              </p>
            </>
          )}
        </div>
      </Modal>
    </>
  );
}
