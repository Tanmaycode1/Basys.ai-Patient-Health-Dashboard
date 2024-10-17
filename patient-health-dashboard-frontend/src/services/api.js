// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://backend-production-5028.up.railway.app/api',
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
