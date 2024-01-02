"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Mail } from "lucide-react";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignInWithEmailForm() {
  const [email, setEmail] = useState<null | string>(null);

  async function SignInWithEmail() {
    const signInResult = await signIn("email", {
      email: email,
      callbackUrl: `${window.location.origin}`,
      redirect: false,
    });

    if (!signInResult?.ok) {
      return toast("Well this did not work...", {
        description: "Something went wrong, please try again",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
    }

    return toast("Check your email", {
      description: "A magic link has been sent to you",
      action: {
        label: "Go to email",
        onClick: () => console.log("email"),
      },
    });
  }
  return (
    <form action={SignInWithEmail}>
      <div className="flex flex-col gap-y-2">
        <Label>Email</Label>
        <Input
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          type="email"
          placeholder="name@example.com"
        />
      </div>

      <Button type="submit" className="mt-4 w-full">
        {/* <Mail className="w-4 h-4 mr-2" /> */}
        Login with Email
      </Button>
    </form>
  );
}
