import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchRecentOrders } from "../../api/api";
import React from "react";
import ChangeDateFormat from "../../helper/ChangeDateFormat";

const getStatusColor = (status) => {
  switch (status) {
    case "completed":
      return "badge bg-success";
    case "processing":
      return "badge bg-primary";
    case "pending":
      return "badge bg-warning text-dark";
    default:
      return "badge bg-secondary";
  }
};

export default function RecentOrders() {
  const navigate = useNavigate();
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchRecentOrders()
      .then((data) => setRecentOrders(data))
      .catch(() => setRecentOrders([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="col-lg-8 mb-4">
      <div className="card">
        <div className="card-header">
          <h5 className="card-title mb-0">Recent Orders</h5>
          <small className="text-muted">
            {loading
              ? "Loading..."
              : `You have ${recentOrders.length} orders this month.`}
          </small>
        </div>
        <div className="card-body">
          {loading ? (
            <div>Loading recent orders...</div>
          ) : recentOrders.length === 0 ? (
            <div className="text-muted">No recent orders found.</div>
          ) : (
            recentOrders.map((order, index) => (
              <div
                key={index}
                className="d-flex justify-content-between align-items-center p-3 border rounded mb-2"
              >
                <div>
                  <h6 className="mb-1">{order.User?.name || "Unknown"}</h6>
                  <small className="text-muted">{order.User?.email || ""}</small>
                </div>
                <div className="d-flex align-items-center">
                  <span className={getStatusColor(order.status)}>{order.status}</span>
                  <div className="text-end ms-3">
                    <div className="fw-bold">{order.total_price} $</div>
                    <small className="text-muted">
                      {ChangeDateFormat(order.createdAt)}
                    </small>
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
                        <button
                          className="dropdown-item"
                          onClick={() => setSelectedOrder(order)}
                        >
                          👁️ View Details
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => alert("Update Status feature coming soon!")}
                        >
                          Update Status
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => alert("Contact Customer feature coming soon!")}
                        >
                          Contact Customer
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ))
          )}
          <button
            className="btn btn-outline-primary w-100 mt-3"
            onClick={() => navigate("/orders")}
          >
            View All Orders
          </button>
        </div>
      </div>

      {/* Modal for View Details */}
      {selectedOrder && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Order Details</h5>
                <button type="button" className="btn-close" onClick={() => setSelectedOrder(null)}></button>
              </div>
              <div className="modal-body">
                <p><strong>Customer:</strong> {selectedOrder.User?.name}</p>
                <p><strong>Email:</strong> {selectedOrder.User?.email}</p>
                <p><strong>Status:</strong> <span className={getStatusColor(selectedOrder.status)}>{selectedOrder.status}</span></p>
                <p><strong>Total Price:</strong> {selectedOrder.total_price}</p>
                <p><strong>Date:</strong> {ChangeDateFormat(selectedOrder.createdAt)}</p>
                {/* Add more order details as needed */}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setSelectedOrder(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
