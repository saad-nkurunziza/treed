import { formatDate } from "@/lib/utils";
import Image from "next/image";
import { FC } from "react";
import Link from "next/link";
import { getLoggedInUser } from "@/lib/actions";
import LikeTreed from "./LikeTreed";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import prisma from "@/lib/prisma";

interface Props {
  id: string;
  content: string;
  name: string;
  email: string;
  username: string;
  image: string;
  likes: number;
  createdAt: Date;
  comments?: any[];
}

const checkIsLiked = async (treedId: string): Promise<boolean> => {
  const session = await getLoggedInUser();
  const userId = session?.user?.email;
  if (!userId || !treedId) {
    throw new Error("Error with credentials");
  }
  const treed = await prisma.like.findUnique({
    where: {
      treedId_userId: {
        treedId,
        userId,
      },
    },
  });
  if (!treed) return false;
  return true;
};

const TreedCard: FC<Props> = async ({
  id,
  content,
  name,
  username,
  email,
  likes,
  image,
  comments = [],
  createdAt,
}) => {
  const formattedDate = formatDate(createdAt);
  const isLiked = await checkIsLiked(id);
  const firstLetter = name.charAt(0).toUpperCase();
  return (
    <article className="flex flex-col w-full rounded-xl bg-dark-2 p-7">
      <div className="flex items-start justify-between">
        <div className="flex flex-row flex-1 w-full gap-4">
          <div className="flex flex-col items-center">
            <Link href={`/profile/${email}`}>
              <Avatar className="relative h-11 w-11">
                <AvatarImage src={image} />
                <AvatarFallback>{firstLetter}</AvatarFallback>
              </Avatar>
            </Link>

            <div className="relative mt-2 w-0.5 grow rounded-full bg-neutral-800" />
          </div>

          <div className="flex flex-col w-full">
            <div className="flex items-center gap-x-4">
              <Link href={`/profile/${email}`} className="w-fit">
                <h4 className="cursor-pointer text-base-semibold text-light-1">
                  {name}
                </h4>
              </Link>
              <p className="text-tiny-medium text-muted-foreground">
                {formattedDate}
              </p>
            </div>
            <p className="mt-2 text-small-regular text-light-2">{content}</p>

            <div className="flex flex-col gap-3 mt-5 ">
              <div className="flex gap-4">
                <LikeTreed count={likes} treedId={id} isLiked={isLiked} />
                <Image
                  src="/assets/repost.svg"
                  alt="heart"
                  width={24}
                  height={24}
                  className="object-contain cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* <DeleteTreed /> */}
      </div>

      {comments.length > 0 && (
        <div className="flex items-center gap-2 mt-3 ml-1">
          <div className="flex items-center gap-2 mt-3 ml-1">
            {comments.slice(0, 3).map((comment: any, index: number) => {
              return (
                <Avatar
                  className={`${index !== 0 && "-ml-5"} relative h-6 w-6`}
                  key={comment.id}
                >
                  <AvatarImage src={comment.user?.image} />
                  <AvatarFallback>
                    {comment.user?.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              );
            })}

            <Link href={`/treed/${id}`}>
              <p className="mt-1 text-subtle-medium text-gray-1">
                {comments.length} comment{comments.length > 1 ? "s" : ""}
              </p>
            </Link>
          </div>
        </div>
      )}
      {comments.length === 0 && (
        <div className="">
          <div className="flex items-center gap-2 mt-3 ml-3">
            <Link href={`/treed/${id}`}>
              <p className="mt-1 text-subtle-medium text-gray-1">Reply</p>
            </Link>
          </div>
        </div>
      )}
    </article>
  );
};

export default TreedCard;
