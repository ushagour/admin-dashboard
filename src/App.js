// App.js
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import MainLayout from './components/layouts/MainLayout';
import Login from './pages/auth/Login';
import Profile from './pages/auth/Profile';
import Customers from './pages/Customers';
import Orders from './pages/Orders';
import Categories from './pages/Categories';
import Reviews from './pages/Reviews';
import Listings from './pages/listings/Listings';


function App() {

  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Dashboard />} />
              <Route  path='/Customers'   element={<Customers />} />
              <Route  path='/Orders'   element={<Orders />} />
              <Route  path='/Categories'   element={<Categories />} />
              <Route  path='/Listings'   element={<Listings />} />
              <Route  path='/Reviews'   element={<Reviews />} />
              <Route  path='/Profile'   element={<Profile />} />
              {/* other routes */}
            </Route>
            {/* routes without layout, e.g. login */}
            <Route path="/login" element={<Login />} />
       </Routes>
    </BrowserRouter>
  );
}

export default App;