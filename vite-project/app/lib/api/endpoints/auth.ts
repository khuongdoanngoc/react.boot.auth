import type { ApiResponse } from "@/lib/types/apiResponse";
import { apiClient } from "../client";

interface RegisterRequest {
    email: string;
    fullName: string;
    role: string;
    password: string;
}

interface RegisterResponse extends ApiResponse<null> {
    data: null;
}

interface LoginRequest {
    email: string;
    password: string;
}

interface LoginResponse
    extends ApiResponse<{
        accessToken: string;
        refreshToken: string;
    }> {
    data: {
        accessToken: string;
        refreshToken: string;
    };
}

interface RefreshRequest {
    refreshToken: string;
}

interface RefreshResponse
    extends ApiResponse<{
        accessToken: string;
        refreshToken: string;
    }> {
    data: {
        accessToken: string;
        refreshToken: string;
    };
}

export const authEndpoints = {
    register: async (data: RegisterRequest): Promise<RegisterResponse> => {
        const response = await apiClient.post("/auth/register", data);
        return response.data;
    },
    login: async (data: LoginRequest): Promise<LoginResponse> => {
        const response = await apiClient.post("/auth/login", data);
        return response.data;
    },
    refresh: async (data: RefreshRequest): Promise<RefreshResponse> => {
        const response = await apiClient.post("/auth/refresh", data);
        return response.data;
    },
};
