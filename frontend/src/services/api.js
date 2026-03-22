import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api/',
});

// Intercept requests to attach JWT access token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Auth endpoints
export const loginUser = (credentials) => api.post('token/', credentials);
export const registerUser = (userData) => api.post('users/', userData);
export const getCurrentUser = () => api.get('users/me/');
export const getUsers = () => api.get('users/');

// Listings endpoints
export const getListings = (params) => api.get('listings/', { params });
export const getListing = (id) => api.get(`listings/${id}/`);
export const createListing = (data) => api.post('listings/', data);
export const updateListing = (id, data) => api.patch(`listings/${id}/`, data);

// Bookings endpoints
export const getBookings = (params) => api.get('bookings/', { params });
export const getBooking = (id) => api.get(`bookings/${id}/`);
export const createBooking = (data) => api.post('bookings/', data);
export const updateBooking = (id, data) => api.patch(`bookings/${id}/`, data);

export default api;
