import api from './api';

export const getAllUsers = async (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.search) params.append('search', filters.search);
  if (filters.state) params.append('state', filters.state);
  if (filters.city) params.append('city', filters.city);

  const response = await api.get(`/users?${params.toString()}`);
  return response.data;
};

export const getUserById = async (id) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

export const updateUser = async (id, formData) => {
  const response = await api.put(`/users/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};
