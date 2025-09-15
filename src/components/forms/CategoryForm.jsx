import React, { useState, useEffect } from "react";

export default function CategoryForm({ category = null, value, onChange, errors = {} }) {
  const [formData, setFormData] = useState({
    name: "",
    icon: ""
  });

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || "",
        icon: category.icon || ""
      });
    } else {
      setFormData({ name: "", icon: "" });
    }
  }, [category]);

  // If controlled from parent, sync value
  useEffect(() => {
    if (value) setFormData(value);
  }, [value]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);
    if (onChange) onChange(updated);
  };

  return (
    <>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Category Name *</label>
        <input
          type="text"
          className={`form-control ${errors.name ? "is-invalid" : ""}`}
          id="name"
          name="name"
          value={formData.name || ""}
          onChange={handleChange}
          placeholder="Enter category name"
          required
        />
        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="icon" className="form-label">Icon Class *</label>
        <input
          type="text"
          className={`form-control ${errors.icon ? "is-invalid" : ""}`}
          id="icon"
          name="icon"
          value={formData.icon || ""}
          onChange={handleChange}
          placeholder="e.g., fa-house, fa-car, fa-star"
          required
        />
        {errors.icon && <div className="invalid-feedback">{errors.icon}</div>}
        <div className="form-text">
          Use Bootstrap Icons classes (e.g., fa-house, fa-car, fa-star)
        </div>
      </div>
      {formData.icon && (
        <div className="mb-3">
          <label className="form-label">Icon Preview</label>
          <div className="p-3 border rounded bg-light">
            <i className={`fa ${formData.icon}`} style={{ fontSize: "2rem" }}></i>
            <span className="ms-2">{formData.icon}</span>
          </div>
        </div>
      )}
    </>
  );
}