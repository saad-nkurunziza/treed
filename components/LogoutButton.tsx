"use client";

import { signOut } from "next-auth/react";
import Image from "next/image";

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
      <Image src="/assets/logout.svg" alt="logout" width={24} height={24} />

      <p className="text-light-2 hidden md:block max-lg:hidden">Logout</p>
    </div>
  );
}
