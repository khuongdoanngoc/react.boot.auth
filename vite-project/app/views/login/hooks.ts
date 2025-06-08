import { authEndpoints } from "@/lib/api/endpoints/auth";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";

export function useLogin() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await authEndpoints.login({ email, password });
            if (response.success) {
                setIsLoading(false);
                setError(null);
                const { accessToken, refreshToken } = response.data;
                localStorage.setItem("accessToken", accessToken);
                localStorage.setItem("refreshToken", refreshToken);
                toast.success(response.message || "Login successful");
                navigate("/");
            } else {
                setIsLoading(false);
                setError(response.message);
            }
        } catch (error: any) {
            setIsLoading(false);
            toast.error(
                error.response?.data.message || "An unknown error occurred"
            );
            setError(
                error.response?.data.message || "An unknown error occurred"
            );
        }
    };

    return { login, isLoading, error };
}
