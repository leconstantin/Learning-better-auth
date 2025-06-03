// "use client";
// import React, { useState } from "react";
// import { Button } from "../ui/button";
// import { authClient as client } from "@/lib/auth-client";
// import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
// import { toast } from "sonner";
// import { Spinner } from "../spinner";

// export default function VerifyUser() {
//   const {
//     data: session,
//     isPending, //loading state
//     error, //error object
//     refetch, //refetch the session
//   } = client.useSession();
//   const [emailVerificationPending, setEmailVerificationPending] =
//     useState<boolean>(false);
//   return (
//     <div>
//       {session?.user.emailVerified ? (
//         <p>You are verfied</p>
//       ) : (
//         <Alert>
//           <AlertTitle>Verify Your Email Address</AlertTitle>
//           <AlertDescription className="flex flex-col gap-4">
//             <p className="text-muted-foreground">
//               Please verify your email address. Check your inbox for the
//               verification email. If you haven't received the email, click the
//               button below to resend.
//             </p>

//             <Button
//               size="sm"
//               variant="secondary"
//               className="w-fit"
//               onClick={async () => {
//                 await client.sendVerificationEmail(
//                   {
//                     email: session?.user.email || "",
//                   },
//                   {
//                     onRequest(context) {
//                       setEmailVerificationPending(true);
//                     },
//                     onError(context) {
//                       toast.error(context.error.message);
//                       setEmailVerificationPending(false);
//                     },
//                     onSuccess() {
//                       toast.success("Verification email sent successfully");
//                       setEmailVerificationPending(false);
//                     },
//                   }
//                 );
//               }}
//             >
//               {emailVerificationPending ? (
//                 <Spinner text="Sending..." />
//               ) : (
//                 "Resend Verification Email"
//               )}
//             </Button>
//           </AlertDescription>
//         </Alert>
//       )}
//     </div>
//   );
// }

"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { authClient as client } from "@/lib/auth-client";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { toast } from "sonner";
import { Spinner } from "../spinner";

export default function VerifyUser() {
  const { data: session, isPending, error, refetch } = client.useSession();

  const [emailVerificationPending, setEmailVerificationPending] =
    useState(false);

  const handleResend = async () => {
    if (!session?.user.email) {
      toast.error("Email address not found.");
      return;
    }

    setEmailVerificationPending(true);

    await client.sendVerificationEmail(
      { email: session.user.email },
      {
        onSuccess() {
          toast.success("Verification email sent successfully.");
          setEmailVerificationPending(false);
        },
        onError(context) {
          toast.error(context.error.message || "Failed to send email.");
          setEmailVerificationPending(false);
        },
      }
    );
  };

  if (isPending) {
    return (
      <div className="p-4">
        <Spinner text="Loading session..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4">
        Failed to load session: {error.message}
      </div>
    );
  }

  if (session?.user.emailVerified) {
    return <p className="p-4 text-green-600">You are verified ✅</p>;
  }

  return (
    <Alert>
      <AlertTitle>Verify Your Email Address</AlertTitle>
      <AlertDescription className="flex flex-col gap-4">
        <p className="text-muted-foreground">
          Please verify your email address. Check your inbox for the
          verification email. If you haven't received it, click below to resend.
        </p>

        <Button
          size="sm"
          variant="secondary"
          className="w-fit"
          onClick={handleResend}
          disabled={emailVerificationPending}
        >
          {emailVerificationPending ? (
            <Spinner text="Sending..." />
          ) : (
            "Resend Verification Email"
          )}
        </Button>
      </AlertDescription>
    </Alert>
  );
}
