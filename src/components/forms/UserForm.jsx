import React, { useState, useEffect } from 'react';

export default function UserForm({ user = null, value, onChange }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    role: 'customer',
    status: 'active'
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        role: user.role || 'customer',
        status: user.status || 'active'
      });
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        role: 'customer',
        status: 'active'
      });
    }
  }, [user]);

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
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name *</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
      value={formData.name || ""}          
    onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email *</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </div>
      <div className="mb-3">
        <label className="form-label">Phone</label>
        <input
          type="text"
          className="form-control"
          name="phone"
          value={formData.phone || ""}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Address</label>
        <input
          type="text"
          className="form-control"
          name="address"
          value={formData.address || ""}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Role</label>
        <select
          className="form-select"
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="customer">Customer</option>
          <option value="admin">Admin</option>
          <option value="editor">Editor</option>
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Status</label>
        <select
          className="form-select"
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
    </>
  );
}