import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";

export default function CrudModal({
  show,
  title,
  onClose,
  onSubmit,
  submitLabel = "Save",
  children,
  initialData = null,
}) {
  const [formData, setFormData] = useState(initialData || {});

  useEffect(() => {
    setFormData(initialData || {});
  }, [initialData, show]);

  const handleChange = (data) => {
    setFormData(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Pass value and onChange to children */}
          {React.cloneElement(children, {
            value: formData,
            onChange: handleChange,
          })}
        </Modal.Body>
        <Modal.Footer>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {submitLabel}
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}