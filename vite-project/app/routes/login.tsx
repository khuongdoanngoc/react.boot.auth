import type { Route } from "./+types/home";
import { Login } from "@/views/login";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Login React Router App" },
        { name: "description", content: "Login to React Router App" },
    ];
}

export default function LoginPage() {
    return <Login />;
}
