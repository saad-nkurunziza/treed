import React from "react";
import prisma from "@/lib/prisma";
import { getLoggedInUser } from "@/lib/actions";
import UserDetailsForm from "@/components/UserDetailsForm";
import PageLayout from "@/components/PageLayout";

const fetchUser = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email: id,
    },
    select: {
      bio: true,
      image: true,
      name: true,
      username: true,
    },
  });
  return user;
};

export default async function page() {
  const session = await getLoggedInUser();
  const email = session?.user?.email;
  const currentUser = await fetchUser(email as string);
  if (!currentUser) return null;
  return (
    <PageLayout title="Edit Profile" className="mb-8">
      <p className="mt-3 text-base-regular text-light-2">Make any changes</p>

      <section className="mt-12">
        <UserDetailsForm user={currentUser} />
      </section>
    </PageLayout>
  );
}
