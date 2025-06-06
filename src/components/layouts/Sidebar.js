import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar({ collapsed }) {
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  return (
    <div className={`col-sm-3 col-lg-2 sidebar ${collapsed ? 'collapsed' : ''}`}>
      {/* Profile Section */}
      <div className="profile-sidebar">
        <div className="profile-userpic">
          <img src="https://gravatar.com/avatar/d961517c4068e094c94dd5a13d455162?s=400&d=robohash&r=x" className="img-responsive" alt="" />
        </div>
        <div className="profile-usertitle">
          <div className="profile-usertitle-name">Username</div>
          <div className="profile-usertitle-status">
            <span className="indicator label-success"></span>Online
          </div>
        </div>
      </div>
		<div className="divider"></div>
			<form role="search">
				<div className="form-group">
					<input type="text" className="form-control" placeholder="Search"/>
				</div>
			</form>
      {/* Navigation */}
      <ul className="nav menu">
        <li className="active">
          <NavLink to="/" exact active className="active">
            <em className="fa fa-dashboard">&nbsp;</em>Dashboard
          </NavLink>
        </li>
			<li><a href="widgets.html"><em className="fa fa-calendar">&nbsp;</em> Widgets</a></li>
			<li><a href="charts.html"><em className="fa fa-bar-chart">&nbsp;</em> Charts</a></li>
			<li><a href="elements.html"><em className="fa fa-toggle-off">&nbsp;</em> UI Elements</a></li>
			<li><a href="panels.html"><em className="fa fa-clone">&nbsp;</em> Alerts &amp; Panels</a></li>
      </ul>
    </div>
  );
}