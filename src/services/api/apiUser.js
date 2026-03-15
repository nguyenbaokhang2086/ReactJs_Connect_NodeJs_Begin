import apiInstance from './index';
export const getUsers = () => apiInstance.get('/users');
export const createUser = (userData) => apiInstance.post('/users', userData);
export const updateUser = (userId, userData) => apiInstance.put(`/users/${userId}`, userData);
export const deleteUser = (userId) => apiInstance.delete(`/users/${userId}`);
