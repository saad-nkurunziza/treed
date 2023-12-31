"use client";

import { Button } from "@/components/ui/button";
// import { Google } from "lucide-react";
import { signIn } from "next-auth/react";

export default function SigninWithGoogle() {
  return (
    <Button
      onClick={() =>
        signIn("google", {
          callbackUrl: `${window.location.origin}`,
        })
      }
      className=""
      variant="secondary"
    >
       {/*<Google className="w-4 h-4 mr-2" />*/}
       Login with Google
    </Button>
  );
}