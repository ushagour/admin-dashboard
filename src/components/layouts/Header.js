import { useState } from 'react';
// import { FaEnvelope, FaBell, FaCog } from 'react-icons/fa';

export default function Header({ toggleSidebar }) {
  const [dropdowns, setDropdowns] = useState({
    messages: false,
    notifications: false,
    settings: false
  });

  const toggleDropdown = (name) => {
    setDropdowns(prev => ({
      ...prev,
      [name]: !prev[name],
      ...Object.fromEntries(
        Object.keys(prev)
          .filter(key => key !== name)
          .map(key => [key, false])
      )
    }));
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
          <a className="navbar-brand" href="#">
            <span>Lumino</span>Admin
          </a>
          
          {/* Messages Dropdown */}
          <div className={`dropdown ${dropdowns.messages ? 'open' : ''}`}>
            <a 
              className="dropdown-toggle count-info" 
              onClick={() => toggleDropdown('messages')}
            >
              {/* <FaEnvelope /> */}
              <span className="label label-danger">15</span>
            </a>
            <ul className="dropdown-menu dropdown-messages">
              {/* Message items */}
            </ul>
          </div>
          
          {/* Similar for notifications dropdown */}
        </div>
      </div>
    </nav>
  );
}