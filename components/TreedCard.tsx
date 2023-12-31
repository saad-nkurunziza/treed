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
  comments?: any;
}

const checkIsLiked = async (treedId: string) => {
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
  comments,
  createdAt,
}) => {
  const formattedDate = formatDate(createdAt);
  const isLiked = await checkIsLiked(id);
  const firstLetter = name.charAt(0).toUpperCase();
  return (
    <article className="flex w-full flex-col rounded-xl bg-dark-2 p-7">
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link href={`/profile/${email}`}>
              <Avatar className="relative h-11 w-11">
                <AvatarImage src={image} />
                <AvatarFallback>{firstLetter}</AvatarFallback>
              </Avatar>
            </Link>

            <div className="relative mt-2 w-0.5 grow rounded-full bg-neutral-800" />
          </div>

          <div className="flex w-full flex-col">
            <div className="flex items-center gap-x-4">
              <Link href={`/profile/${email}`} className="w-fit">
                <h4 className="cursor-pointer text-base-semibold text-light-1">
                  {name}
                </h4>
              </Link>
              <p className="text-tiny-medium text-light-2">{formattedDate}</p>
            </div>
            <p className="mt-2 text-small-regular text-light-2">{content}</p>

            <div className=" mt-5 flex flex-col gap-3">
              <div className="flex gap-4">
                <LikeTreed count={likes} treedId={id} isLike={isLiked} />
                <Image
                  src="/assets/repost.svg"
                  alt="heart"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* <DeleteTreed /> */}
      </div>

      {comments.length > 0 ? (
        <div className="ml-1 mt-3 flex items-center gap-2">
          {comments.slice(0, 3).map((comment: any, index: number) => (
            <Image
              key={index}
              src={`/images/${comment.User.image}`}
              alt={`user_${index}`}
              width={24}
              height={24}
              className={`${index !== 0 && "-ml-5"} rounded-full object-cover`}
            />
          ))}

          <Link href={`/treed/${id}`}>
            <p className="mt-1 text-subtle-medium text-gray-1">
              {comments.length} comment{comments.length > 1 ? "s" : ""}
            </p>
          </Link>
        </div>
      ) : (
        <div className="ml-3 mt-3 flex items-center gap-2">
          <Link href={`/treed/${id}`}>
            <p className="mt-1 text-subtle-medium text-gray-1">Reply</p>
          </Link>
        </div>
      )}
    </article>
  );
};

export default TreedCard;
