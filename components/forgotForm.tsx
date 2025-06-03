"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  forgotPasswordSchema,
  TforgotPasswordSchema,
} from "@/lib/validation/passwordSchema";

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
import { Spinner } from "./spinner";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export default function ForgotForm() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<TforgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = async (values: TforgotPasswordSchema) => {
    try {
      setIsLoading(true);
      await authClient.forgetPassword({
        email: values.email,
        redirectTo: "/reset-password",
      });
      toast("A reset password link has been sent to your email.");
    } catch (error) {
      toast("An error occurred while sending the reset password link.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex flex-col gap-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Forgot Password</h1>
        <p className="text-sm text-muted-foreground">
          Enter your email address to receive a password reset link.
        </p>
      </header>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="grid gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="grid gap-3">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="you@example.com"
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
            {isLoading ? <Spinner text="Sending..." /> : "Send Reset Link"}
          </Button>
        </form>
      </Form>

      <p className="text-center text-sm mt-6">
        Back to{" "}
        <Link href="/sign-in" className="underline underline-offset-4">
          Sign in
        </Link>
      </p>
    </section>
  );
}
