"use server";

import { auth } from "@/lib/auth";
import { upFormSchema } from "@/lib/validation/signInSchema";
import { inFormSchema } from "@/lib/validation/signUpSchema";
import z from "zod";

export const signUpUser = async (data: z.infer<typeof inFormSchema>) => {
  try {
    const safeData = inFormSchema.safeParse(data);
    if (!safeData.success) {
      return {
        success: false,
        error: safeData.error.errors.map((err) => err.message).join(", "),
      };
    }

    const { first_name, last_name, email, password } = safeData.data;
    const name = `${first_name} ${last_name}`;

    await auth.api.signUpEmail({
      body: { name, email, password },
    });

    return {
      success: true,
      errors: {},
      values: { text: "Successfully signed up." },
      redirect: "/dashboard",
    };
  } catch (error) {
    console.error(error); // Optional: Log for debugging
    return {
      success: false,
      errors: {
        message: [(error as Error).message || "An unknown error occurred"],
      },
      values: {},
    };
  }
};

export const signInUser = async (data: z.infer<typeof upFormSchema>) => {
  try {
    const safeData = upFormSchema.safeParse(data);
    if (!safeData.success) {
      return {
        success: false,
        error: safeData.error.errors.map((err) => err.message).join(", "),
      };
    }

    const { email, password } = safeData.data;

    await auth.api.signInEmail({
      body: { email, password },
    });

    return {
      success: true,
      errors: {},
      values: { text: "Successfully signed in." },
      redirect: "/dashboard",
    };
  } catch (error) {
    console.error(error); // Optional: Log for debugging
    return {
      success: false,
      errors: {
        message: [(error as Error).message || "An unknown error occurred"],
      },
      values: {},
    };
  }
};
