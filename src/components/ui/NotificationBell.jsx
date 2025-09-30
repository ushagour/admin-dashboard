import React from 'react';

export default function NotificationBell({ count = 0 }) {
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <span className="fa fa-bell" style={{ fontSize: 24 }}></span>
      {count > 0 && (
        <span style={{ position: 'absolute', top: 0, right: 0, background: 'red', color: 'white', borderRadius: '50%', padding: '2px 6px', fontSize: 12 }}>
          {count}
        </span>
      )}
    </div>
  );
} 