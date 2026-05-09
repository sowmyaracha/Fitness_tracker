import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import axios from "utils/axiosInstance";
import App from "./App.jsx";

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

createRoot(document.getElementById("root")).render(
    <App />
);