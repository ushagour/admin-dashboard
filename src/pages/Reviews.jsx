"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { fetchReviews, fetchMessages } from "../api/api";
import ChangeDateFormat from "../helper/ChangeDateFormat";

export default function Reviews() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [messages, setMessages] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    fetchReviews().then((data) => setReviews(data)).catch(console.error);
    fetchMessages().then((data) => setMessages(data)).catch(console.error);
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case "open":
        return "badge bg-danger";
      case "resolved":
        return "badge bg-success";
      case "closed":
        return "badge bg-secondary";
      default:
        return "badge bg-secondary";
    }
  };

  const filteredReviews =
    filterStatus === "all"
      ? reviews
      : reviews.filter((r) => r.status === filterStatus);

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
        <div className="container-fluid p-3 p-md-4">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
            <h2 className="mb-2 mb-md-0">Customer Reviews & Messages</h2>
            <div className="d-flex flex-wrap gap-2">
              <select
                className="form-select form-select-sm"
                style={{ width: "auto" }}
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="open">Open</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
              <button className="btn btn-outline-secondary btn-sm">
                <span className="me-1">🔄</span> Refresh
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="row g-3 mb-4">
            <div className="col-6 col-md-3">
              <div className="card text-center">
                <div className="card-body p-3">
                  <h4 className="text-danger mb-1">
                    {reviews.filter((r) => r.status === "open").length}
                  </h4>
                  <small className="text-muted">Open Reviews</small>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="card text-center">
                <div className="card-body p-3">
                  <h4 className="text-success mb-1">
                    {reviews.filter((r) => r.status === "resolved").length}
                  </h4>
                  <small className="text-muted">Resolved</small>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="card text-center">
                <div className="card-body p-3">
                  <h4 className="text-secondary mb-1">
                    {reviews.filter((r) => r.status === "closed").length}
                  </h4>
                  <small className="text-muted">Closed</small>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="card text-center">
                <div className="card-body p-3">
                  <h4 className="text-info mb-1">{messages.length}</h4>
                  <small className="text-muted">Messages</small>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Table */}
          <div className="card mb-4">
            <div className="card-header">Customer Reviews</div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead>
                    <tr>
                      <th scope="col">Review ID</th>
                      <th scope="col">Customer</th>
                      <th scope="col">Subject</th>
                      <th scope="col">Rating</th>
                      <th scope="col">Status</th>
                      <th scope="col">Date</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredReviews.map((review) => (
                      <tr key={review.id}>
                        <td>{review.id}</td>
                        <td>{review.User.name}</td>
                        <td>{review.comment}</td>
                        <td>
                          <span className={`badge bg-${review.rating >= 4 ? 'success' : review.rating >= 2 ? 'warning' : 'danger'}`}>
                            {"⭐"} {review.rating}
                          </span>
                        </td>
                        <td>
                          <span className={getStatusBadge(review.status)}>
                            {review.status}
                          </span>
                        </td>
                        <td>{ChangeDateFormat(review.createdAt)}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-outline-primary me-2"
                            onClick={() => setSelectedReview(review)}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Messages Table */}
          <div className="card">
            <div className="card-header">Customer Messages</div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead>
                    <tr>
                      <th scope="col">Message ID</th>
                      <th scope="col">Sender </th>
                      <th scope="col">Receiver</th>
                      <th scope="col">Content</th>
                      <th scope="col">Read</th>
                      <th scope="col">Date</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {messages.map((msg) => (
                      <tr key={msg.id}>
                        <td>{msg.id}</td>
                        <td>{msg.toUser}</td>
                        <td>{msg.fromUser}</td>
                        <td>{msg.content.slice(0, 40)}...</td>
                        <td>
                          <span
                            className={
                              msg.is_read
                                ? "badge bg-success"
                                : "badge bg-warning"
                            }
                          >
                            {msg.is_read ? "Read" : "Unread"}
                          </span>
                        </td>
                        <td>{ChangeDateFormat(msg.createdAt)}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-outline-primary me-2"
                            onClick={() => setSelectedMessage(msg)}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Review Details Modal */}
          {selectedReview && (
            <div
              className="modal show d-block"
              tabIndex="-1"
              style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            >
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Review Details</h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setSelectedReview(null)}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <p>
                      <strong>Customer:</strong> {selectedReview.User.name}
                    </p>
                    <p>
                      <strong>Subject:</strong> {selectedReview.comment}
                    </p>
                    <p>
                      <strong>Status:</strong>{" "}
                      <span className={getStatusBadge(selectedReview.status)}>
                        {selectedReview.status}
                      </span>
                    </p>
                    <p>
                      <strong>Date:</strong> {ChangeDateFormat(selectedReview.createdAt)}
                    </p>
                    <p>
                      <strong>Review:</strong> {selectedReview.content}
                    </p>


                          <img
                            src={selectedReview || "/placeholder.png"}
                            alt={selectedReview.title}
                            style={{ width: 48, height: 48, objectFit: "cover", borderRadius: 6 }}
                          />
             

                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setSelectedReview(null)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Message Details Modal */}
          {selectedMessage && (
            <div
              className="modal show d-block"
              tabIndex="-1"
              style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Message Details</h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setSelectedMessage(null)}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <p>
                      <strong>Customer:</strong> {selectedMessage.customerName}
                    </p>
                    <p>
                      <strong>Date:</strong> {ChangeDateFormat(selectedMessage.createdAt)}
                    </p>
                    <p>
                      <strong>Content:</strong> {selectedMessage.content}
                    </p>
                    <p>
                      <strong>Status:</strong>{" "}
                      <span
                        className={
                          selectedMessage.is_read
                            ? "badge bg-success"
                            : "badge bg-warning"
                        }
                      >
                        {selectedMessage.is_read ? "Read" : "Unread"}
                      </span>
                    </p>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setSelectedMessage(null)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
