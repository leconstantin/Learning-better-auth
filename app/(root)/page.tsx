import { SignInButton, SignInFallback } from "@/components/sign-in-btn";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="p-10 container">
      <div className="py-10 md:py-20 flex gap-6 items-center justify-center">
        <Suspense fallback={<SignInFallback />}>
          <SignInButton />
        </Suspense>
        <Button>
          <Link href={"/dashboard"}>Dashboard</Link>
        </Button>
      </div>
    </div>
  );
}
