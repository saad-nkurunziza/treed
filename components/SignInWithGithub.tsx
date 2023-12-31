"use client";

import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { signIn } from "next-auth/react";

export default function SigninWithGithub() {
  return (
    <Button
      onClick={() =>
        signIn("github", {
          callbackUrl: `${window.location.origin}`,
        })
      }
      className=""
      variant="secondary"
    >
       <Github className="w-4 h-4 mr-2" />Login with Github
    </Button>
  );
}
