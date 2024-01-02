"use client";
import React, { useState, useEffect } from "react";
import { signOut } from "next-auth/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getLoggedInUser } from "@/lib/actions";
import Link from "next/link";
import { Session } from "next-auth";

const Menu = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const userSession = await getLoggedInUser();
      setSession(userSession);
    };

    fetchData();
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex gap-x-2 item-center">
          <Avatar className="relative h-9 w-9 object-cover">
            <AvatarImage src={session?.user?.image as string} />
            <AvatarFallback>
              {session?.user?.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="max-lg:hidden flex  text-xs justify-start text-muted-foreground/60 flex-col gap-y-1">
            <h3 className="text-base-semibold self-start">
              {session?.user?.name}
            </h3>
            <h5 className="text-subtle-medium">{session?.user?.email}</h5>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-dark-1">
        <div className="w-[12rem]">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/profile">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/profile">Edit Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className=""
            onClick={() =>
              signOut({
                callbackUrl: `${window.location.origin}/auth`,
              })
            }
          >
            <p className="text-red-500 hover:text-red-400">Logout</p>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Menu;
