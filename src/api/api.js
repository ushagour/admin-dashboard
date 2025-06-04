import axios from 'axios';

const API_URL = 'http://your-backend-api.com';

export const fetchUsers = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const LoginAPI = async (email, password) => { 
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};  
