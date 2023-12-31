import TreedCard from "@/components/TreedCard";
import React from "react";
import prisma from "@/lib/prisma";
import { getLoggedInUser } from "@/lib/actions";
import CommentForm from "@/components/CommentForm";
import CommentCard from "@/components/CommentCard";

const fetchTreed = async (id: string) => {
  const treed = await prisma.treed.findUnique({
    where: {
      id,
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
  });
  return treed;
};

const Page = async ({ params }: { params: { treedId: string } }) => {
  const session = await getLoggedInUser();
  const treed = await fetchTreed(params.treedId);
  if (!params || !treed) return null;
  return (
    <div>
      <section className="relative">
        <div>
          <TreedCard
            key={treed.id}
            content={treed.content}
            id={treed.id}
            image={treed.user?.image!}
            name={treed.user?.name as string}
            username={treed.user?.username as string}
            email={treed.user?.email as string}
            createdAt={treed.createdAt}
            likes={treed._count.likes}
            comments={treed.comments}
          />
        </div>

        <div className="mt-7">
          <CommentForm
            currentUserImg={session?.user?.image!}
            treedId={params.treedId}
          />
        </div>

        <div className="mt-10 flex flex-col gap-y-7">
          {treed.comments.map((comment) => (
            <CommentCard
              key={treed.id}
              content={comment.comment}
              id={comment.id}
              image={comment.user?.image!}
              name={comment.user?.name as string}
              email={comment.user?.email as string}
              username={comment.user?.username as string}
              createdAt={comment.createdAt}
              likes={8}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Page;
