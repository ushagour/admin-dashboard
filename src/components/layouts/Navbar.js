import { useState } from 'react';

import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap styles are included

export default function Navbar({ toggleSidebar }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)




  return (
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
          <div className="container-fluid">
            <button className="btn btn-outline-secondary d-lg-none me-2" onClick={() => setSidebarOpen(!sidebarOpen)}>
              ☰
            </button>

            <div className="d-flex flex-grow-1 align-items-center">
              <div className="position-relative me-auto" style={{ maxWidth: "400px", width: "100%" }}>
                <input type="search" className="form-control" placeholder="Search products, orders, customers..." />
                <span className="position-absolute top-50 start-0 translate-middle-y ms-2">🔍</span>
              </div>

              <div className="d-flex align-items-center">
                <button className="btn btn-outline-secondary me-2">🔔</button>
                <div className="dropdown">
                  <button className="btn btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown">
                    👤
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="#">
                        Profile
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Settings
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </nav>
  );
}