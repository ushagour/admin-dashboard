import axios from 'axios';
import { API_URL, getTokenHeader } from './utils';

export const fetchMessages = async () => {
  const response = await axios.get(`${API_URL}/messages`, getTokenHeader());
  return response.data;
}; 


export const markMessageAsRead = async (id) => {
  const response = await axios.patch(`${API_URL}/messages/${id}/read`, {}, getTokenHeader());
  return response.data;
};