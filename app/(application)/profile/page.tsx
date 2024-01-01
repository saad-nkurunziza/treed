import React from "react";
import Image from "next/image";
import { profileTabs } from "@/lib/constants";
import PageLayout from "@/components/PageLayout";
import TreedCard from "@/components/TreedCard";
import { getLoggedInUser } from "@/lib/actions";
import ProfileHeader from "@/components/ProfileHeader";
import prisma from "@/lib/prisma";
const page = async () => {
  const session = await getLoggedInUser();
  const email = session?.user?.email as string;
  const currentUser = await prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      _count: true,
      treeds: {
        include: {
          user: true,
          comments: {
            include: {
              user: true,
            },
          },
          _count: true,
        },
      },
    },
  });
  return (
    <PageLayout title="Profile" className="mb-8">
      {currentUser && (
        <div className="flex flex-col">
          <ProfileHeader
            image={currentUser.image as string}
            name={currentUser.name as string}
            username={currentUser.username as string}
            bio={currentUser.bio as string}
            edit
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
                        {currentUser._count.treeds}
                      </p>
                    )}
                  </button>
                ))}
              </div>
              {/* {profileTabs.map((tab) => (
                <li
                  key={`content-${tab.label}`}
                  value={tab.value}
                  className="w-full text-light-1"
                >
                  <TreedsTab />
                </li>
              ))} */}
              <div className="mt-4 flex gap-y-10 flex-col">
                {currentUser.treeds.map((treed) => (
                  <TreedCard
                    key={treed.id}
                    content={treed.content}
                    id={treed.id}
                    comments={treed.comments}
                    image={treed.user?.image!}
                    name={treed.user?.name as string}
                    email={treed.user?.email as string}
                    username={treed.user?.username!}
                    createdAt={treed.createdAt}
                    likes={treed._count.likes}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default page;
