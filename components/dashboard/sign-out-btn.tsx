"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { Loader2, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignOutBtn() {
  const [isSignOut, setIsSignOut] = useState(false);
  const router = useRouter();
  return (
    <Button
      className="gap-2 z-10"
      variant="secondary"
      onClick={async () => {
        setIsSignOut(true);
        await authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
              router.push("/"); // redirect to login page
            },
          },
        });
        setIsSignOut(false);
      }}
      disabled={isSignOut}
    >
      <span className="text-sm">
        {isSignOut ? (
          <Loader2 size={15} className="animate-spin" />
        ) : (
          <div className="flex items-center gap-2">
            <LogOut size={16} />
            Sign Out
          </div>
        )}
      </span>
    </Button>
  );
}
