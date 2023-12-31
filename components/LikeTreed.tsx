import Image from "next/image";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getLoggedInUser, saveActivity } from "@/lib/actions";

const LikeTreed = ({
  count,
  treedId,
  isLike,
}: {
  count: number;
  treedId: string;
  isLike: boolean;
}) => {
  const likeTreed = async (formData: FormData) => {
    "use server";
    const session = await getLoggedInUser();
    const userId = session?.user?.email;
    const treedId = formData.get("treedId") as string;
    if (!userId || !treedId) {
      throw new Error("Invalid credentials");
    }
    const isTweetLiked = await prisma.like.findUnique({
      where: {
        treedId_userId: {
          treedId,
          userId,
        },
      },
    });
    if (isTweetLiked) {
      await prisma.like.delete({
        where: {
          treedId_userId: {
            treedId,
            userId,
          },
        },
      });
    }
    const like = await prisma.like.create({
      data: {
        treedId,
        userId,
      },
    });
    await saveActivity("like", like.treedId);
    revalidatePath("/");
  };
  return (
    <form
      action={likeTreed}
      className="flex gap-x-1 items-center"
      autoComplete="off"
    >
      <input type="hidden" name="treedId" value={treedId} />
      <button type="submit">
        <Image
          src={isLike ? "/assets/heart-filled.svg" : "/assets/heart-gray.svg"}
          alt="heart"
          width={24}
          height={24}
          className="cursor-pointer object-contain"
        />
      </button>
      <h3 className="text-small-semibold font-light text-light-3">{count}</h3>
    </form>
  );
};
export default LikeTreed;
