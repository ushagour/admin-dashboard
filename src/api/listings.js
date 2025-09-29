import axios from 'axios';
import { API_URL, getTokenHeader } from './utils';

// Helper to get headers with token, but without Content-Type for FormData
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? {Authorization: `Bearer ${localStorage.getItem('token')}` }
  : {};
  
};

export const createListing = async (listingData) => {
  // If listingData is FormData (for file uploads), don't set Content-Type
  const isFormData = listingData instanceof FormData;
  const headers = isFormData
    ? getAuthHeaders()
    : { ...getTokenHeader().headers, 'Content-Type': 'multipart/form-data' };

  const response = await axios.post(`${API_URL}/listings`, listingData, { headers });
  return response.data;
};

export const fetchListings = async () => {
  console.log("Fetching listings from API:", `${API_URL}/listings`);
  console.log("Using headers:", getTokenHeader());
  console.log(getAuthHeaders());
  
  
  
  const response = await axios.get(`${API_URL}/listings`, getTokenHeader());
  return response.data;
};


export const fetchTopListings = async () => {
  const response = await axios.get(`${API_URL}/listings/top`, getTokenHeader());
  return response.data;
};


export const updateListing = async (id, listingData) => {
  const isFormData = listingData instanceof FormData;
  const headers = isFormData
    ? getAuthHeaders()
    : { ...getTokenHeader().headers, 'Content-Type': 'application/json' };

  const response = await axios.put(`${API_URL}/listings/${id}`, listingData, { headers });
  return response.data;
};

export const deleteListing = async (id) => {
  const response = await axios.delete(`${API_URL}/listings/${id}`, getTokenHeader());
  return response.data;
};

export const getListingById = async (id) => {
  const response = await axios.get(`${API_URL}/listings/detail/${id}`, getTokenHeader());
  return response.data;
};