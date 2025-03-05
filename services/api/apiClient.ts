import Cookies from "js-cookie";
import axios from "axios";

const baseURL = "https://tiplink-node-server-production.up.railway.app";
export const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = Cookies.get("refreshToken");
        const response = await axios.post(`${baseURL}/token`, null, {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        });

        const newToken = response.data.token;
        const newRefreshToken = response.data.refreshToken;

        // Update the cookies with the new tokens
        Cookies.set("token", newToken);
        Cookies.set("refreshToken", newRefreshToken);

        // Update the Authorization header for the original request
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

        // Retry the original request with the new token
        return apiClient(originalRequest);
      } catch (tokenRefreshError) {
        // Handle token refresh error, e.g., redirect to login
        return Promise.reject(tokenRefreshError);
      }
    }

    // If the error is not a 401 or retry fails, reject the promise
    return Promise.reject(error);
  },
);
