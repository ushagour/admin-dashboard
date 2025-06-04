// App.js
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import MainLayout from './components/layouts/MainLayout';
import Login from './pages/Login';

function App() {

  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Dashboard />} />
              {/* other routes */}
            </Route>
            {/* routes without layout, e.g. login */}
            <Route path="/login" element={<Login />} />
       </Routes>
    </BrowserRouter>
  );
}

export default App;