import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="p-10 container">
      <div className="py-10 md:py-20 flex gap-6 items-center justify-center">
        <Button>
          <Link href={"/signIn"}>SignIn</Link>
        </Button>
        <Button>
          <Link href={"/signUp"}>SignUp</Link>
        </Button>
        <Button>
          <Link href={"/dashboard"}>Dashboard</Link>
        </Button>
      </div>
    </div>
  );
}
