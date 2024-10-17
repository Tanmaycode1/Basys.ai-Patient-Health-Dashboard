// src/services/api.js
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const api = axios.create({
  baseURL: 'https://backend-6ug5.onrender.com/api',
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // If unauthorized, clear token and redirect to login page
      localStorage.removeItem('token');
      window.location.href = '/login'; // Or use `useNavigate` from React Router if available
    }
    return Promise.reject(error);
  }
);

export const login = (username, password) => {
  console.log('Sending login request:', { username, password });
  return api.post('/auth/login', { username, password });
};

export const getCurrentUser = () => api.get('/auth/me');

export const getPatients = () => api.get('/patients');
export const getPatient = (id) => api.get(`/patients/${id}`);
export const createPatient = (patientData) => api.post('/patients', patientData);

export const getAuthorization = (id) => api.get(`/authorizations/${id}`);

export const getAuthorizations = () => api.get('/authorizations');
export const getPatientAuthorizations = (patientId) => api.get(`/authorizations/patient/${patientId}`);
export const createAuthorization = (authData) => api.post('/authorizations', authData);
export const reviewAuthorization = (id, reviewData) => api.patch(`/authorizations/${id}/review`, reviewData);

export default api;
