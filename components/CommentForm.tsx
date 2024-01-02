"use client";
import Image from "next/image";
import { addComment } from "@/lib/actions";
import { Button } from "./ui/button";
import { useRef } from "react";
import { useFormStatus } from "react-dom";

const CommentForm = ({
  currentUserImg,
  treedId,
}: {
  currentUserImg: string;
  treedId: string;
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const { pending } = useFormStatus();
  return (
    <form
      ref={formRef}
      className="mt-10 flex items-center gap-4 border-y border-y-dark-4 py-5 max-xs:flex-col"
      action={async (formData) => {
        await addComment(formData);
        formRef.current?.reset();
      }}
      autoComplete="off"
    >
      <input type="hidden" name="treedId" value={treedId} />
      <div className="flex w-full items-center gap-3">
        <label>
          <Image
            src={currentUserImg}
            alt="current_user_profile"
            width={48}
            height={48}
            className="rounded-full object-cover"
          />
        </label>
        <div className="border-none bg-transparent">
          <input
            type="text"
            placeholder="Comment..."
            name="comment"
            className="flex h-10 w-full px-3 py-2 text-sm focus-visible:outline-none focus-visi1ble:ring-offset-2 bg-transparent ring-offset-slate-950 placeholder:text-slate-400 focus-visible:ring-slate-800 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 text-light-1 outline-none"
            required
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={pending}
        className="rounded-3xl bg-primary hover:bg-primary/80 px-6 py-2 !text-small-regular text-light-1 max-xs:w-full"
      >
        {pending ? "Adding ..." : "Reply"}
      </Button>
    </form>
  );
};

export default CommentForm;
