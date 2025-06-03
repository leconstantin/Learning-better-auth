"use client";

import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PasswordInput } from "@/components/ui/password-input";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Info } from "lucide-react";

import {
  resetPasswordSchema,
  TresetPasswordSchema,
} from "@/lib/validation/passwordSchema";
import { Spinner } from "./spinner";

export default function ResetPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const form = useForm<TresetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      new_password: "",
      confirm_password: "",
    },
  });

  const calculatePasswordStrength = useCallback((password: string) => {
    let strength = 0;
    if (password.length >= 6) strength += 20;
    if (password.length >= 12) strength += 10;
    if (/[A-Z]/.test(password)) strength += 20;
    if (/[a-z]/.test(password)) strength += 20;
    if (/\d/.test(password)) strength += 15;
    if (/[!@#$%^&*]/.test(password)) strength += 15;

    return Math.min(strength, 100);
  }, []);

  const getStrengthBarColor = (strength: number): string => {
    if (strength >= 85) return "bg-green-500";
    if (strength >= 60) return "bg-yellow-500";
    if (strength > 0) return "bg-red-500";
    return "bg-gray-300";
  };

  const handleSubmit = async (values: TresetPasswordSchema) => {
    setIsLoading(true);
    try {
      // TODO: Call API here
      console.log(values);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex flex-col gap-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Reset Password</h1>
        <p className="text-sm text-muted-foreground">
          Enter a new password and confirm it to reset your account.
        </p>
      </header>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="grid gap-6">
          <FormField
            control={form.control}
            name="new_password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <FormLabel>Password</FormLabel>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-muted-foreground cursor-pointer" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-sm max-w-xs">
                        At least 6 characters, including uppercase, lowercase, a
                        number, and a special character.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <FormControl>
                  <PasswordInput
                    placeholder="New password"
                    className="rounded-none"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(e);
                      setPasswordStrength(calculatePasswordStrength(value));
                    }}
                  />
                </FormControl>
                <Progress
                  value={passwordStrength}
                  className={`mt-2 h-1 ${getStrengthBarColor(
                    passwordStrength
                  )}`}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirm_password"
            render={({ field }) => (
              <FormItem className="grid gap-3">
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder="Confirm password"
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
            {isLoading ? <Spinner text="Resetting..." /> : "Reset Password"}
          </Button>
        </form>
      </Form>
    </section>
  );
}
