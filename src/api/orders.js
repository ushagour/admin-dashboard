import axios from 'axios';
import { API_URL, getTokenHeader } from './utils';

export const fetchOrders = async () => {
  const response = await axios.get(`${API_URL}/orders`, getTokenHeader());
  return response.data;
};

export const fetchRecentOrders = async () => {
  const response = await axios.get(`${API_URL}/orders/recent`, getTokenHeader());
  return response.data;
}; 