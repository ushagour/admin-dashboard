import React, { useEffect, useState } from 'react'
import Search from '../forms/Search'
import axios from 'axios'
import { NotificationBell } from '../ui';
import { useAuth } from '../../hooks/useAuth';

function Header({sidebarOpen, setSidebarOpen}) {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const { user,logout } = useAuth();

 

  useEffect(() => {
    // Fetch messages and reclamations in parallel
    const fetchNotifications = async () => {
      try {
        // const userId = localStorage.getItem('userId'); // Or get userId from your auth context/state
        const userId = 25// Or get userId from your auth context/state

        const token = localStorage.getItem('token')
        const [messagesRes, reclamationsRes] = await Promise.all([
        axios.get(`/api/messages/unread?userId=${userId}`, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`/api/reclamations/unread?userId=${userId}`, { headers: { Authorization: `Bearer ${token}` } }),
      ]);
        // Combine and sort by date (assuming both have a createdAt field)
        const combined = [
          ...messagesRes.data.map(msg => ({ ...msg, type: 'message' })),
          ...reclamationsRes.data.map(rec => ({ ...rec, type: 'reclamation' })),
        ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        setNotifications(combined)
      } catch (err) {
        setNotifications([])
      } finally {
        setLoading(false)
      }
    }
    fetchNotifications()
  }, [])

  return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom sticky-top">
          <div className="container-fluid">
            <button
                className="btn btn-outline-secondary me-2 d-lg-none"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                ☰
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
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                🔔
                {notifications.length > 0 && (
                  <span className="badge bg-danger ms-1">{notifications.length}</span>
                )}
              </button>
              <ul className="dropdown-menu dropdown-menu-end" style={{ minWidth: 300, maxHeight: 350, overflowY: 'auto' }}>
                <li className="dropdown-header">
                  {loading ? "Loading..." : notifications.length === 0 ? "No new notifications" : "Notifications"}
                </li>
                <li><hr className="dropdown-divider" /></li>
                {notifications.map((notif, idx) => (
                  <li key={notif.id || idx}>
                    <a className="dropdown-item" href="#">
                      <div className="d-flex align-items-center">
                        <span className="me-2">
                          {notif.type === 'message' ? '💬' : '⚠️'}
                        </span>
                        <div>
                          <div style={{ fontWeight: 500 }}>
                            {notif.type === 'message'
                              ? `New message from ${notif.senderName || 'User'}`
                              : `New reclamation: ${notif.subject || notif.title || 'Reclamation'}`}
                          </div>
                          <div className="small text-muted">
                            {notif.content?.slice(0, 40) || notif.description?.slice(0, 40) || ''}
                          </div>
                          <div className="small text-muted">
                            {notif.createdAt ? new Date(notif.createdAt).toLocaleString() : ''}
                          </div>
                        </div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {/* Profile Dropdown */}
            <div className="dropdown">
              <button className="btn btn-outline-secondary btn-sm dropdown-toggle" data-bs-toggle="dropdown">
                👤
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <a className="dropdown-item" href="/Profile">
                    Profile
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
              <button className="dropdown-item" onClick={logout}>
  Logout
</button>
                </li>
              </ul>
            </div>
            <NotificationBell count={0} />
          </div>
        </div>
      </div>
    </nav>

  )
}

export default Header