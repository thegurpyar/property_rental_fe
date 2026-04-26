import axios from "axios";
import Cookies from "js-cookie";

const apiClient = axios.create({
  baseURL: "https://module-project-tx70.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "69420",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = Cookies.get("accessToken");

  const excluded = ["/auth/verify-otp", "/auth/refresh"];
  if (excluded.some((url) => config.url?.includes(url))) {
    return config;
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ✅ Extracted as a standalone function to avoid TS issues
const refreshTokens = async () => {
  const refreshToken = Cookies.get("refreshToken");
  if (!refreshToken) throw new Error("No refresh token available");

  // ✅ Fixed: response.data.data instead of response.data
  const response = await apiClient.post("/auth/refresh", { refreshToken });
  const { accessToken, refreshToken: newRefreshToken } = response.data.data;

  Cookies.set("accessToken", accessToken);
  Cookies.set("refreshToken", newRefreshToken);

  return { accessToken, refreshToken: newRefreshToken };
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { accessToken } = await refreshTokens();
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;