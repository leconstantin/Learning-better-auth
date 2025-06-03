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
import {
  resetPasswordSchema,
  TresetPasswordSchema,
} from "@/lib/validation/passwordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { PasswordInput } from "./ui/password-input";

export default function ResetPasswordForm() {
  const form = useForm<TresetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      new_password: "",
      confirm_password: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values: TresetPasswordSchema) => {
    console.log(values);
  };

  return (
    <section className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Reset password</h1>
        <p className="text-muted-foreground text-sm">
          Enter new password and confirm it to reset your password
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
          <FormField
            control={form.control}
            name="new_password"
            render={({ field }) => (
              <FormItem className="grid gap-3">
                <FormLabel>New password</FormLabel>
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
          <FormField
            control={form.control}
            name="confirm_password"
            render={({ field }) => (
              <FormItem className="grid gap-3">
                <FormLabel>Confirm password</FormLabel>
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
                Resetting...
              </span>
            ) : (
              "Reset password"
            )}
          </Button>
        </form>
      </Form>
    </section>
  );
}
