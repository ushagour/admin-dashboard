import axios from 'axios';
import { API_URL, getTokenHeader } from './utils';

export const fetchListings = async () => {
  const response = await axios.get(`${API_URL}/listings`, getTokenHeader());
  return response.data;
};

export const fetchTopListings = async () => {
  const response = await axios.get(`${API_URL}/listings/top`, getTokenHeader());
  return response.data;
}; 