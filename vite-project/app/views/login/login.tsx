import { useState } from "react";
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
import { LockKeyhole, Mail, LogIn } from "lucide-react";
import { useLogin } from "./hooks";
const formSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(1, { message: "Password is required" }),
});

export function Login() {
    const { login, isLoading, error } = useLogin();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        login(values.email, values.password);
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-background to-muted/50">
            <div className="w-full max-w-md">
                <div className="absolute top-8 left-8 text-2xl font-bold text-primary">
                    <LogIn className="h-8 w-8 inline-block mr-2" />
                    MyApp
                </div>

                <Card className="border-muted/20 shadow-lg">
                    <CardHeader className="space-y-1">
                        <div className="flex justify-center mb-2">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                <LockKeyhole className="h-6 w-6 text-primary" />
                            </div>
                        </div>
                        <CardTitle className="text-2xl font-bold text-center">
                            Welcome back
                        </CardTitle>
                        <CardDescription className="text-center">
                            Enter your credentials to sign in to your account
                        </CardDescription>
                    </CardHeader>
                    {error && (
                        <div className="text-center text-red-500">{error}</div>
                    )}
                    <CardContent>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-4">
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
                                                    placeholder="Enter your password"
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
                                            ? "Signing in..."
                                            : "Sign in"}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </CardContent>

                    <CardFooter className="flex flex-col space-y-2 border-t pt-4">
                        <div className="text-center text-sm">
                            Don't have an account?{" "}
                            <a
                                href="/register"
                                className="underline text-primary hover:text-primary/80 transition-colors font-medium">
                                Create an account
                            </a>
                        </div>
                        <div className="text-center text-xs text-muted-foreground">
                            By signing in, you agree to our Terms of Service and
                            Privacy Policy
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
