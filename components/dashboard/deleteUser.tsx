"use client";
import { authClient } from "@/lib/auth-client";
import { Trash2Icon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Spinner } from "../spinner";

export default function DeleteAccBtn() {
  const [isDeleting, setIsDeleting] = useState(false);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const handleSignOut = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent dropdown from closing

    setIsDeleting(true);
    await authClient.deleteUser({
      callbackURL: "/goodbye",
      token: token as string,
    });
    setIsDeleting(false);
  };

  return (
    <button
      onClick={handleSignOut}
      disabled={isDeleting}
      className={`w-full text-left flex items-center gap-2 px-2 py-1.5 rounded-md transition 
        ${isDeleting ? "opacity-50 cursor-not-allowed" : "hover:bg-muted"}`}
    >
      {isDeleting ? (
        <Spinner text="Deleting account..." />
      ) : (
        <>
          <Trash2Icon className="w-4 h-4" />
          <span className="text-sm">Delete account</span>
        </>
      )}
    </button>
  );
}
