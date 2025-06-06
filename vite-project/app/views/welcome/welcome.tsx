import logoDark from "@/assets/imgs/logo-dark.svg";
import logoLight from "@/assets/imgs/logo-light.svg";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router";

export function Welcome() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-background to-muted/30 px-4 py-16">
            <div className="flex w-full max-w-4xl flex-col items-center gap-12">
                {/* Header with animated logo */}
                <header className="flex flex-col items-center gap-6">
                    <div className="w-[280px] transition-all duration-300 hover:scale-105 sm:w-[400px]">
                        <img
                            src={logoLight}
                            alt="React Router Auth"
                            className="block w-full dark:hidden"
                        />
                        <img
                            src={logoDark}
                            alt="React Router Auth"
                            className="hidden w-full dark:block"
                        />
                    </div>
                    <h1 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
                        Welcome to Auth System
                    </h1>
                    <p className="max-w-2xl text-center text-muted-foreground">
                        Secure authentication using React Router Framework and
                        Spring Boot with token-based authentication
                    </p>

                    {/* Auth buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full max-w-md justify-center">
                        <Button
                            asChild
                            size="lg"
                            className="w-full sm:w-auto px-8"
                            variant="default">
                            <Link to="/login">Login</Link>
                        </Button>
                        <Button
                            asChild
                            size="lg"
                            className="w-full sm:w-auto px-8"
                            variant="outline">
                            <Link to="/register">Register</Link>
                        </Button>
                    </div>
                </header>

                {/* Main content with features */}
                <div className="grid w-full max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature) => (
                        <Card
                            key={feature.title}
                            className="overflow-hidden transition-all duration-300 hover:shadow-lg">
                            <CardHeader className="pb-2">
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    {feature.icon}
                                    {feature.title}
                                </CardTitle>
                                <CardDescription>
                                    {feature.description}
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    ))}
                </div>

                {/* Technologies section */}
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle className="text-center">
                            Technologies Used
                        </CardTitle>
                        <CardDescription className="text-center">
                            Built with modern and secure technologies
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-items-center">
                            {technologies.map((tech) => (
                                <div
                                    key={tech.name}
                                    className="flex flex-col items-center gap-2">
                                    <div className="rounded-lg bg-muted/50 p-4">
                                        {tech.icon}
                                    </div>
                                    <span className="text-sm font-medium">
                                        {tech.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}

const features = [
    {
        title: "Secure Authentication",
        description:
            "Implement JWT token-based authentication with secure password handling",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-blue-500">
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
        ),
    },
    {
        title: "Token-Based Auth",
        description:
            "JWT tokens provide stateless and secure user authentication across services",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-indigo-500">
                <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
                <path d="M8.5 8.5v.01" />
                <path d="M16 15.5v.01" />
                <path d="M12 12v.01" />
                <path d="M11 17v.01" />
                <path d="M7 14v.01" />
            </svg>
        ),
    },
    {
        title: "Role-Based Access",
        description:
            "Control user permissions with granular role-based access control",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-emerald-500">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        ),
    },
];

const technologies = [
    {
        name: "React Router",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-blue-600">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 12h8" />
                <path d="M12 8v8" />
            </svg>
        ),
    },
    {
        name: "Spring Boot",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-green-600">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
            </svg>
        ),
    },
    {
        name: "JWT Auth",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-amber-600">
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                <path d="M9 3v18" />
                <path d="M9 15h6" />
                <path d="M9 11h3" />
                <path d="M9 7h6" />
            </svg>
        ),
    },
    {
        name: "REST API",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-purple-600">
                <path d="M18 18V6H7" />
                <path d="M18 12H2" />
                <path d="M7 18h11" />
                <path d="M7 6v12" />
                <circle cx="18" cy="18" r="3" />
                <circle cx="7" cy="18" r="3" />
                <circle cx="7" cy="6" r="3" />
            </svg>
        ),
    },
];
