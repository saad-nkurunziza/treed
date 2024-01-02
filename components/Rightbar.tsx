import { fetchUsers } from "@/lib/actions";
import UserCard from "./UserCard";

const RightBar = async () => {
  const users = await fetchUsers();
  return (
    <section className="sticky top-0 right-0 z-20 flex flex-col justify-between h-screen gap-12 px-10 pb-6 overflow-auto border-l custom-scrollbar w-fit border-l-dark-4 bg-dark-2 pt-28 max-xl:hidden">
      <div className="flex flex-col justify-start flex-1">
        <h3 className="text-heading4-medium text-light-1">
          People you might know
        </h3>
        <div className="mt-7 flex w-[320px] flex-col gap-8">
          {users.map((user) => (
            <UserCard
              key={user.id}
              image={user.image as string}
              username={user.username as string}
              email={user.email as string}
              id={user.id}
              name={user.name!}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightBar;
