import { useState } from 'react';
import { NavLink } from 'react-router-dom';
// import { 
//   FaDashboard, FaCalendar, FaChartBar, FaToggleOff, 
//   FaClone, FaPowerOff, FaNavicon, FaArrowRight 
// } from 'react-icons/fa';

export default function Sidebar({ collapsed }) {
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  return (
    <div className={`col-sm-3 col-lg-2 sidebar ${collapsed ? 'collapsed' : ''}`}>
      {/* Profile Section */}
      <div className="profile-sidebar">
        <div className="profile-userpic">
          <img src="/assets/img/user.png" className="img-responsive" alt="" />
        </div>
        <div className="profile-usertitle">
          <div className="profile-usertitle-name">Username</div>
          <div className="profile-usertitle-status">
            <span className="indicator label-success"></span>Online
          </div>
        </div>
      </div>

      {/* Navigation */}
      <ul className="nav menu">
        <li>
          <NavLink to="/" exact activeClassName="active">
            {/* <FaDashboard />  */}Dashboard
          </NavLink>
        </li>
        <li className="parent">
          <a onClick={() => setActiveSubmenu(activeSubmenu === 'multilevel' ? null : 'multilevel')}>
            {/* <FaNavicon />  */}Multilevel
            {/* <FaPlus className={`pull-right ${activeSubmenu === 'multilevel' ? 'fa-minus' : 'fa-plus'}`} /> */}  
          </a>
          {/* <ul className={`children collapse ${activeSubmenu === 'multilevel' ? 'show' : ''}`}>
            <li><NavLink to="/subitem1"><FaArrowRight /> Sub Item 1</NavLink></li>
            <li><NavLink to="/subitem2"><FaArrowRight /> Sub Item 2</NavLink></li>
          </ul> */}
        </li>
      </ul>
    </div>
  );
}