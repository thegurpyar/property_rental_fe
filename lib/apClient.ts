import axios from "axios";
import Cookies from "js-cookie";

const apiClient = axios.create({
  baseURL: "https://07fc-2409-40d1-467-60fb-5c26-7ab1-7057-bba2.ngrok-free.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
    const token = Cookies.get("accessToken");
  
    if (config.url?.includes("/auth/verify-otp")) {
      return config; // 🚫 no token
    }
  
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  
    return config;
  });

export default apiClient;