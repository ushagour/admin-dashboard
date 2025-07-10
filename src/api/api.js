import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://192.168.0.176:9001/api';



export const LoginAPI = async (email, password) => { 
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};  



// fetch orders
export const fetchOrders = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/orders`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};


export const fetchListings = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/listings`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const fetchCategories = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/categories`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const fetchReviews = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/reviews`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// fetch users 
export const fetchUsers = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const RegisterAPI = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};


export const fetchRecentOrders = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/orders/recent`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

//Top Listings
export const fetchTopListings = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/listings/top`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
