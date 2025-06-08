import axios, { AxiosError, type AxiosRequestConfig } from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Token management
const tokenManager = {
    getAccessToken: () => localStorage.getItem("accessToken"),
    getRefreshToken: () => localStorage.getItem("refreshToken"),
    setTokens: (accessToken: string, refreshToken: string) => {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
    },
    clearTokens: () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
    },
};

apiClient.interceptors.request.use((config) => {
    const token = tokenManager.getAccessToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

apiClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        if (error.response?.status === 401) {
            try {
                const refreshToken = tokenManager.getRefreshToken();
                if (refreshToken) {
                    const response = await apiClient.post("/auth/refresh", {
                        refreshToken,
                    });
                    const { accessToken } = response.data.data;
                    tokenManager.setTokens(accessToken, refreshToken);
                    return apiClient(error.config as AxiosRequestConfig);
                }
            } catch (error) {
                tokenManager.clearTokens();
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);
