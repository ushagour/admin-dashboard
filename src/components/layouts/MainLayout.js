import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="wrapper">
      <Header toggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <Sidebar collapsed={sidebarCollapsed} />
      <div className={`content ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="container-fluid">
          <Outlet />
        </div>
        </div>
      

    </div>
  );
}