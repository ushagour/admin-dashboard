import { useState } from 'react';

import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap styles are included

export default function Header({ toggleSidebar }) {
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <nav className="navbar navbar-custom navbar-fixed-top">
      <div className="container-fluid">
        <div className="navbar-header">
          <button 
            className="navbar-toggle collapsed" 
            onClick={toggleSidebar}
          >
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="/">
            <span>Jib O bI3 </span> Dashboard 
          </a>

        <ul className="nav navbar-top-links navbar-right">
          {/* Messages Dropdown */}
          <li className={`dropdown${openDropdown === 'messages' ? ' open' : ''}`}>
            <a
              className="dropdown-toggle count-info"
              href="/"
              onClick={e => { e.preventDefault(); handleDropdown('messages'); }}
            >
              <em className="fa fa-envelope"></em>
              <span className="label label-danger">15</span>
            </a>
            <ul className="dropdown-menu dropdown-messages">
              <li>
                <div className="dropdown-messages-box">
                  <a href="profile.html" className="pull-left">
                    <img alt="image" className="img-circle" src="http://placehold.it/40/30a5ff/fff" />
                  </a>
                  <div className="message-body">
                    <small className="pull-right">3 mins ago</small>
                    <a href="#"><strong>John Doe</strong> commented on <strong>your photo</strong>.</a>
                    <br /><small className="text-muted">1:24 pm - 25/03/2015</small>
                  </div>
                </div>
              </li>
              <li className="divider"></li>
              <li>
                <div className="dropdown-messages-box">
                  <a href="profile.html" className="pull-left">
                    <img alt="image" className="img-circle" src="http://placehold.it/40/30a5ff/fff" />
                  </a>
                  <div className="message-body">
                    <small className="pull-right">1 hour ago</small>
                    <a href="#">New message from <strong>Jane Doe</strong>.</a>
                    <br /><small className="text-muted">12:27 pm - 25/03/2015</small>
                  </div>
                </div>
              </li>
              <li className="divider"></li>
              <li>
                <div className="all-button">
                  <a href="#">
                    <em className="fa fa-inbox"></em> <strong>All Messages</strong>
                  </a>
                </div>
              </li>
            </ul>
          </li>
          {/* Notifications Dropdown */}
          <li className={`dropdown${openDropdown === 'notifications' ? ' open' : ''}`}>
            <a
              className="dropdown-toggle count-info"
              href="/"
              onClick={e => { e.preventDefault(); handleDropdown('notifications'); }}
            >
              <em className="fa fa-bell"></em>
              <span className="label label-info">5</span>
            </a>
            <ul className="dropdown-menu dropdown-alerts">
              <li>
                <a href="#">
                  <div>
                    <em className="fa fa-envelope"></em> 1 New Message
                    <span className="pull-right text-muted small">3 mins ago</span>
                  </div>
                </a>
              </li>
              <li className="divider"></li>
              <li>
                <a href="#">
                  <div>
                    <em className="fa fa-heart"></em> 12 New Likes
                    <span className="pull-right text-muted small">4 mins ago</span>
                  </div>
                </a>
              </li>
              <li className="divider"></li>
              <li>
                <a href="#">
                  <div>
                    <em className="fa fa-user"></em> 5 New Followers
                    <span className="pull-right text-muted small">4 mins ago</span>
                  </div>
                </a>
              </li>
            </ul>
          </li>
        </ul>
                </div>
      </div>
    </nav>
  );
}