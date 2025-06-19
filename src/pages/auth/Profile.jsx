"use client"

import "bootstrap/dist/css/bootstrap.min.css"
import { useState } from "react"

export default function Profile() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("personal")
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    company: "SellerPro Store",
    website: "https://sellerpro.com",
    bio: "Experienced e-commerce seller with over 5 years in the industry.",
    address: "123 Main Street",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "United States",
    avatar: "/placeholder.svg?height=120&width=120",
  })

  const [securityData, setSecurityData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorEnabled: true,
    emailNotifications: true,
    smsNotifications: false,
  })

  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSecurityChange = (e) => {
    const { name, value, type, checked } = e.target
    setSecurityData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleProfileSubmit = (e) => {
    e.preventDefault()
    console.log("Profile updated:", profileData)
    // Handle profile update logic here
  }

  const handleSecuritySubmit = (e) => {
    e.preventDefault()
    console.log("Security updated:", securityData)
    // Handle security update logic here
  }

  return (
    <div className="d-flex position-relative">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-lg-none"
          style={{ zIndex: 1040 }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`bg-dark text-white position-fixed position-lg-relative ${
          sidebarOpen ? "d-block" : "d-none d-lg-block"
        }`}
        style={{
          width: "250px",
          minHeight: "100vh",
          zIndex: 1050,
          top: 0,
          left: 0,
        }}
      >
        <div className="p-3">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <div className="d-flex align-items-center">
              <div className="bg-primary rounded p-2 me-2">📦</div>
              <div>
                <h5 className="mb-0">SellerPro</h5>
                <small className="text-muted">Dashboard</small>
              </div>
            </div>
            <button className="btn btn-sm btn-outline-light d-lg-none" onClick={() => setSidebarOpen(false)}>
              ✕
            </button>
          </div>

          <nav className="nav flex-column">
            <a className="nav-link text-white-50" href="/">
              🏠 Dashboard
            </a>
            <a className="nav-link text-white-50" href="/products">
              📦 Products
            </a>
            <a className="nav-link text-white-50" href="/orders">
              🛒 Orders
            </a>
            <a className="nav-link text-white-50" href="/customers">
              👥 Customers
            </a>
            <a className="nav-link text-white-50" href="/reclamations">
              📞 Support Tickets
            </a>
            <a className="nav-link text-white-50" href="#">
              📊 Analytics
            </a>
            <a className="nav-link text-white active" href="/profile">
              👤 Profile
            </a>
            <a className="nav-link text-white-50" href="/settings">
              ⚙️ Settings
            </a>
          </nav>

          <div className="mt-4">
            <button className="btn btn-primary w-100">➕ Add Product</button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1">
        {/* Header */}
        <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom sticky-top">
          <div className="container-fluid">
            <button className="btn btn-outline-secondary me-2" onClick={() => setSidebarOpen(!sidebarOpen)}>
              ☰
            </button>

            <div className="d-flex flex-grow-1 align-items-center">
              <div className="position-relative me-auto" style={{ maxWidth: "300px", width: "100%" }}>
                <input type="search" className="form-control form-control-sm" placeholder="Search..." />
                <span className="position-absolute top-50 start-0 translate-middle-y ms-2">🔍</span>
              </div>

              <div className="d-flex align-items-center ms-2">
                <button className="btn btn-outline-secondary btn-sm me-2">🔔</button>
                <div className="dropdown">
                  <button className="btn btn-outline-secondary btn-sm dropdown-toggle" data-bs-toggle="dropdown">
                    👤
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <a className="dropdown-item" href="/profile">
                        Profile
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/settings">
                        Settings
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a className="dropdown-item" href="/login">
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Profile Content */}
        <div className="container-fluid p-3 p-md-4">
          <h2 className="mb-4">My Profile</h2>

          {/* Profile Header */}
          <div className="card mb-4">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col-auto">
                  <div className="position-relative">
                    <img
                      src={profileData.avatar || "/placeholder.svg"}
                      alt="Profile"
                      className="rounded-circle"
                      width="80"
                      height="80"
                      style={{ objectFit: "cover" }}
                    />
                    <button className="btn btn-sm btn-primary position-absolute bottom-0 end-0 rounded-circle p-1">
                      📷
                    </button>
                  </div>
                </div>
                <div className="col">
                  <h4 className="mb-1">
                    {profileData.firstName} {profileData.lastName}
                  </h4>
                  <p className="text-muted mb-1">{profileData.email}</p>
                  <p className="text-muted mb-0">{profileData.company}</p>
                </div>
                <div className="col-auto">
                  <div className="d-flex gap-2">
                    <button className="btn btn-outline-primary btn-sm">Edit Photo</button>
                    <button className="btn btn-outline-secondary btn-sm">Download Data</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            {/* Sidebar Tabs */}
            <div className="col-md-3 mb-4">
              <div className="list-group">
                <button
                  className={`list-group-item list-group-item-action ${activeTab === "personal" ? "active" : ""}`}
                  onClick={() => setActiveTab("personal")}
                >
                  👤 Personal Information
                </button>
                <button
                  className={`list-group-item list-group-item-action ${activeTab === "business" ? "active" : ""}`}
                  onClick={() => setActiveTab("business")}
                >
                  🏢 Business Details
                </button>
                <button
                  className={`list-group-item list-group-item-action ${activeTab === "security" ? "active" : ""}`}
                  onClick={() => setActiveTab("security")}
                >
                  🔒 Security & Privacy
                </button>
                <button
                  className={`list-group-item list-group-item-action ${activeTab === "notifications" ? "active" : ""}`}
                  onClick={() => setActiveTab("notifications")}
                >
                  🔔 Notifications
                </button>
                <button
                  className={`list-group-item list-group-item-action ${activeTab === "billing" ? "active" : ""}`}
                  onClick={() => setActiveTab("billing")}
                >
                  💳 Billing & Plans
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="col-md-9">
              <div className="card">
                <div className="card-body">
                  {/* Personal Information Tab */}
                  {activeTab === "personal" && (
                    <div>
                      <h5 className="card-title mb-4">Personal Information</h5>
                      <form onSubmit={handleProfileSubmit}>
                        <div className="row mb-3">
                          <div className="col-md-6">
                            <label htmlFor="firstName" className="form-label">
                              First Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="firstName"
                              name="firstName"
                              value={profileData.firstName}
                              onChange={handleProfileChange}
                            />
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="lastName" className="form-label">
                              Last Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="lastName"
                              name="lastName"
                              value={profileData.lastName}
                              onChange={handleProfileChange}
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <div className="col-md-6">
                            <label htmlFor="email" className="form-label">
                              Email Address
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              id="email"
                              name="email"
                              value={profileData.email}
                              onChange={handleProfileChange}
                            />
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="phone" className="form-label">
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              className="form-control"
                              id="phone"
                              name="phone"
                              value={profileData.phone}
                              onChange={handleProfileChange}
                            />
                          </div>
                        </div>
                        <div className="mb-3">
                          <label htmlFor="bio" className="form-label">
                            Bio
                          </label>
                          <textarea
                            className="form-control"
                            id="bio"
                            name="bio"
                            rows="3"
                            value={profileData.bio}
                            onChange={handleProfileChange}
                          ></textarea>
                        </div>
                        <div className="mb-3">
                          <label htmlFor="address" className="form-label">
                            Address
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="address"
                            name="address"
                            value={profileData.address}
                            onChange={handleProfileChange}
                          />
                        </div>
                        <div className="row mb-3">
                          <div className="col-md-4">
                            <label htmlFor="city" className="form-label">
                              City
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="city"
                              name="city"
                              value={profileData.city}
                              onChange={handleProfileChange}
                            />
                          </div>
                          <div className="col-md-4">
                            <label htmlFor="state" className="form-label">
                              State
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="state"
                              name="state"
                              value={profileData.state}
                              onChange={handleProfileChange}
                            />
                          </div>
                          <div className="col-md-4">
                            <label htmlFor="zipCode" className="form-label">
                              ZIP Code
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="zipCode"
                              name="zipCode"
                              value={profileData.zipCode}
                              onChange={handleProfileChange}
                            />
                          </div>
                        </div>
                        <button type="submit" className="btn btn-primary">
                          Save Changes
                        </button>
                      </form>
                    </div>
                  )}

                  {/* Business Details Tab */}
                  {activeTab === "business" && (
                    <div>
                      <h5 className="card-title mb-4">Business Details</h5>
                      <form>
                        <div className="mb-3">
                          <label htmlFor="company" className="form-label">
                            Company Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="company"
                            name="company"
                            value={profileData.company}
                            onChange={handleProfileChange}
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="website" className="form-label">
                            Website
                          </label>
                          <input
                            type="url"
                            className="form-control"
                            id="website"
                            name="website"
                            value={profileData.website}
                            onChange={handleProfileChange}
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="taxId" className="form-label">
                            Tax ID / EIN
                          </label>
                          <input type="text" className="form-control" id="taxId" placeholder="XX-XXXXXXX" />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="businessType" className="form-label">
                            Business Type
                          </label>
                          <select className="form-select" id="businessType">
                            <option>Sole Proprietorship</option>
                            <option>LLC</option>
                            <option>Corporation</option>
                            <option>Partnership</option>
                          </select>
                        </div>
                        <div className="mb-3">
                          <label htmlFor="industry" className="form-label">
                            Industry
                          </label>
                          <select className="form-select" id="industry">
                            <option>Electronics</option>
                            <option>Fashion & Apparel</option>
                            <option>Home & Garden</option>
                            <option>Sports & Outdoors</option>
                            <option>Books & Media</option>
                            <option>Other</option>
                          </select>
                        </div>
                        <button type="submit" className="btn btn-primary">
                          Save Changes
                        </button>
                      </form>
                    </div>
                  )}

                  {/* Security Tab */}
                  {activeTab === "security" && (
                    <div>
                      <h5 className="card-title mb-4">Security & Privacy</h5>
                      <form onSubmit={handleSecuritySubmit}>
                        <h6 className="mb-3">Change Password</h6>
                        <div className="mb-3">
                          <label htmlFor="currentPassword" className="form-label">
                            Current Password
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            id="currentPassword"
                            name="currentPassword"
                            value={securityData.currentPassword}
                            onChange={handleSecurityChange}
                          />
                        </div>
                        <div className="row mb-3">
                          <div className="col-md-6">
                            <label htmlFor="newPassword" className="form-label">
                              New Password
                            </label>
                            <input
                              type="password"
                              className="form-control"
                              id="newPassword"
                              name="newPassword"
                              value={securityData.newPassword}
                              onChange={handleSecurityChange}
                            />
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="confirmPassword" className="form-label">
                              Confirm New Password
                            </label>
                            <input
                              type="password"
                              className="form-control"
                              id="confirmPassword"
                              name="confirmPassword"
                              value={securityData.confirmPassword}
                              onChange={handleSecurityChange}
                            />
                          </div>
                        </div>

                        <hr className="my-4" />

                        <h6 className="mb-3">Two-Factor Authentication</h6>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <div>
                            <strong>Two-Factor Authentication</strong>
                            <div className="text-muted small">Add an extra layer of security to your account</div>
                          </div>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="twoFactorEnabled"
                              name="twoFactorEnabled"
                              checked={securityData.twoFactorEnabled}
                              onChange={handleSecurityChange}
                            />
                          </div>
                        </div>

                        <hr className="my-4" />

                        <h6 className="mb-3">Login Sessions</h6>
                        <div className="list-group mb-3">
                          <div className="list-group-item">
                            <div className="d-flex justify-content-between align-items-center">
                              <div>
                                <strong>Current Session</strong>
                                <div className="text-muted small">Chrome on Windows • New York, NY</div>
                              </div>
                              <span className="badge bg-success">Active</span>
                            </div>
                          </div>
                          <div className="list-group-item">
                            <div className="d-flex justify-content-between align-items-center">
                              <div>
                                <strong>Mobile App</strong>
                                <div className="text-muted small">iPhone • Last seen 2 hours ago</div>
                              </div>
                              <button className="btn btn-sm btn-outline-danger">Revoke</button>
                            </div>
                          </div>
                        </div>

                        <button type="submit" className="btn btn-primary me-2">
                          Save Changes
                        </button>
                        <button type="button" className="btn btn-outline-danger">
                          Revoke All Sessions
                        </button>
                      </form>
                    </div>
                  )}

                  {/* Notifications Tab */}
                  {activeTab === "notifications" && (
                    <div>
                      <h5 className="card-title mb-4">Notification Preferences</h5>
                      <form>
                        <h6 className="mb-3">Email Notifications</h6>
                        <div className="mb-3 form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="emailNotifications"
                            name="emailNotifications"
                            checked={securityData.emailNotifications}
                            onChange={handleSecurityChange}
                          />
                          <label className="form-check-label" htmlFor="emailNotifications">
                            <strong>Email Notifications</strong>
                            <div className="text-muted small">Receive notifications via email</div>
                          </label>
                        </div>
                        <div className="mb-3 form-check">
                          <input type="checkbox" className="form-check-input" id="orderUpdates" defaultChecked />
                          <label className="form-check-label" htmlFor="orderUpdates">
                            Order updates and confirmations
                          </label>
                        </div>
                        <div className="mb-3 form-check">
                          <input type="checkbox" className="form-check-input" id="marketingEmails" />
                          <label className="form-check-label" htmlFor="marketingEmails">
                            Marketing and promotional emails
                          </label>
                        </div>
                        <div className="mb-3 form-check">
                          <input type="checkbox" className="form-check-input" id="securityAlerts" defaultChecked />
                          <label className="form-check-label" htmlFor="securityAlerts">
                            Security alerts and account changes
                          </label>
                        </div>

                        <h6 className="mb-3 mt-4">SMS Notifications</h6>
                        <div className="mb-3 form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="smsNotifications"
                            name="smsNotifications"
                            checked={securityData.smsNotifications}
                            onChange={handleSecurityChange}
                          />
                          <label className="form-check-label" htmlFor="smsNotifications">
                            <strong>SMS Notifications</strong>
                            <div className="text-muted small">Receive notifications via text message</div>
                          </label>
                        </div>
                        <div className="mb-3 form-check">
                          <input type="checkbox" className="form-check-input" id="urgentAlerts" defaultChecked />
                          <label className="form-check-label" htmlFor="urgentAlerts">
                            Urgent alerts only
                          </label>
                        </div>

                        <button type="submit" className="btn btn-primary">
                          Save Preferences
                        </button>
                      </form>
                    </div>
                  )}

                  {/* Billing Tab */}
                  {activeTab === "billing" && (
                    <div>
                      <h5 className="card-title mb-4">Billing & Plans</h5>

                      <div className="alert alert-info mb-4">
                        <h6 className="alert-heading">Current Plan: Professional</h6>
                        <p className="mb-0">$29.99/month • Next billing date: July 15, 2023</p>
                      </div>

                      <h6 className="mb-3">Payment Methods</h6>
                      <div className="list-group mb-4">
                        <div className="list-group-item">
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                              <span className="me-3">💳</span>
                              <div>
                                <strong>Visa ending in 1234</strong>
                                <div className="text-muted small">Expires 12/25</div>
                              </div>
                            </div>
                            <div>
                              <span className="badge bg-primary me-2">Default</span>
                              <button className="btn btn-sm btn-outline-secondary">Edit</button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button className="btn btn-outline-primary mb-4">Add Payment Method</button>

                      <h6 className="mb-3">Billing History</h6>
                      <div className="table-responsive">
                        <table className="table">
                          <thead>
                            <tr>
                              <th>Date</th>
                              <th>Description</th>
                              <th>Amount</th>
                              <th>Status</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Jun 15, 2023</td>
                              <td>Professional Plan</td>
                              <td>$29.99</td>
                              <td>
                                <span className="badge bg-success">Paid</span>
                              </td>
                              <td>
                                <button className="btn btn-sm btn-outline-secondary">Download</button>
                              </td>
                            </tr>
                            <tr>
                              <td>May 15, 2023</td>
                              <td>Professional Plan</td>
                              <td>$29.99</td>
                              <td>
                                <span className="badge bg-success">Paid</span>
                              </td>
                              <td>
                                <button className="btn btn-sm btn-outline-secondary">Download</button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
