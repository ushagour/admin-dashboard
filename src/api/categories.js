import axios from 'axios';
import { API_URL, getTokenHeader } from './utils';

export const fetchCategories = async () => {
  const response = await axios.get(`${API_URL}/categories`, getTokenHeader());
  return response.data;
}; 