import axios from 'axios';
import { API_URL, getTokenHeader } from './utils';

export const fetchReviews = async () => {
  const response = await axios.get(`${API_URL}/reviews`, getTokenHeader());
  return response.data;
}; 