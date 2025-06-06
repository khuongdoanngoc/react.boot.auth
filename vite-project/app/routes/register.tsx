import type { Route } from "./+types/home";
import { Register } from "@/views/register";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Register React Router App" },
        { name: "description", content: "Register to React Router App" },
    ];
}

export default function RegisterPage() {
    return <Register />;
}
