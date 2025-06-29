import React from 'react'

export default function SideBarTabs({ activeTab, setActiveTab }) {


  return (
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
  )
}

