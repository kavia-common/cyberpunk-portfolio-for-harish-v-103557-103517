import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Modal - basic accessible modal shell (non-interactive placeholder)
 */
export default function Modal({ open, title, onClose, children }) {
  if (!open) return null;
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={title}>
      <div className="modal">
        <header className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <button className="icon-button" onClick={onClose} aria-label="Close modal">✕</button>
        </header>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
}
