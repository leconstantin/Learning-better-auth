"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { Loader2, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const [isSignOut, setIsSignOut] = useState(false);
  const router = useRouter();

  return (
    <div className="p-10 container">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <br />
      <div className="gap-2 justify-between items-center">
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
      </div>
    </div>
  );
}
