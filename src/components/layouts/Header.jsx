import React from 'react'
import Search from '../forms/Search'

function Header({sidebarOpen, setSidebarOpen}) {

  return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom sticky-top">
          <div className="container-fluid">
            <button
                className="btn btn-outline-secondary me-2 d-lg-none"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                ☰
            </button>

            <div className="d-flex flex-grow-1 align-items-center">
              <div className="position-relative me-auto" style={{ maxWidth: "500px", width: "100%" }}>
            
            <Search />
              </div>

              <div className="d-flex align-items-center ms-2">
                <button className="btn btn-outline-secondary btn-sm me-2">🔔</button>
                <div className="dropdown">
                  <button className="btn btn-outline-secondary btn-sm dropdown-toggle" data-bs-toggle="dropdown">
                    👤
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <a className="dropdown-item" href="/Profile">
                        Profile
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

  )
}

export default Header