import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchRecentOrders } from "../../api/api";
import React from "react";
import ChangeDateFormat from "../../helper/ChangeDateFormat";

// Helper to format date prettily


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
                    <div className="fw-bold">{order.total_price}</div>
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
    </div>
  );
}
