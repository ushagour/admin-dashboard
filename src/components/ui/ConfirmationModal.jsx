import React from 'react';

export default function ConfirmationModal({ 
  show, 
  title = "Confirm Action", 
  message = "Are you sure you want to proceed?", 
  confirmLabel = "Confirm", 
  cancelLabel = "Cancel",
  confirmVariant = "danger",
  onConfirm, 
  onCancel 
}) {
  if (!show) return null;

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="btn-close" onClick={onCancel}></button>
          </div>
          <div className="modal-body">
            <p className="mb-0">{message}</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              {cancelLabel}
            </button>
            <button 
              type="button" 
              className={`btn btn-${confirmVariant}`} 
              onClick={onConfirm}
            >
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 