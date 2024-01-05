"use client";
import Image from "next/image";
import { likeTreed, unlikeTreed } from "@/lib/actions";
import { useOptimistic, useState } from "react";

const LikeTreed = ({
  count,
  treedId,
  isLiked,
}: {
  count: number;
  treedId: string;
  isLiked: boolean;
}) => {
  const [state, setState] = useState({ count, isLiked });
  const [optimisticState, addOptimistic] = useOptimistic(
    state,
    (currentState, optimisticValue) => {
      if (optimisticValue === "add") {
        return {
          ...currentState,
          count: currentState.count + 1,
          isLiked: true,
        };
      } else if (optimisticValue === "remove") {
        return {
          ...currentState,
          count: currentState.count - 1,
          isLiked: false,
        };
      } else {
        return currentState;
      }
    }
  );

  const handleLikeTreed = async () => {
    addOptimistic("add");
    await likeTreed(treedId);
  };

  const handleUnlikeTreed = async () => {
    addOptimistic("remove");
    await unlikeTreed(treedId);
  };

  return (
    <div className="flex gap-x-1 items-center">
      <button
        type="button"
        onClick={optimisticState.isLiked ? handleUnlikeTreed : handleLikeTreed}
      >
        <Image
          src={
            optimisticState.isLiked
              ? "/assets/heart-filled.svg"
              : "/assets/heart-gray.svg"
          }
          alt="heart"
          width={24}
          height={24}
          className="cursor-pointer object-contain transition-all duration-300"
        />
      </button>
      <h3 className="text-small-semibold font-light text-light-3">
        {optimisticState.count}
      </h3>
    </div>
  );
};

export default LikeTreed;
