"use server";

import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export const getLoggedInUser = async () => {
  const session = await getServerSession(authOptions);
  return session;
};

export const fetchUsers = async () => {
  const session = await getLoggedInUser();
  const users = await prisma.user.findMany({
    where: {
      NOT: {
        email: session?.user?.email!,
      },
    },
  });
  return users;
};

export const saveActivity = async (details: string, treedId: any) => {
  const session = await getLoggedInUser();
  const userId = session?.user?.email;

  await prisma.activity.create({
    data: {
      details,
      userId,
      treedId,
    },
  });
};

export const createTreed = async (formData: FormData) => {
  const session = await getLoggedInUser();
  const user = session?.user;
  const content = formData.get("content") as string;

  const newTreed = await prisma.treed.create({
    data: {
      content,
      userId: user?.email,
    },
  });
  await saveActivity("new_treed", newTreed.id);
  revalidatePath("/profile");
  redirect("/profile");
};

export const updateUser = async (formData: FormData) => {
  "use server";
  try {
    const session = await getLoggedInUser();
    const values = {
      name: formData.get("name") as string,
      username: formData.get("username") as string,
      bio: formData.get("bio") as string,
      // image: formData.get("profileImage") as string | null,
    };
    await prisma.user.update({
      where: {
        email: session?.user?.email as string,
      },
      data: {
        username: values.username,
        name: values.name,
        // image: values.image,
        bio: values.bio,
      },
    });
    revalidatePath("/profile");
    redirect("/profile");
  } catch (error) {
    console.log(error);
  }
};
