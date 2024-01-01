import Image from "next/image";
import prisma from "@/lib/prisma";
import { getLoggedInUser, saveActivity } from "@/lib/actions";
import { revalidatePath } from "next/cache";
import { Button } from "./ui/button";

const CommentForm = ({
  currentUserImg,
  treedId,
}: {
  currentUserImg: string;
  treedId: string;
}) => {
  const addComment = async (formData: FormData) => {
    "use server";
    const session = await getLoggedInUser();
    const user = session?.user;
    const comment = formData.get("comment") as string;
    const treedId = formData.get("treedId") as string;
    const userId = user?.email;
    if (!userId || !treedId) {
      throw new Error("Invalid credentials");
    }
    const createdComment = await prisma.comment.create({
      data: {
        comment,
        treedId,
        userId,
      },
    });
    // await saveActivity("comment", createdComment.id);
    revalidatePath(`/treed/${treedId}`);
  };

  return (
    <form
      className="mt-10 flex items-center gap-4 border-y border-y-dark-4 py-5 max-xs:flex-col"
      action={addComment}
      autoComplete="off"
    >
      <input type="hidden" name="treedId" value={treedId} />
      <div className="flex w-full items-center gap-3">
        <label>
          <Image
            src={currentUserImg}
            alt="current_user"
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
          />
        </div>
      </div>

      <Button
        type="submit"
        className="rounded-3xl bg-primary-500 px-6 py-2 !text-small-regular text-light-1 max-xs:w-full"
      >
        Reply
      </Button>
    </form>
  );
};

export default CommentForm;
