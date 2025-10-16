import React, { useState, useEffect } from 'react';
import { useAuth } from "../../hooks/useAuth";
import { fetchCategories } from "../../api/categories";


export default function ListingForm({ listing = null, value, onChange }) {


  const { user } = useAuth();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category_id: '',
    user_id: 25,
    status: 'active',
    stock: '',
    imageUrl: '',
    latitude: '',
    longitude: ''
  });

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories().then(setCategories).catch(() => setCategories([]));
  }, []);

  useEffect(() => {


    if (listing) {
      setFormData({
        title: listing.title || '',
        description: listing.description || '',
        price: listing.price || '',
        category_id: listing.category_id || '',
        user_id: listing.user_id || user?.userId || '',
        status: listing.status || 'active',
        stock: listing.stock || '',
        imageUrl: listing.imageUrl || '',
        latitude: listing.latitude || '',
        longitude: listing.longitude || ''
      });
    } else {
      setFormData({
        title: '',
        description: '',
        price: '',
        category_id: '',
        user_id: user?.userId || '',
        status: 'active',
        stock: '',
        imageUrl: '',
        latitude: '',
        longitude: ''
      });
    }
  }, [listing, user]);

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

  // Always ensure user_id is set before sending to backend
  useEffect(() => {
    if (!formData.user_id && user?.userId) {
      setFormData(prev => ({ ...prev, user_id: user.userId }));
    }
    // eslint-disable-next-line
  }, [user]);

  // No <form> wrapper, just fields
  return (
    <>
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title *{user.userId}</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={formData.title || ""}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="price" className="form-label">Price ($) *</label>
            <input
              type="number"
              step="0.01"
              className="form-control"
              id="price"
              name="price"
              value={formData.price || ""}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="category_id" className="form-label">Category</label>
            <select
              className="form-select"
              id="category_id"
              name="category_id"
              value={formData.category_id || ""}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>
        {/* <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="stock" className="form-label">Stock</label>
            <input
              type="number"
              className="form-control"
              id="stock"
              name="stock"
              value={formData.stock || ""}
              onChange={handleChange}
              placeholder="e.g. 100"
            />

          </div>
        </div> */}
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="status" className="form-label">Status</label>
            <select
              className="form-select"
              id="status"
              name="status"
              value={formData.status || ""}
              onChange={handleChange}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="In Stock">In Stock</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="imageUrl" className="form-label">Image URL</label>
            <input
              type="url"
              className="form-control"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl || ""}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="latitude" className="form-label">Latitude</label>
            <input
              type="number"
              step="any"
              className="form-control"
              id="latitude"
              name="latitude"
              value={formData.latitude || ""}
              onChange={handleChange}
              placeholder="40.7128"
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="longitude" className="form-label">Longitude</label>
            <input
              type="number"
              step="any"
              className="form-control"
              id="longitude"
              name="longitude"
              value={formData.longitude || ""}
              onChange={handleChange}
              placeholder="-74.0060"
            />
          </div>
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <textarea
          className="form-control"
          id="description"
          name="description"
          rows="3"
          value={formData.description || ""}
          onChange={handleChange}
          placeholder="Enter listing description..."
        ></textarea>
      </div>
    </>
  );
}