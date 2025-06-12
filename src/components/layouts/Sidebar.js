import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar({ collapsed }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div
        className={`bg-dark text-white ${sidebarOpen ? "d-block" : "d-none d-lg-block"}`}
        style={{ width: "250px", minHeight: "100vh" }}
      >
        <div className="p-3">
          <div className="d-flex align-items-center mb-4">
            <div className="bg-primary rounded p-2 me-2">📦</div>
            <div>
              <h5 className="mb-0">SellerPro</h5>
              <small className="text-muted">Dashboard</small>
            </div>
          </div>

          <nav className="nav flex-column">
            <a className="nav-link text-white active" href="#">
              🏠 Dashboard
            </a>
            <a className="nav-link text-white-50" href="#">
              📦 Products
            </a>
            <a className="nav-link text-white-50" href="#">
              🛒 Orders
            </a>
            <a className="nav-link text-white-50" href="#">
              👥 Customers
            </a>
            <a className="nav-link text-white-50" href="#">
              📊 Analytics
            </a>
            <a className="nav-link text-white-50" href="#">
              ⚙️ Settings
            </a>
          </nav>

          <div className="mt-4">
            <button className="btn btn-primary w-100">➕ Add Product</button>
          </div>
        </div>
      </div>
  );
}