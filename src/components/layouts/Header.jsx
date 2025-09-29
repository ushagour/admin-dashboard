import React from 'react'
import Search from '../forms/Search'

import { useAuth } from '../../hooks/useAuth';
import { useNotifications } from '../../hooks/useNotifications';
function Header({sidebarOpen, setSidebarOpen}) {
  const { user, logout } = useAuth();
  console.log("user in Header:", user); // Debugging line;
  
  const { notifications, loading, error, refresh } = useNotifications(user?.userId);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom sticky-top">
      <div className="container-fluid">
        <button
          className="btn btn-outline-secondary me-2 d-lg-none"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          type="button"
        >
          <i className="bi bi-list"></i>
        </button>

        <div className="d-flex flex-grow-1 align-items-center">
          <div className="position-relative me-auto" style={{ maxWidth: "500px", width: "100%" }}>
            <Search />
          </div>

          <div className="d-flex align-items-center ms-2">
            {/* Notification Dropdown */}
            <div className="dropdown me-2">
              <button
                className="btn btn-outline-secondary btn-sm dropdown-toggle"
                type="button"
                id="notificationDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                onClick={refresh}
              >
                <i className="bi bi-bell"></i>
                {notifications.length > 0 && (
                  <span className="badge bg-danger ms-1">{notifications.length}</span>
                )}
              </button>
              <ul className="dropdown-menu dropdown-menu-end" 
                  style={{ minWidth: 300, maxHeight: 350, overflowY: 'auto' }}
                  aria-labelledby="notificationDropdown">
                <li className="dropdown-header">
                  {loading ? (
                    <div className="d-flex align-items-center">
                      <div className="spinner-border spinner-border-sm me-2"></div>
                      Loading...
                    </div>
                  ) : error ? (
                    <span className="text-danger">{error}</span>
                  ) : notifications.length === 0 ? (
                    "No new notifications"
                  ) : (
                    "Notifications"
                  )}
                </li>
                <li><hr className="dropdown-divider" /></li>
                {notifications.map((notif, idx) => (
                  <li key={notif.id || idx}>
                    <a className="dropdown-item" href="/Reviews">
                      <div className="d-flex align-items-center">
                        <span className="me-2">
                          {notif.type === 'message' ? '💬' : '⚠️'}
                        </span>
                        <div className="flex-grow-1">
                          <div style={{ fontWeight: 500, fontSize: '0.9rem' }}>
                            {notif.type === 'message'
                              ? `New message from ${notif.senderName || 'User'}`
                              : `New reclamation: ${notif.subject || notif.title || 'Reclamation'}`}
                          </div>
                          <div className="small text-muted">
                            {notif.content?.slice(0, 40) || notif.description?.slice(0, 40) || ''}
                            {(notif.content?.length > 40 || notif.description?.length > 40) && '...'}
                          </div>
                          <div className="small text-muted">
                            {notif.createdAt ? new Date(notif.createdAt).toLocaleString() : ''}
                          </div>
                        </div>
                      </div>
                    </a>
                  </li>
                ))}
                {notifications.length > 0 && (
                  <>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <a className="dropdown-item text-center" href="/Reviews">
                        <small>View all notifications</small>
                      </a>
                    </li>
                  </>
                )}
              </ul>
            </div>

            {/* Profile Dropdown */}
            <div className="dropdown">
              <button 
                className="btn btn-outline-secondary btn-sm dropdown-toggle" 
                type="button"
                id="profileDropdown"
                data-bs-toggle="dropdown" 
                aria-expanded="false"
              >
                <i className="bi bi-person-circle"></i>
                <span className="ms-1 d-none d-sm-inline">{user?.name || 'User'}</span>
              </button>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                <li className="dropdown-header">
                  <div className="d-flex align-items-center">
                    <i className="bi bi-person-circle me-2"></i>
                    <div>
                      <div className="fw-bold">{user?.name || 'User'}</div>
                      <small className="text-muted">{user?.email || 'user@example.com'}</small>
                    </div>
                  </div>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <a className="dropdown-item" href="/Profile">
                    <i className="bi bi-person me-2"></i>
                    Profile
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    <i className="bi bi-gear me-2"></i>
                    Settings
                  </a>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <button className="dropdown-item text-danger" onClick={handleLogout}>
                    <i className="bi bi-box-arrow-right me-2"></i>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header