import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

export const register = async (formData) => {
  const response = await axios.post(`${API_URL}/register`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

export const login = async (identifier, password) => {
  const response = await axios.post(`${API_URL}/login`, { identifier, password });
  return response.data;
};

export const logout = async (token) => {
  const response = await axios.post(
    `${API_URL}/logout`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return response.data;
};

export const refreshToken = async (refreshToken) => {
  const response = await axios.post(`${API_URL}/refresh`, { refreshToken });
  return response.data;
};
