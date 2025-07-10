import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { fetchOrders } from "../api/api";
import ChangeDateFormat from "../helper/ChangeDateFormat";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders().then(data => setOrders(data)).catch(console.error);
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return "badge bg-success";
      case "pending":
        return "badge bg-warning";
      case "cancelled":
        return "badge bg-danger";
      default:
        return "badge bg-secondary";
    }
  };

  return (
    <div className="flex-grow-1">
      <div className="container-fluid p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">Orders</h2>
          <button className="btn btn-primary">
            <span className="me-1">➕</span> Add Order
          </button>
        </div>
        <div className="card mb-4">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.User.name}</td>
                      <td>
                       { ChangeDateFormat(order.createdAt)}</td>
                      <td>{order.total_price}</td>
                      <td>
                        <span className={getStatusBadge(order.status)}>{order.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* Pagination (optional) */}
        <nav aria-label="Orders pagination">
          <ul className="pagination justify-content-center">
            <li className="page-item disabled">
              <a className="page-link" href="#" tabIndex="-1">Previous</a>
            </li>
            <li className="page-item active">
              <a className="page-link" href="#">1</a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">2</a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">Next</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}