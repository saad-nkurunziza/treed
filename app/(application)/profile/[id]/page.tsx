import React from "react";
import Image from "next/image";
import ProfileHeader from "@/components/ProfileHeader";
import { profileTabs } from "@/lib/constants";
import PageLayout from "@/components/PageLayout";
import TreedCard from "@/components/TreedCard";
import prisma from "@/lib/prisma";

const fetchUser = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email: id,
    },
    include: {
      likes: true,
      comments: true,
      treeds: {
        include: {
          comments: {
            include: {
              user: true,
            },
          },
        },
      },
      _count: true,
    },
  });
  return user;
};

const page = async ({ params }: { params: { id: string } }) => {
  const decodedEmail = decodeURIComponent(params.id)
  const user = await fetchUser(decodedEmail);
  return (
    <PageLayout title="Profile" className="mb-8">
      {user && (
        <>
          <ProfileHeader
            bio={user.bio as string}
            image={user.image!}
            name={user.name as string}
            username={user.username as string}
          />

          <div>
            <div className="w-full">
              <div className="flex gap-3 bg-dark-2 rounded ">
                {profileTabs.map((tab) => (
                  <button
                    key={tab.label}
                    value={tab.value}
                    className="flex min-h-[50px] flex-1 justify-center items-center gap-3 bg-dark-2 text-light-2 data-[state=active]:bg-[#0e0e12] data-[state=active]:text-light-2"
                  >
                    <Image
                      src={tab.icon}
                      alt={tab.label}
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                    <p className="max-sm:hidden">{tab.label}</p>

                    {tab.label === "Treeds" && (
                      <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">
                        {user._count.treeds}
                      </p>
                    )}
                  </button>
                ))}
              </div>

              <div className="mt-4 flex gap-y-10 flex-col">
                {user.treeds.map((treed) => (
                  <TreedCard
                    key={treed.id}
                    content={treed.content}
                    id={treed.id}
                    comments={treed.comments}
                    image={user.image!}
                    name={user?.name as string}
                    username={user?.username as string}
                    email={user?.email}
                    createdAt={treed.createdAt}
                    likes={user._count.likes}
                  />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </PageLayout>
  );
};

export default page;
