import axios from 'axios';
import { API_URL, getTokenHeader } from './utils';

export const fetchStats = async () => {
  const response = await axios.get(`${API_URL}/stats`, getTokenHeader());
  return response.data;
}; 