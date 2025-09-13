// App.js
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import MainLayout from './components/layouts/MainLayout';
import Login from './pages/auth/Login';
import Profile from './pages/auth/Profile';
import Customers from './pages/customers/Customers';
import Orders from './pages/Orders';
import Categories from './pages/categories/Categories';
import Reviews from './pages/Reviews';
import Listings from './pages/listings/Listings';
import { AuthProvider } from './hooks/useAuth';
import { ProtectedRoute } from './components/ui';
import ListingDetail from './pages/listings/ListingDetail';
import CategoriesDetail from './pages/categories/CategoriesDetail';
import CustomerDetail from './pages/customers/CustomerDetail';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {

  return (
    <AuthProvider>
            <ToastContainer />

      <BrowserRouter>
          <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path='/Customers' element={<ProtectedRoute><Customers /></ProtectedRoute>} />
                <Route path='/Customers/:id' element={<ProtectedRoute><CustomerDetail /></ProtectedRoute>} />
                <Route path='/Orders' element={<ProtectedRoute><Orders /></ProtectedRoute>} />
                <Route path='/Categories' element={<ProtectedRoute><Categories /></ProtectedRoute>} />
                <Route path='/Categories/:id' element={<ProtectedRoute><CategoriesDetail /></ProtectedRoute>} />
                <Route path='/Listings' element={<ProtectedRoute><Listings /></ProtectedRoute>} />
                <Route path='/Listings/:id' element={<ProtectedRoute><ListingDetail /></ProtectedRoute>} />
                <Route path='/Reviews' element={<ProtectedRoute><Reviews /></ProtectedRoute>} />
                <Route path='/Profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                {/* other routes */}
              </Route>
              {/* routes without layout, e.g. login */}
              <Route path="/login" element={<Login />} />
         </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;