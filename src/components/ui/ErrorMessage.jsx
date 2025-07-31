import React from 'react';

export default function ErrorMessage({ error }) {
  if (!error) return null;
  return (
    <div className="alert alert-danger" role="alert">
      {typeof error === 'string' ? error : error.message || 'An error occurred.'}
    </div>
  );
} 