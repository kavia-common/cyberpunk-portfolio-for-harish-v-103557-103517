import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Modal - accessible modal with overlay, ESC close, backdrop click close, and scroll lock
 */
export default function Modal({ open, title, onClose, children }) {
  const wrapperRef = React.useRef(null);
  const closeBtnRef = React.useRef(null);

  // Body scroll lock
  React.useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
  }, [open]);

  // ESC to close, focus management
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.();
      // rudimentary focus trap: cycle between first/last
      if (e.key === 'Tab' && wrapperRef.current) {
        const focusables = wrapperRef.current.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement;
        if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    // focus the close button initially
    setTimeout(() => closeBtnRef.current?.focus(), 0);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const onBackdropClick = (e) => {
    if (e.target.getAttribute('data-backdrop') === 'true') {
      onClose?.();
    }
  };

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      data-backdrop="true"
      onMouseDown={onBackdropClick}
    >
      <div className="modal" ref={wrapperRef}>
        <header className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <button className="icon-button" ref={closeBtnRef} onClick={onClose} aria-label="Close modal">✕</button>
        </header>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
}
