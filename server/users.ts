"use server";

import { auth } from "@/lib/auth";
import { upFormSchema } from "@/lib/validation/signInSchema";
import { inFormSchema } from "@/lib/validation/signUpSchema";
import z from "zod";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export const getUserSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const listSession = await auth.api.listSessions({
    headers: await headers(),
  });
  if (!session?.user?.id) {
    redirect("/sign-in");
  }

  const currentUser = await prisma.user.findFirst({
    where: {
      id: session.user.id,
    },
  });

  if (!currentUser) {
    redirect("/login");
  }

  return {
    ...session,
    ...listSession,
    user: currentUser,
  };
};

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
        errors: safeData.error.errors.map((err) => err.message),
        values: {},
      };
    }

    const { email, password } = safeData.data;

    const signInResponse = await auth.api.signInEmail({
      body: { email, password },
    });

    if (!signInResponse?.token || !signInResponse?.user) {
      return {
        success: false,
        errors: ["Invalid email or password."],
        values: {},
      };
    }

    return {
      success: true,
      errors: [],
      values: { text: "Successfully signed in." },
      redirect: "/dashboard",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      errors: [(error as Error).message || "An unknown error occurred"],
      values: {},
    };
  }
};
