import axios from 'axios';
import { API_URL, getTokenHeader } from './utils';

export const fetchCategories = async () => {
  const response = await axios.get(`${API_URL}/categories`, getTokenHeader());
  return response.data;
};

export const createCategory = async (categoryData) => {
  const response = await axios.post(`${API_URL}/categories`, categoryData, getTokenHeader());
  return response.data;
};

export const updateCategory = async (id, categoryData) => {
  const response = await axios.put(`${API_URL}/categories/${id}`, categoryData, getTokenHeader());
  return response.data;
};

export const deleteCategory = async (id) => {
  const response = await axios.delete(`${API_URL}/categories/${id}`, getTokenHeader());
  return response.data;
};

export const getCategoryById = async (id) => {
  const response = await axios.get(`${API_URL}/categories/${id}`, getTokenHeader());
  return response.data;
}; 