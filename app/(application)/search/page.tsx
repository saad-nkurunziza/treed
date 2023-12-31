import PageLayout from "@/components/PageLayout";
import UserCard from "@/components/UserCard";
import Searchbar from "@/components/Searchbar";
import { getLoggedInUser } from "@/lib/actions";
import prisma from "@/lib/prisma";
const fetchSearchedUsers = async (query: string) => {
  const session = await getLoggedInUser();
  const searchedUsers = await prisma.user.findMany({
    where: {
      NOT: {
        email: session?.user?.email as string,
      },
      OR: [
        { username: { contains: query } },
        { name: { contains: query } },
        { email: { contains: query } },
      ],
    },
  });
  return searchedUsers;
};

const page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const searchResult = await fetchSearchedUsers(searchParams.q as string);
  return (
    <PageLayout title="Search" className="mb-8">
      <Searchbar />

      <div className="mt-14 flex flex-col gap-9">
        {searchResult === null ? (
          <p className="text-center text-base-regular text-light-3">Nothing</p>
        ) : (
          searchResult.map((user) => (
            <UserCard
              key={user.id}
              id={user.id}
              image={user.image as string}
              username={user.username as string}
              email={user.email}
              name={user.name as string}
            />
          ))
        )}
      </div>
    </PageLayout>
  );
};

export default page;
