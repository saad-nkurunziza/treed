"use client";
import { useState, useRef } from "react";
import { createTreed } from "@/lib/actions";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { useFormState, useFormStatus } from "react-dom";

const CreateTreedForm = () => {
  const [content, setContent] = useState("");
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };
  const [state, formAction] = useFormState(createTreed, null);
  const formRef = useRef<HTMLFormElement>(null);
  const { pending } = useFormStatus();
  return (
    <form
      className="flex flex-col justify-start gap-10 mt-10"
      action={async (formData) => {
        formAction(formData);
        formRef.current?.reset();
      }}
      autoComplete="off"
    >
      <div className="flex flex-col w-full gap-3">
        <Label className="text-base-semibold text-light-2">Content</Label>
        <div className="border rounded-md focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 border-dark-4 bg-dark-3 text-light-1">
          <Textarea
            rows={10}
            className="flex min-h-[80px] w-full rounded-md border bg-transparent px-3 py-2 text-sm  outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-2  focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-slate-800 ring-offset-slate-950 placeholder:text-slate-400 focus-visible:ring-slate-800 "
            name="content"
            value={content}
            onChange={handleContentChange}
            required
          />
        </div>
        <span className={`${content.length > 280 ? "text-red-500" : "text-gray-1"} text-small-medium`}>
          {content.length} / 280 characters
        </span>
      </div>

      <Button type="submit" disabled={pending} className="py-3 focus:outline-1">
        {pending ? "Posting ..." : " Post Treed"}
      </Button>
      <div className="text-red-500">{state}</div>
    </form>
  );
};

export default CreateTreedForm;
