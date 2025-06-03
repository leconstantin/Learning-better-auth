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
import {
  forgotPasswordSchema,
  TforgotPasswordSchema,
} from "@/lib/validation/passwordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function ForgotForm() {
  const form = useForm<TforgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values: TforgotPasswordSchema) => {
    console.log(values);
  };

  return (
    <section className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Forgot password</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email to reset your password
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
                Sending...
              </span>
            ) : (
              "Send reset link"
            )}
          </Button>
        </form>
      </Form>

      <div className="text-center text-sm mt-6">
        Back to{" "}
        <Link href="/sign-in" className="underline underline-offset-4">
          Sign in
        </Link>
      </div>
    </section>
  );
}
