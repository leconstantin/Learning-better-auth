"use client";
import { authClient } from "@/lib/auth-client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function Usercard() {
  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch, //refetch the session
  } = authClient.useSession();
  return (
    <div className="flex items-center gap-4">
      <Avatar className="hidden h-9 w-9 sm:flex ">
        <AvatarImage
          src={session?.user.image || undefined}
          alt="Avatar"
          className="object-cover"
        />
        <AvatarFallback>{session?.user.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="grid">
        <div className="flex items-center gap-1">
          <p className="text-sm font-medium leading-none">
            {session?.user.name}
          </p>
        </div>
        <p className="text-sm">{session?.user.email}</p>
      </div>
    </div>
  );
}
