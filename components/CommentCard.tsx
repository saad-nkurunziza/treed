import { formatDate } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FC } from "react";
import Link from "next/link";
// import DeleteTreed from "./DeleteTreed";

interface Props {
  id: string;
  content: string;
  name: string;
  username: string;
  email: string;
  image: string;
  likes: number;
  createdAt: Date;
}

const CommentCard: FC<Props> = async ({
  id,
  content,
  name,
  username,
  email,
  likes,
  image,
  createdAt,
}) => {
  const formattedDate = formatDate(createdAt);
  //   const isLiked = await checkIsLiked(id);
  const firstLetter = name.charAt(0).toUpperCase();
  return (
    <article className="flex flex-col w-full px-0 rounded-xl xs:px-7">
      <div className="flex items-start justify-between">
        <div className="flex flex-row flex-1 w-full gap-4">
          <div className="flex flex-col items-center">
            <Link href={`/profile/${email}`}>
              <Avatar className="relative w-10 h-10">
                <AvatarImage src={image} />
                <AvatarFallback>{firstLetter}</AvatarFallback>
              </Avatar>
            </Link>

            {/* <div className="relative mt-2 w-0.5 grow rounded-full bg-neutral-800" /> */}
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
          </div>
          {/* <CommentLikeTreed count={likes} treedId={id} isLike={isLiked} /> */}
        </div>

        {/* <DeleteTreed /> */}
      </div>
    </article>
  );
};

export default CommentCard;
