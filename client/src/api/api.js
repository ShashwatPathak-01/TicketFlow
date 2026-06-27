import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api",
});

// Automatically attach JWT token
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  console.log("Interceptor token:", token);
  console.log("Request URL:", req.url);

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  console.log("Authorization:", req.headers.Authorization);

  return req;
});

export default API;