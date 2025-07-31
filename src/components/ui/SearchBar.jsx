import React from 'react';

export default function SearchBar({ value, onChange, placeholder = 'Search...' }) {
  return (
    <input
      type="text"
      className="form-control mb-3"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      style={{ maxWidth: 300 }}
    />
  );
} 