import { FC } from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
interface Props {
  id: string;
  name: string;
  username: string;
  image: string;
  email: string;
}

const UserCard: FC<Props> = ({ id, name, username, image, email }) => {
  const firstLetter = name.charAt(0).toUpperCase();
  return (
    <article className="flex flex-col justify-between gap-4 max-xs:rounded-xl max-xs:bg-dark-3 max-xs:p-4 xs:flex-row xs:items-center">
      <Link href={`/profile/${email}`}>
        <div className="flex items-start justify-start flex-1 gap-3 xs:items-center">
          <Avatar className="relative object-cover w-12 h-12">
            <AvatarImage src={image} />
            <AvatarFallback>{firstLetter}</AvatarFallback>
          </Avatar>

          <div className="flex-1 text-ellipsis">
            <h4 className="text-base-semibold text-light-1">{name}</h4>
            <p className="text-small-medium text-gray-1">@{username}</p>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default UserCard;
