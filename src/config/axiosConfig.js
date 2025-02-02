// File Name: config/axiosConfig.js
// Description: This file sets up a global Axios instance with default configurations for API requests.

import axios from "axios";

// Create an Axios instance with default configurations
const apiClient = axios.create({
	baseURL: process.env.NEXT_PUBLIC_APP_API_BASE_URL || "https://api.example.com", // Set the base URL from environment variables or fallback
	timeout: 10000, // Set a default timeout of 10 seconds
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
		"X-API-Key": process.env.NEXT_PUBLIC_API_KEY,
	},
});

// Add a request interceptor to include authorization tokens if available
// apiClient.interceptors.request.use(
// 	(config) => {
// 		const token = localStorage.getItem("authToken"); // Retrieve token from local storage
// 		if (token) {
// 			config.headers.Authorization = `Bearer ${token}`;
// 		}
// 		return config;
// 	},
// 	(error) => {
// 		return Promise.reject(error);
// 	}
// );

// // Add a response interceptor to handle global errors
// apiClient.interceptors.response.use(
// 	(response) => response,
// 	(error) => {
// 		if (error.response) {
// 			// Handle specific error responses (e.g., unauthorized access)
// 			if (error.response.status === 401) {
// 				console.error("Unauthorized access - redirecting to login");
// 				// Optionally redirect to login page
// 				window.location.href = "/login";
// 			}
// 		} else {
// 			console.error("Network or server error:", error);
// 		}
// 		return Promise.reject(error);
// 	}
// );

export default apiClient;
