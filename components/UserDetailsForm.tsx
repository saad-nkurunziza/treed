"use client";
import { updateUser } from "@/lib/actions";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { useFormStatus } from "react-dom";
import { revalidatePath } from "next/cache";

interface FormValues {
  name: string | null;
  username: string | null;
  bio: string | null;
  // image: string | null;
}

const UserDetailsForm = ({ user }: { user: FormValues }) => {
  const inputs = [
    {
      id: "name",
      label: "Name",
      type: "text",
      value: user.name,
    },
    {
      id: "username",
      label: "Username",
      type: "text",
      value: user.username,
    },
  ];

  // const { data: session, update } = useSession();

  async function handleSubmit(formData: FormData) {
    const { name, username, bio } = Object.fromEntries(formData.entries());
    // const email = session?.user?.email;

    if (!name || !username) return;

    // Server action
    await updateUser(formData);

    // await update({ name });
    toast("User update", {
      description: "Profile updated",
    });
    
    redirect("/profile");
  }

  // const [preview, setPreview] = useState(`/images/${user.image}`);
  // const [file, setFile] = useState<File | null>(null);
  // const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files && e.target.files[0];
  //   setPreview(URL.createObjectURL(file!));
  //   setFile(file);
  //   alert(preview);
  // };

  return (
    <form action={handleSubmit} autoComplete="off">
      <div className="flex flex-col justify-start gap-8">
        {inputs.map((input) => (
          <div key={input.id} className="flex flex-col gap-y-2">
            <Label className="text-white">{input.label}</Label>
            <Input
              id={input.id}
              defaultValue={input.value as string}
              name={input.id}
              type={input.type}
              className="flex min-h-[40px] w-full rounded-md  px-3 py-2.5 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium  focus-visible:outline-none  focus-visi1ble:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ring-offset-slate-950 placeholder:text-slate-400 focus-visible:ring-slate-800 border border-dark-4 bg-dark-3 text-light-1 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
            />
          </div>
        ))}
        <div className="flex flex-col gap-y-2">
          <Label className="text-white">Bio</Label>
          <Textarea
            id="bio"
            name="bio"
            defaultValue={user.bio as string}
            className="flex min-h-[40px] w-full rounded-md  px-3 py-2.5 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium  focus-visible:outline-none  focus-visi1ble:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ring-offset-slate-950 placeholder:text-slate-400 focus-visible:ring-slate-800 border border-dark-4 bg-dark-3 text-light-1 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
          />
        </div>

        <SubmitButton />
      </div>
    </form>
  );
};

export default UserDetailsForm;
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="py-5 focus:outline-1">
      {pending ? "Editing ..." : " Edit"}
    </Button>
  );
}
