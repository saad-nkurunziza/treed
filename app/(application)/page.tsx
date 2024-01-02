import PageLayout from "@/components/PageLayout";
import TreedCard from "@/components/TreedCard";
import { getLoggedInUser } from "@/lib/actions";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
const fetchTreeds = async () => {
  const session = await getLoggedInUser();
  const user = session?.user;
  const treeds = await prisma.treed.findMany({
    where: {
      NOT: {
        userId: user?.email,
      },
    },
    include: {
      user: true,
      _count: true,
      likes: {
        select: {
          userId: true,
        },
      },
      comments: {
        include: {
          user: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return treeds;
};

export default async function page() {
  const treeds = await fetchTreeds();
  const session = await getLoggedInUser();
  const currentUser = await prisma.user.findUnique({
    where: {
      email: session?.user?.email as string,
    },
    select: {
      username: true,
      email: true,
    },
  });
  const currentUserUserName = currentUser?.username;
  if (currentUserUserName === null) {
    return redirect("/profile/edit");
  }
  return (
    <PageLayout title="Home">
      <section className="flex flex-col gap-10 mt-9">
        {treeds.map((treed) => (
          <TreedCard
            key={treed.id}
            content={treed.content}
            id={treed.id}
            image={treed.user?.image as string}
            comments={treed.comments}
            name={treed.user?.name as string}
            username={treed.user?.username as string}
            email={treed.user?.email as string}
            createdAt={treed.createdAt}
            likes={treed._count.likes}
          />
        ))}
      </section>
      {treeds.length === 0 && (
        <div className="text-base-regular text-light-3 text-center">
          No treeds yet
        </div>
      )}
    </PageLayout>
  );
}
