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
import { LogOutIcon } from "lucide-react";

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
          <Avatar className="relative object-cover h-9 w-9">
            <AvatarImage src={session?.user?.image as string} />
            <AvatarFallback>
              {session?.user?.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col justify-start text-xs max-lg:hidden text-muted-foreground/60 gap-y-1">
            <h3 className="self-start text-base-semibold">
              {session?.user?.name}
            </h3>
            <h5 className="text-subtle-medium">{session?.user?.email}</h5>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-dark-1">
        <div className="w-[10rem] md:w-[12rem]">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/profile">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/profile/edit">Edit Profile</Link>
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
            {/* <LogOutIcon className="w-4 h-4 mr-2" /> */}
            <p className="text-red-500 hover:text-red-400">Logout</p>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Menu;
