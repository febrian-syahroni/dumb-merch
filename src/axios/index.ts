// src/services/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use((response) => {
  if (response.data.token) {
    document.cookie = `token=${response.data.token}; path=/;`;
  }
  return response;
});

export default api;
