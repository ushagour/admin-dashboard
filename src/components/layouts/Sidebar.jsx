import { useState } from 'react';
import { Link } from "react-router-dom";



export default function Sidebar({ sidebarOpen, setSidebarOpen }) {

  return (
    <div
        className={`bg-dark text-white ${sidebarOpen ? "d-block" : "d-none d-lg-block"}`}
        style={{ width: "250px", minHeight: "100vh" }}
      >
        <div className="d-flex flex-column h-100 p-3">
          <div>
            <div className="d-flex align-items-center mb-4">
              <div className="bg-primary rounded p-2 me-2">
                <img
                  src="/JIBOBI3_LOGO.png"//  you can access to public folder in react app
                  alt="Logo"
                  className="img-fluid"
                  style={{ width: "40px", height: "40px" }}
                />
              </div>
              <div>
                <h5 className="mb-0">JIB O BI3 </h5>
                <small className="text">Dashboard</small>
              </div>
            </div>

            <nav className="nav flex-column">
              
              <Link className="nav-link text-white-50"  to="/"> 🏠 Dashboard</Link >
              <Link className="nav-link text-white-50"  to="/orders">  🛒 Orders</Link>
              <Link className="nav-link text-white-50"  to="/listings "> 📦 Listings</Link>
              <Link className="nav-link text-white-50"  to="/Categories"> ⚙️ Categories</Link>
              <Link className="nav-link text-white-50"  to="/customers"> 👥 Customers</Link>
              <Link className="nav-link text-white-50"  to="/reviews"> 📊 Reviews & Messages</Link>
              {/* <Link className="nav-link text-white-50"  to="/users"> 👤 Users </Link> */}

            </nav>

            <div className="mt-4">
              <button className="btn btn-primary w-100">➕ Add Product</button>
            </div>
          </div>
    
        </div>
      </div>
  );
}