import React from "react"
import { useState } from "react"

export default function Dashboard() {

  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      change: "+20.1%",
      changeType: "success",
      icon: "💰",
    },
    {
      title: "Total Orders",
      value: "2,350",
      change: "+180.1%",
      changeType: "success",
      icon: "🛒",
    },
    {
      title: "Products",
      value: "1,234",
      change: "+19%",
      changeType: "success",
      icon: "📦",
    },
    {
      title: "Active Customers",
      value: "573",
      change: "+201",
      changeType: "success",
      icon: "👥",
    },
  ]

  const recentOrders = [
    {
      id: "#3210",
      customer: "Olivia Martin",
      email: "olivia.martin@email.com",
      status: "completed",
      amount: "$42.25",
      date: "2 hours ago",
    },
    {
      id: "#3209",
      customer: "Jackson Lee",
      email: "jackson.lee@email.com",
      status: "processing",
      amount: "$74.99",
      date: "4 hours ago",
    },
    {
      id: "#3208",
      customer: "Isabella Nguyen",
      email: "isabella.nguyen@email.com",
      status: "completed",
      amount: "$99.99",
      date: "6 hours ago",
    },
    {
      id: "#3207",
      customer: "William Kim",
      email: "will@email.com",
      status: "pending",
      amount: "$39.95",
      date: "8 hours ago",
    },
    {
      id: "#3206",
      customer: "Sofia Davis",
      email: "sofia.davis@email.com",
      status: "completed",
      amount: "$19.99",
      date: "1 day ago",
    },
  ]

  const topProducts = [
    {
      name: "Wireless Headphones",
      sales: 1234,
      revenue: "$24,680",
      progress: 85,
    },
    {
      name: "Smart Watch",
      sales: 987,
      revenue: "$19,740",
      progress: 72,
    },
    {
      name: "Laptop Stand",
      sales: 756,
      revenue: "$15,120",
      progress: 58,
    },
    {
      name: "Phone Case",
      sales: 543,
      revenue: "$10,860",
      progress: 45,
    },
    {
      name: "USB Cable",
      sales: 432,
      revenue: "$8,640",
      progress: 35,
    },
  ]

  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return "badge bg-success"
      case "processing":
        return "badge bg-primary"
      case "pending":
        return "badge bg-warning"
      default:
        return "badge bg-secondary"
    }
  }

  return (
   

        <div className="container-fluid p-4">
          {/* Stats Cards */}
          <div className="row mb-4">
            {stats.map((stat, index) => (
              <div key={index} className="col-md-6 col-lg-3 mb-3">
                <div className="card h-100">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h6 className="card-title text-muted mb-0">{stat.title}</h6>
                      <span style={{ fontSize: "1.5rem" }}>{stat.icon}</span>
                    </div>
                    <h3 className="mb-1">{stat.value}</h3>
                    <small className={`text-${stat.changeType}`}>📈 {stat.change} from last month</small>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="row">
            {/* Recent Orders */}
            <div className="col-lg-8 mb-4">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title mb-0">Recent Orders</h5>
                  <small className="text-muted">You have 265 orders this month.</small>
                </div>
                <div className="card-body">
                  {recentOrders.map((order, index) => (
                    <div
                      key={index}
                      className="d-flex justify-content-between align-items-center p-3 border rounded mb-2"
                    >
                      <div>
                        <h6 className="mb-1">{order.customer}</h6>
                        <small className="text-muted">{order.email}</small>
                      </div>
                      <div className="d-flex align-items-center">
                        <span className={getStatusBadge(order.status)}>{order.status}</span>
                        <div className="text-end ms-3">
                          <div className="fw-bold">{order.amount}</div>
                          <small className="text-muted">{order.date}</small>
                        </div>
                        <div className="dropdown ms-2">
                          <button
                            className="btn btn-sm btn-outline-secondary dropdown-toggle"
                            data-bs-toggle="dropdown"
                          >
                            ⋯
                          </button>
                          <ul className="dropdown-menu">
                            <li>
                              <a className="dropdown-item" href="#">
                                👁️ View Details
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">
                                Update Status
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">
                                Contact Customer
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                  <button className="btn btn-outline-primary w-100 mt-3">View All Orders</button>
                </div>
              </div>
            </div>

            {/* Top Products & Sales Chart */}
            <div className="col-lg-4">
              {/* Top Products */}
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title mb-0">Top Products</h5>
                  <small className="text-muted">Best performing products this month</small>
                </div>
                <div className="card-body">
                  {topProducts.map((product, index) => (
                    <div key={index} className="d-flex align-items-center mb-3">
                      <div className="bg-light rounded p-2 me-3">📦</div>
                      <div className="flex-grow-1">
                        <h6 className="mb-1">{product.name}</h6>
                        <div className="progress" style={{ height: "6px" }}>
                          <div className="progress-bar" style={{ width: `${product.progress}%` }}></div>
                        </div>
                      </div>
                      <div className="text-end ms-2">
                        <div className="fw-bold">{product.revenue}</div>
                        <small className="text-muted">{product.sales} sold</small>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
    
  )
}
