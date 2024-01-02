"use client";

import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function SigninWithGithub() {
  return (
    <Button
      onClick={() =>
        signIn("github", {
          callbackUrl: `${window.location.origin}`,
        })
      }
      className=""
      variant="ghost"
    >
      <Image
        src={"/github.svg"}
        alt="Github"
        width={16}
        height={16}
        className="mr-2"
      />
      Continue with Github
    </Button>
  );
}
