"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Info } from "lucide-react";
import Link from "next/link";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

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
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { inFormSchema, TInFormSchema } from "@/lib/validation/signUpSchema";
import { signUpUser } from "@/server/users";
import { useRouter } from "next/navigation";
import { PasswordInput } from "./ui/password-input";

export default function SignUpForm() {
  const router = useRouter();

  const form = useForm<TInFormSchema>({
    resolver: zodResolver(inFormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const computeStrength = useCallback((password: string) => {
    let strength = 0;
    if (password.length >= 6) strength += 20;
    if (password.length >= 12) strength += 10;
    if (/[A-Z]/.test(password)) strength += 20;
    if (/[a-z]/.test(password)) strength += 20;
    if (/\d/.test(password)) strength += 15;
    if (/[!@#$%^&*]/.test(password)) strength += 15;
    return Math.min(strength, 100);
  }, []);

  const getStrengthColor = (strength: number) => {
    if (strength >= 85) return "bg-green-500";
    if (strength >= 60) return "bg-yellow-500";
    if (strength > 0) return "bg-red-500";
    return "bg-gray-300";
  };

  const onSubmit = async (values: TInFormSchema) => {
    setIsLoading(true);
    try {
      const signUpResult = await signUpUser(values);

      if (signUpResult?.redirect) {
        router.push(signUpResult.redirect);
        toast.success("Account created successfully!");
      }
    } catch (error) {
      toast.error("An error occurred during sign up.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Sign Up to your account</h1>
        <p className="text-muted-foreground text-sm">
          Enter your information to create an account
        </p>
      </div>

      <TooltipProvider>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-6">
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Max"
                          className="rounded-none"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-6">
                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Robison"
                          className="rounded-none"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="m@example.com"
                      type="email"
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-2">
                    <FormLabel>Password</FormLabel>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-muted-foreground cursor-pointer" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs text-sm">
                          Must be at least 6 characters, with uppercase,
                          lowercase, number, and special character.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <FormControl>
                    <PasswordInput
                      placeholder="Password"
                      className="rounded-none"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        setPasswordStrength(computeStrength(e.target.value));
                      }}
                    />
                  </FormControl>
                  <Progress
                    value={passwordStrength}
                    className={`mt-2 h-1 ${getStrengthColor(passwordStrength)}`}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirm_password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-2">
                    <FormLabel>Confirm Password</FormLabel>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-muted-foreground cursor-pointer" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs text-sm">
                          Must match the password entered above.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
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
            <Button type="submit" className="rounded-none" disabled={isLoading}>
              {isLoading ? (
                <>
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
                  Signing Up...
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
        </Form>
      </TooltipProvider>

      <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
        <span className="bg-background text-muted-foreground relative z-10 px-2">
          Or continue with
        </span>
      </div>

      <Button
        variant="outline"
        className="w-full rounded-none"
        aria-label="Sign in with GitHub"
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
        Continue with Google
      </Button>

      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link href="/sign-in" className="underline underline-offset-4">
          Sign In
        </Link>
      </div>
    </section>
  );
}
