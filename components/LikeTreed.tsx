import Image from "next/image";
import { likeTreed } from "@/lib/actions";

const LikeTreed = ({
  count,
  treedId,
  isLiked,
}: {
  count: number;
  treedId: string;
  isLiked: boolean;
}) => {
  return (
    <form
      action={likeTreed}
      className="flex gap-x-1 items-center"
      autoComplete="off"
    >
      <input type="hidden" name="treedId" value={treedId} />
      <button type="submit">
        <Image
          src={isLiked ? "/assets/heart-filled.svg" : "/assets/heart-gray.svg"}
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
