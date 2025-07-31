export const API_URL = process.env.REACT_APP_API_URL || 'http://192.168.31.137:9001/api';
export const getTokenHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
}; 