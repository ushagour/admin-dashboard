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