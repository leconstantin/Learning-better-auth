"use client";
import { authClient } from "@/lib/auth-client";
import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Spinner } from "../spinner";

export default function SignOutBtn() {
  const [isSignOut, setIsSignOut] = useState(false);
  const router = useRouter();

  const handleSignOut = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent dropdown from closing

    setIsSignOut(true);
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
      },
    });
    setIsSignOut(false);
  };

  return (
    <button
      onClick={handleSignOut}
      disabled={isSignOut}
      className={`w-full text-left flex items-center gap-2 px-2 py-1.5 rounded-md transition 
        ${isSignOut ? "opacity-50 cursor-not-allowed" : "hover:bg-muted"}`}
    >
      {isSignOut ? (
        <Spinner text="Signing out..." />
      ) : (
        <>
          <LogOutIcon className="w-4 h-4" />
          <span className="text-sm">Log out</span>
        </>
      )}
    </button>
  );
}
