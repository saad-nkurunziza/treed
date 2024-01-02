"use client";
import { likeTreed } from "@/lib/actions";
import { useOptimistic } from "react";
import Image from "next/image";

const LikeTreed = ({
  count,
  treedId,
  isLike,
}: {
  count: number;
  treedId: string;
  isLike: boolean;
}) => {
  const [optimisticLikes, addOptimisticLike] = useOptimistic(
    { count, sending: false },
    (state, newCount) => ({
      ...state,
      count: newCount as number,
      sending: true,
    })
  );
  return (
    <form
      action={likeTreed}
      className="flex gap-x-1 items-center"
      autoComplete="off"
    >
      <input type="hidden" name="treedId" value={treedId} />
      <button type="submit">
        <Image
          src={
            optimisticLikes.sending || isLike
              ? "/assets/heart-filled.svg"
              : "/assets/heart-gray.svg"
          }
          alt="heart"
          width={24}
          height={24}
          className="cursor-pointer object-contain"
        />
      </button>
      <h3 className="text-small-semibold font-light text-light-3">
        {optimisticLikes.count}
      </h3>
    </form>
  );
};
export default LikeTreed;
