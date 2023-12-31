import React from "react";
import Image from "next/image";
import PageLayout from "@/components/PageLayout";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDate } from "@/lib/utils";
const fetchActivities = async () => {
  const activities = await prisma.activity.findMany({
    include: {
      user: {
        select: {
          image: true,
          username: true,
          name: true,
        },
      },
      treed: {
        select: {
          id: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return activities;
};

const Page = async () => {
  const activities = await fetchActivities();

  return (
    <PageLayout title="Activity" className="mb-8">
      <section className="mt-10">
        {activities.length > 0 ? (
          <div className="flex flex-col gap-5">
            {activities.map((activity) => {
              const formattedDate = formatDate(activity.createdAt);
              const firstLetter = (activity.user?.name as string)
                .charAt(0)
                .toUpperCase();
              return (
                <article
                  className="w-full flex items-center justify-between gap-2 rounded-md bg-dark-2 px-7 py-4"
                  key={activity.id}
                >
                  <div className="flex items-center gap-2 ">
                    <Avatar className="relative h-8 w-8">
                      <AvatarImage src={activity.user?.image as string} />
                      <AvatarFallback>{firstLetter}</AvatarFallback>
                    </Avatar>
                    <p className="!text-small-regular text-light-1">
                      <span className="mr-1 text-primary-500">
                        {activity.user?.username}
                      </span>
                      <Link href={`/treed/${activity.treed?.id}`}>
                        {activity.details === "like"
                          ? "liked a post"
                          : activity.details === "new_treed"
                          ? "added new post"
                          : ""}
                      </Link>
                    </p>
                  </div>
                  <div className="text-tiny-medium text-muted-foreground">
                    {formattedDate}
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <p className="!text-base-regular text-light-3 text-center">
            No activity yet
          </p>
        )}
      </section>
    </PageLayout>
  );
};

export default Page;
