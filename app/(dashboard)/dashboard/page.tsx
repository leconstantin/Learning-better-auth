import SignOutBtn from "@/components/dashboard/sign-out-btn";
import Usercard from "@/components/dashboard/usercard";
import { getUserSession } from "@/server/users";

export default async function Page() {
  const user = await getUserSession();
  if (!user) {
    return <div>Not authenticated</div>;
  }
  return (
    <div className="container">
      <div className="py-10 md:py-20 flex flex-col gap-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        {user.user.name}
        <Usercard />
        <div>
          <SignOutBtn />
        </div>
      </div>
    </div>
  );
}
