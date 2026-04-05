import axios from "axios";
import Cookies from "js-cookie";



const apiClient = axios.create({
  baseURL: "http://localhost:5000/api",
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

apiClient.refreshTokens = async () => {
  try {
    const refreshToken = Cookies.get("refreshToken");
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    const response = await apiClient.post("/auth/refresh", {
      refreshToken,
    });

    const { accessToken, refreshToken: newRefreshToken } = response.data;

    Cookies.set("accessToken", accessToken);
    Cookies.set("refreshToken", newRefreshToken);

    return { accessToken, refreshToken: newRefreshToken };
  } catch (error) {
    console.error("Token refresh failed:", error);
    throw error;
  }
};


apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If access token expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { accessToken } = await apiClient.refreshTokens();

        // Update header and retry request
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return apiClient(originalRequest);
      } catch (refreshError) {
        // ❌ Refresh failed → logout user
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");

        // Optional: redirect to login
        window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;