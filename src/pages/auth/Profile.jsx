import React, { useState } from "react"
import { useAuth } from "../../hooks/useAuth"

export default function Profile() {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    company: user?.company || "",
  })
  const [editMode, setEditMode] = useState(false)

  if (!user) {
    return <div className="p-4">Loading profile...</div>
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: Send formData to API to update user info
    setEditMode(false)
  }

  // Example stats, replace with real API data as needed
  const userStats = [
    { label: "Completed Orders", value: user.completedOrders || 0, color: "success" },
    { label: "Pending Orders", value: user.pendingOrders || 0, color: "warning" },
    { label: "Reviews", value: user.reviewsCount || 0, color: "info" },
  ]

  const isAdmin = user.role === "admin"

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <img
                src={user.avatar || "https://www.gravatar.com/avatar/?d=identicon"}
                alt="Profile"
                className="rounded-circle mb-3"
                width="100"
                height="100"
                style={{ objectFit: "cover" }}
              />
              {!editMode ? (
                <>
                  <h4 className="mb-2">{user.name || `${user.firstName || ""} ${user.lastName || ""}`}</h4>
                  <p className="mb-1 text-muted">{user.email}</p>
                  {user.phone && <p className="mb-1 text-muted">{user.phone}</p>}
                  {user.company && <p className="mb-0 text-muted">{user.company}</p>}
                  <button className="btn btn-primary mt-3" onClick={() => setEditMode(true)}>
                    Edit Info
                  </button>
                </>
              ) : (
                <form onSubmit={handleSubmit} className="text-start">
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input
                      type="text"
                      className="form-control"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Company</label>
                    <input
                      type="text"
                      className="form-control"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="d-flex justify-content-between">
                    <button type="submit" className="btn btn-success">
                      Save
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={() => setEditMode(false)}>
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
          {/* User Stats Section */}
          <div className="card mt-4">
            <div className="card-header">Your Stats</div>
            <div className="card-body d-flex justify-content-around">
              {userStats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className={`h4 text-${stat.color}`}>{stat.value}</div>
                  <div className="small text-muted">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Advanced Settings for Admins */}
          {isAdmin && (
            <div className="card mt-4">
              <div className="card-header">Advanced Settings</div>
              <div className="card-body">
                <button className="btn btn-outline-danger mb-2 w-100">Manage Users</button>
                <button className="btn btn-outline-warning mb-2 w-100">System Logs</button>
                <button className="btn btn-outline-primary w-100">Site Settings</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}