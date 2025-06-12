import { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {

  return (
 <div className="d-flex">
        {/* Sidebar */}

      <Sidebar />
            {/* Main Content */}
                <div className="flex-grow-1">
                      {/* Header */}
                       <Navbar  />
                      {/* Dashboard Content */}
                       <Outlet />  



        </div>      
        </div>      

  );
}