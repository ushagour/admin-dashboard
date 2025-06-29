import { useState } from 'react';
import Sidebar from './Sidebar';

import { Outlet } from 'react-router-dom';
import Header from './Header';
export default function MainLayout() {
const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
 <div className="d-flex">
        {/* Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            {/* Main Content */}
            
        <div className={`flex-grow-1 ${sidebarOpen ? 'ms-250' : ''} transition-all duration-300`}>

            {/* Header */}  
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            
            
                <div className="flex-grow-1">
                    
                           <Outlet />  



        </div>      
        </div>      
        </div>      

  );
}