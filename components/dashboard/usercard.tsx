// "use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getUserSession } from "@/server/users";
import {
  BellDotIcon,
  CircleUserIcon,
  CreditCardIcon,
  EllipsisVerticalIcon,
} from "lucide-react";
import SignOutBtn from "./sign-out-btn";

export async function Usercard() {
  const userData = await getUserSession();
  return (
    <div className="flex items-center gap-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center gap-6 cursor-pointer">
            <Avatar className="h-8 w-8 rounded-full">
              <AvatarImage
                src={userData.user.image || undefined}
                alt={userData.user.name}
              />
              <AvatarFallback className="rounded-full">
                {userData.user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{userData.user.name}</span>
              <span className="text-muted-foreground truncate text-xs">
                {userData.user.email || "No email provided"}
              </span>
            </div>
            <EllipsisVerticalIcon className="ml-auto size-4" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
          align="end"
          sideOffset={4}
        >
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar className="h-8 w-8 rounded-full">
                <AvatarImage
                  src={userData.user.image || undefined}
                  alt={userData.user.name}
                />
                <AvatarFallback className="rounded-lg">
                  {userData.user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {userData.user.name}
                </span>
                <span className="text-muted-foreground truncate text-xs">
                  {userData.user.email || "No email provided"}
                </span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <CircleUserIcon />
              Account
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CreditCardIcon />
              Billing
            </DropdownMenuItem>
            <DropdownMenuItem>
              <BellDotIcon />
              Notifications
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignOutBtn />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
