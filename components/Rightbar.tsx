import { fetchUsers } from "@/lib/actions";
import UserCard from "./UserCard";

const RightBar = async () => {
  const users = await fetchUsers();
  return (
    <section className="custom-scrollbar sticky right-0 top-0 z-20 flex h-screen w-fit flex-col justify-between gap-12 overflow-auto border-l border-l-dark-4 bg-dark-2 px-10 pb-6 pt-28 max-xl:hidden">
      <div className="flex flex-1 flex-col justify-start">
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
