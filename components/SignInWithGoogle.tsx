"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function SigninWithGoogle() {
  return (
    <Button
      onClick={() =>
        signIn("google", {
          callbackUrl: `${window.location.origin}`,
        })
      }
    >
      <Image
        src={"/google.svg"}
        alt="Google"
        width={16}
        height={16}
        className="mr-2"
      />
      Continue with Google
    </Button>
  );
}
