import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Add request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // You can modify the request config before sending the request
    console.log('Request:', config);
    return config;
  },
  (error) => {
    // Handle request error
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Handle successful response
    console.log('Response:', response);
    return response.data; // Directly return the data
  },
  (error) => {
    // Handle response error
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error('Response error:', error.response);
    } else if (error.request) {
      // Request was made but no response was received
      console.error('No response:', error.request);
    } else {
      // Something else happened while setting up the request
      console.error('Error setting up request:', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
