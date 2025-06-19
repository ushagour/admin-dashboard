"use client"

import "bootstrap/dist/css/bootstrap.min.css"
import { useState } from "react"

export default function Reclamations() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedReclamation, setSelectedReclamation] = useState(null)
  const [showReplyModal, setShowReplyModal] = useState(false)
  const [filterStatus, setFilterStatus] = useState("all")

  // Sample reclamations data
  const reclamations = [
    {
      id: "REC-001",
      customer: "Olivia Martin",
      email: "olivia.martin@email.com",
      subject: "Defective Product - Wireless Headphones",
      category: "Product Quality",
      priority: "high",
      status: "open",
      date: "2023-06-12",
      lastUpdate: "2023-06-12",
      orderId: "#3210",
      description:
        "The wireless headphones I received are not working properly. The left earphone has no sound and the battery doesn't hold charge for more than 30 minutes.",
      attachments: ["headphones_issue.jpg", "receipt.pdf"],
      responses: [
        {
          from: "customer",
          message:
            "The wireless headphones I received are not working properly. The left earphone has no sound and the battery doesn't hold charge for more than 30 minutes.",
          date: "2023-06-12 10:30 AM",
        },
      ],
    },
    {
      id: "REC-002",
      customer: "Jackson Lee",
      email: "jackson.lee@email.com",
      subject: "Wrong Item Shipped",
      category: "Shipping Error",
      priority: "medium",
      status: "in_progress",
      date: "2023-06-11",
      lastUpdate: "2023-06-11",
      orderId: "#3209",
      description: "I ordered a Smart Watch but received a phone case instead. Please help me get the correct item.",
      attachments: ["wrong_item.jpg"],
      responses: [
        {
          from: "customer",
          message: "I ordered a Smart Watch but received a phone case instead. Please help me get the correct item.",
          date: "2023-06-11 2:15 PM",
        },
        {
          from: "support",
          message:
            "Hi Jackson, I'm sorry about the shipping error. We're processing a replacement Smart Watch for you right now. You should receive tracking information within 24 hours.",
          date: "2023-06-11 3:45 PM",
        },
      ],
    },
    {
      id: "REC-003",
      customer: "Isabella Nguyen",
      email: "isabella.nguyen@email.com",
      subject: "Delayed Delivery",
      category: "Shipping Delay",
      priority: "low",
      status: "resolved",
      date: "2023-06-10",
      lastUpdate: "2023-06-10",
      orderId: "#3208",
      description:
        "My order was supposed to arrive 3 days ago but I still haven't received it. Can you please check the status?",
      attachments: [],
      responses: [
        {
          from: "customer",
          message:
            "My order was supposed to arrive 3 days ago but I still haven't received it. Can you please check the status?",
          date: "2023-06-10 9:00 AM",
        },
        {
          from: "support",
          message:
            "Hi Isabella, I checked with our shipping partner and your package was delivered yesterday at 2:30 PM. Please check with your neighbors or building management.",
          date: "2023-06-10 11:20 AM",
        },
        {
          from: "customer",
          message: "Found it! It was left with my neighbor. Thank you for your help!",
          date: "2023-06-10 4:15 PM",
        },
      ],
    },
    {
      id: "REC-004",
      customer: "William Kim",
      email: "will@email.com",
      subject: "Refund Request",
      category: "Refund",
      priority: "medium",
      status: "open",
      date: "2023-06-09",
      lastUpdate: "2023-06-09",
      orderId: "#3207",
      description:
        "I would like to return my wireless mouse as it's not compatible with my system. Please process a refund.",
      attachments: [],
      responses: [
        {
          from: "customer",
          message:
            "I would like to return my wireless mouse as it's not compatible with my system. Please process a refund.",
          date: "2023-06-09 1:20 PM",
        },
      ],
    },
    {
      id: "REC-005",
      customer: "Sofia Davis",
      email: "sofia.davis@email.com",
      subject: "Billing Issue",
      category: "Billing",
      priority: "high",
      status: "escalated",
      date: "2023-06-08",
      lastUpdate: "2023-06-08",
      orderId: "#3206",
      description: "I was charged twice for the same order. Please refund the duplicate charge immediately.",
      attachments: ["bank_statement.pdf"],
      responses: [
        {
          from: "customer",
          message: "I was charged twice for the same order. Please refund the duplicate charge immediately.",
          date: "2023-06-08 8:45 AM",
        },
        {
          from: "support",
          message:
            "Hi Sofia, I've escalated this to our billing department. You should receive a response within 24 hours.",
          date: "2023-06-08 10:30 AM",
        },
      ],
    },
  ]

  const getStatusBadge = (status) => {
    switch (status) {
      case "open":
        return "badge bg-danger"
      case "in_progress":
        return "badge bg-warning"
      case "resolved":
        return "badge bg-success"
      case "escalated":
        return "badge bg-info"
      case "closed":
        return "badge bg-secondary"
      default:
        return "badge bg-secondary"
    }
  }

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "high":
        return "badge bg-danger"
      case "medium":
        return "badge bg-warning"
      case "low":
        return "badge bg-success"
      default:
        return "badge bg-secondary"
    }
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Product Quality":
        return "🔧"
      case "Shipping Error":
        return "📦"
      case "Shipping Delay":
        return "🚚"
      case "Refund":
        return "💰"
      case "Billing":
        return "💳"
      default:
        return "❓"
    }
  }

  const filteredReclamations =
    filterStatus === "all" ? reclamations : reclamations.filter((rec) => rec.status === filterStatus)

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


 

      {/* Main Content */}
      <div className="flex-grow-1">
   
        {/* Reclamations Content */}
        <div className="container-fluid p-3 p-md-4">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
            <h2 className="mb-2 mb-md-0">Support Tickets</h2>
            <div className="d-flex flex-wrap gap-2">
              <select
                className="form-select form-select-sm"
                style={{ width: "auto" }}
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="escalated">Escalated</option>
                <option value="closed">Closed</option>
              </select>
              <button className="btn btn-outline-secondary btn-sm">
                <span className="me-1">🔄</span> Refresh
              </button>
              <button className="btn btn-outline-primary btn-sm">
                <span className="me-1">📥</span> Export
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="row g-3 mb-4">
            <div className="col-6 col-md-3">
              <div className="card text-center">
                <div className="card-body p-3">
                  <h4 className="text-danger mb-1">{reclamations.filter((r) => r.status === "open").length}</h4>
                  <small className="text-muted">Open Tickets</small>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="card text-center">
                <div className="card-body p-3">
                  <h4 className="text-warning mb-1">{reclamations.filter((r) => r.status === "in_progress").length}</h4>
                  <small className="text-muted">In Progress</small>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="card text-center">
                <div className="card-body p-3">
                  <h4 className="text-success mb-1">{reclamations.filter((r) => r.status === "resolved").length}</h4>
                  <small className="text-muted">Resolved</small>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="card text-center">
                <div className="card-body p-3">
                  <h4 className="text-info mb-1">{reclamations.filter((r) => r.status === "escalated").length}</h4>
                  <small className="text-muted">Escalated</small>
                </div>
              </div>
            </div>
          </div>

          {/* Tickets List */}
          <div className="card">
            <div className="card-body p-0">
              {/* Mobile View */}
              <div className="d-block d-md-none">
                {filteredReclamations.map((reclamation) => (
                  <div key={reclamation.id} className="p-3 border-bottom">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div className="flex-grow-1">
                        <div className="d-flex align-items-center mb-1">
                          <span className="me-2">{getCategoryIcon(reclamation.category)}</span>
                          <h6 className="mb-0 text-truncate">{reclamation.subject}</h6>
                        </div>
                        <small className="text-muted">
                          {reclamation.customer} • {reclamation.id}
                        </small>
                      </div>
                      <div className="ms-2">
                        <span className={getStatusBadge(reclamation.status)}>{reclamation.status}</span>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex gap-1">
                        <span className={getPriorityBadge(reclamation.priority)}>{reclamation.priority}</span>
                      </div>
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => setSelectedReclamation(reclamation)}
                      >
                        View
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop View */}
              <div className="d-none d-md-block">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead>
                      <tr>
                        <th scope="col">Ticket</th>
                        <th scope="col">Customer</th>
                        <th scope="col">Category</th>
                        <th scope="col">Priority</th>
                        <th scope="col">Status</th>
                        <th scope="col">Date</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredReclamations.map((reclamation) => (
                        <tr key={reclamation.id}>
                          <td>
                            <div>
                              <div className="fw-bold">{reclamation.id}</div>
                              <div className="small text-muted text-truncate" style={{ maxWidth: "200px" }}>
                                {reclamation.subject}
                              </div>
                            </div>
                          </td>
                          <td>
                            <div>
                              <div className="fw-bold">{reclamation.customer}</div>
                              <div className="small text-muted">{reclamation.email}</div>
                            </div>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <span className="me-2">{getCategoryIcon(reclamation.category)}</span>
                              {reclamation.category}
                            </div>
                          </td>
                          <td>
                            <span className={getPriorityBadge(reclamation.priority)}>{reclamation.priority}</span>
                          </td>
                          <td>
                            <span className={getStatusBadge(reclamation.status)}>{reclamation.status}</span>
                          </td>
                          <td>{reclamation.date}</td>
                          <td>
                            <button
                              className="btn btn-sm btn-outline-primary me-2"
                              onClick={() => setSelectedReclamation(reclamation)}
                            >
                              View
                            </button>
                            <div className="dropdown d-inline-block">
                              <button
                                className="btn btn-sm btn-outline-secondary dropdown-toggle"
                                data-bs-toggle="dropdown"
                              >
                                Actions
                              </button>
                              <ul className="dropdown-menu dropdown-menu-end">
                                <li>
                                  <a className="dropdown-item" href="#" onClick={() => setShowReplyModal(true)}>
                                    Reply
                                  </a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">
                                    Change Status
                                  </a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">
                                    Assign to Agent
                                  </a>
                                </li>
                                <li>
                                  <hr className="dropdown-divider" />
                                </li>
                                <li>
                                  <a className="dropdown-item text-danger" href="#">
                                    Close Ticket
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Pagination */}
          <nav aria-label="Tickets pagination" className="mt-4">
            <ul className="pagination justify-content-center">
              <li className="page-item disabled">
                <a className="page-link" href="#" tabIndex="-1">
                  Previous
                </a>
              </li>
              <li className="page-item active">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Ticket Details Modal */}
      {selectedReclamation && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-lg modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {selectedReclamation.id} - {selectedReclamation.subject}
                </h5>
                <button type="button" className="btn-close" onClick={() => setSelectedReclamation(null)}></button>
              </div>
              <div className="modal-body">
                <div className="row mb-4">
                  <div className="col-md-6">
                    <h6>Customer Information</h6>
                    <p className="mb-1">
                      <strong>Name:</strong> {selectedReclamation.customer}
                    </p>
                    <p className="mb-1">
                      <strong>Email:</strong> {selectedReclamation.email}
                    </p>
                    <p className="mb-1">
                      <strong>Order ID:</strong> {selectedReclamation.orderId}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <h6>Ticket Information</h6>
                    <p className="mb-1">
                      <strong>Category:</strong> {getCategoryIcon(selectedReclamation.category)}{" "}
                      {selectedReclamation.category}
                    </p>
                    <p className="mb-1">
                      <strong>Priority:</strong>{" "}
                      <span className={getPriorityBadge(selectedReclamation.priority)}>
                        {selectedReclamation.priority}
                      </span>
                    </p>
                    <p className="mb-1">
                      <strong>Status:</strong>{" "}
                      <span className={getStatusBadge(selectedReclamation.status)}>{selectedReclamation.status}</span>
                    </p>
                    <p className="mb-1">
                      <strong>Created:</strong> {selectedReclamation.date}
                    </p>
                  </div>
                </div>

                {selectedReclamation.attachments.length > 0 && (
                  <div className="mb-4">
                    <h6>Attachments</h6>
                    <div className="d-flex flex-wrap gap-2">
                      {selectedReclamation.attachments.map((attachment, index) => (
                        <span key={index} className="badge bg-light text-dark">
                          📎 {attachment}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mb-4">
                  <h6>Conversation</h6>
                  <div className="border rounded p-3" style={{ maxHeight: "300px", overflowY: "auto" }}>
                    {selectedReclamation.responses.map((response, index) => (
                      <div key={index} className={`mb-3 ${response.from === "support" ? "text-end" : ""}`}>
                        <div
                          className={`d-inline-block p-3 rounded ${
                            response.from === "support" ? "bg-primary text-white" : "bg-light"
                          }`}
                          style={{ maxWidth: "80%" }}
                        >
                          <div className="mb-1">{response.message}</div>
                          <small className={response.from === "support" ? "text-white-50" : "text-muted"}>
                            {response.from === "support" ? "👤 Support" : "👥 Customer"} • {response.date}
                          </small>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h6>Quick Reply</h6>
                  <textarea className="form-control mb-3" rows="3" placeholder="Type your response..."></textarea>
                  <div className="d-flex gap-2">
                    <button className="btn btn-primary">Send Reply</button>
                    <div className="dropdown">
                      <button className="btn btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown">
                        Change Status
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <a className="dropdown-item" href="#">
                            Open
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            In Progress
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Resolved
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Escalated
                          </a>
                        </li>
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                        <li>
                          <a className="dropdown-item text-danger" href="#">
                            Close
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setSelectedReclamation(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
