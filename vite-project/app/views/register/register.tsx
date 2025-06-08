import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { LockKeyhole, Mail, User, UserPlus } from "lucide-react";
import { useRegister } from "./hooks";
import { Link } from "react-router";
import { useEffect, useRef } from "react";

const formSchema = z
    .object({
        email: z.string().email({ message: "Invalid email address" }),
        name: z
            .string()
            .min(2, { message: "Name must be at least 2 characters" }),
        password: z
            .string()
            .min(8, { message: "Password must be at least 8 characters" }),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export function Register() {
    const { register, isLoading, error } = useRegister();
    const emailInputRef = useRef<HTMLInputElement>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            name: "",
            password: "",
            confirmPassword: "",
        },
    });

    // Focus vào trường email khi có lỗi "User already exists"
    useEffect(() => {
        if (error === "User already exists" && emailInputRef.current) {
            emailInputRef.current.focus();
        }
    }, [error]);

    function onSubmit(values: z.infer<typeof formSchema>) {
        register(values.email, values.password, values.name, "USER");
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-background to-muted/50">
            <div className="w-full max-w-md">
                <div className="absolute top-8 left-8 text-2xl font-bold text-primary">
                    <UserPlus className="h-8 w-8 inline-block mr-2" />
                    MyApp
                </div>

                <Card className="border-muted/20 shadow-lg">
                    <CardHeader className="space-y-1">
                        <div className="flex justify-center mb-2">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                <UserPlus className="h-6 w-6 text-primary" />
                            </div>
                        </div>
                        <CardTitle className="text-2xl font-bold text-center">
                            Create an account
                        </CardTitle>
                        {error && error !== "User already exists" ? (
                            <div className="text-center text-red-500">
                                {error}
                            </div>
                        ) : (
                            <CardDescription className="text-center">
                                Enter your information to create a new account
                            </CardDescription>
                        )}
                    </CardHeader>

                    <CardContent>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-2">
                                                <User className="h-4 w-4" />
                                                Name
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter your name"
                                                    className="border-input/60 focus:border-primary transition-colors"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-2">
                                                <Mail className="h-4 w-4" />
                                                Email
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="email"
                                                    placeholder="Enter your email"
                                                    className={`border-input/60 focus:border-primary transition-colors ${
                                                        error ===
                                                        "User already exists"
                                                            ? "border-red-500 focus:border-red-500"
                                                            : ""
                                                    }`}
                                                    {...field}
                                                />
                                            </FormControl>
                                            {error ===
                                                "User already exists" && (
                                                <FormMessage>
                                                    User already exists
                                                </FormMessage>
                                            )}
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-2">
                                                <LockKeyhole className="h-4 w-4" />
                                                Password
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    placeholder="Create a password"
                                                    className="border-input/60 focus:border-primary transition-colors"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-2">
                                                <LockKeyhole className="h-4 w-4" />
                                                Confirm Password
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    placeholder="Confirm your password"
                                                    className="border-input/60 focus:border-primary transition-colors"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="pt-2">
                                    <Button
                                        type="submit"
                                        className="w-full transition-all font-medium"
                                        disabled={isLoading}>
                                        {isLoading
                                            ? "Creating account..."
                                            : "Create account"}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </CardContent>

                    <CardFooter className="flex flex-col space-y-2 border-t pt-4">
                        <div className="text-center text-sm">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="underline text-primary hover:text-primary/80 transition-colors font-medium">
                                Sign in
                            </Link>
                        </div>
                        <div className="text-center text-xs text-muted-foreground">
                            By creating an account, you agree to our Terms of
                            Service and Privacy Policy
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
