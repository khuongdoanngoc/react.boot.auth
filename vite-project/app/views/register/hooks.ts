import { authEndpoints } from "@/lib/api/endpoints/auth";
import type { AxiosError } from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
export function useRegister() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const register = async (
        email: string,
        password: string,
        fullName: string,
        role: string
    ) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await authEndpoints.register({
                email,
                password,
                fullName,
                role,
            });
            if (response.success) {
                setIsLoading(false);
                setError(null);
                toast.success(
                    response.message || "Account created successfully"
                );
                navigate("/login");
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

    return { register, isLoading, error };
}
