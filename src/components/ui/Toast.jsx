import React, { useState, useEffect } from 'react';

export default function Toast({ message, type = 'success', duration = 3000, onClose }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose(), 300); // Wait for fade out animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getToastClasses = () => {
    const baseClasses = 'toast align-items-center text-white border-0';
    switch (type) {
      case 'success':
        return `${baseClasses} bg-success`;
      case 'error':
        return `${baseClasses} bg-danger`;
      case 'warning':
        return `${baseClasses} bg-warning`;
      case 'info':
        return `${baseClasses} bg-info`;
      default:
        return `${baseClasses} bg-success`;
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      default:
        return '✅';
    }
  };

  if (!isVisible) return null;

  return (
    <div 
      className={getToastClasses()}
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 9999,
        minWidth: '300px',
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out'
      }}
    >
      <div className="d-flex">
        <div className="toast-body">
          <span className="me-2">{getIcon()}</span>
          {message}
        </div>
        <button 
          type="button" 
          className="btn-close btn-close-white me-2 m-auto" 
          onClick={() => {
            setIsVisible(false);
            setTimeout(() => onClose(), 300);
          }}
        ></button>
      </div>
    </div>
  );
} 