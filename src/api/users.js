import axios from 'axios';
import { API_URL, getTokenHeader } from './utils';

export const fetchUsers = async () => {
  const response = await axios.get(`${API_URL}/users`, getTokenHeader());
  return response.data;
};

export const fetchCompletedOrders = async (userId) => {
  const response = await axios.get(`${API_URL}/orders/completed-count/${userId}`, getTokenHeader());
  return response.data;
};

export const createUser = async (userData) => {
  const response = await axios.post(`${API_URL}/users`, userData, getTokenHeader());
  return response.data;
};

export const updateUser = async (id, userData) => {
  const response = await axios.put(`${API_URL}/users/${id}`, userData, getTokenHeader());
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await axios.delete(`${API_URL}/users/${id}`, getTokenHeader());
  return response.data;
};

export const getUserById = async (id) => {
  const response = await axios.get(`${API_URL}/users/${id}`, getTokenHeader());
  return response.data;
}; 