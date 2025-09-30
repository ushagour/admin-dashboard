import { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import './Sidebar.css';

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const { user, logout } = useAuth();
  const location = useLocation();

  // Helper function to check if a link is active
  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  // Helper function to get link classes
  const getLinkClasses = (path) => {
    const baseClasses = "nav-link text-white-50 sidebar-nav-link";
    return isActive(path) 
      ? `${baseClasses} active` 
      : baseClasses;
  };


        const date = new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              });

  return (
    <div
      className={`bg-dark text-white ${sidebarOpen ? "d-block" : "d-none d-lg-block"}`}
      style={{ width: "250px", minHeight: "100vh" }}
    >
      <div className="d-flex flex-column h-100 p-3">
        <div>
          <div className="d-flex align-items-center mb-4">
            <div className="rounded p-2 ">
              <img
                src="/JIBOBI3_LOGO.png"
                alt="Logo"
                className="img-fluid"
                style={{ width: "80px", height: "auto" }} 
              />
            </div>
            <div>
              <h5 className="mb-0">JIB O BI3</h5>
              {/* <small className="text-white"> {date} </small> */}
                            <br />

              
            </div>
          </div>

          <nav className="nav flex-column">
            <Link className={getLinkClasses('/')} to="/">
              🏠 Dashboard
            </Link>
            
            <Link className={getLinkClasses('/Orders')} to="/Orders">
              🛒 Orders
            </Link>
            
            <Link className={getLinkClasses('/Listings')} to="/Listings">
              📦 Listings
            </Link>
            
            <Link className={getLinkClasses('/Categories')} to="/Categories">
              ⚙️ Categories
            </Link>
            
            <Link className={getLinkClasses('/Customers')} to="/Customers">
              👥 Customers
            </Link>
            
            <Link className={getLinkClasses('/ReviewsAndMessages')} to="/ReviewsAndMessages">
              📊 Reviews & Messages
            </Link>
          </nav>

          


            </div>
          </div> 
        </div>
  
  );
}