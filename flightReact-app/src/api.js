// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/users'; // Replace with your API base URL

export const registerUser = (user) => {
  return axios.post(API_URL, user);
};

export const loginUser = (email, password) => {
  // Implement login API call, if needed
};

export const getUser = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

export const getAllUsers = () => {
  return axios.get(API_URL);
};

export const updateUser = (id, user) => {
  return axios.put(`${API_URL}/${id}`, user);
};

export const deleteUser = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

export const deleteAllUsers = () => {
  return axios.delete(API_URL);
};
