"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <div
      className="flex cursor-pointer gap-4 p-4"
      onClick={() =>
        signOut({
          callbackUrl: `${window.location.origin}/auth`,
        })
      }
    >
      <p className="text-red-500 hidden md:block max-lg:hidden">Logout</p>
    </div>
  );
}
