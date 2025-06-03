"use client";

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
import { TupFormSchema, upFormSchema } from "@/lib/validation/signInSchema";
import { signInUser } from "@/server/users";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { PasswordInput } from "./ui/password-input";

export default function SignInForm() {
  const router = useRouter();
  const form = useForm<TupFormSchema>({
    resolver: zodResolver(upFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values: TupFormSchema) => {
    setIsLoading(true);
    try {
      const result = await signInUser(values);

      if (result.success && result.redirect) {
        toast.success("Successfully logged in!");
        router.push(result.redirect);
      } else {
        toast.error(result.errors);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex flex-col gap-8">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Sign In to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to log in to your account.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="grid gap-3">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="m@example.com"
                    className="rounded-none"
                    type="email"
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
              <FormItem className="grid gap-3">
                <FormLabel className="flex justify-between items-center">
                  Password
                  <div className="text-right">
                    <Link
                      href="/forgot-password"
                      className="text-sm underline underline-offset-4 text-muted-foreground"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder="Password"
                    className="rounded-none"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full rounded-none"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                Logging in...
              </span>
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </Form>

      <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
        <span className="bg-background text-muted-foreground relative z-10 px-2">
          Or continue with
        </span>
      </div>

      <Button
        variant="outline"
        className="w-full rounded-none"
        aria-label="Login with GitHub"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="0.98em"
          height="1em"
          viewBox="0 0 256 262"
        >
          <path
            fill="#4285F4"
            d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
          ></path>
          <path
            fill="#34A853"
            d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
          ></path>
          <path
            fill="#FBBC05"
            d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
          ></path>
          <path
            fill="#EB4335"
            d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
          ></path>
        </svg>
        Sign in with Google
      </Button>

      <div className="text-center text-sm mt-6">
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </section>
  );
}
