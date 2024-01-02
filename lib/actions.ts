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

export const createTreed = async (prevState: any, formData: FormData) => {
  try {
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
  } catch (error) {
    return "Failed to post";
  }
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
    revalidatePath("/profile/edit");
    redirect("/profile");
  } catch (error) {
    console.log(error);
  }
};

export const addComment = async (formData: FormData) => {
  "use server";
  const session = await getLoggedInUser();
  const user = session?.user;
  const comment = formData.get("comment") as string;
  const treedId = formData.get("treedId") as string;
  const userId = user?.email;
  if (!userId || !treedId) {
    throw new Error("Invalid credentials");
  }
  const createdComment = await prisma.comment.create({
    data: {
      comment,
      treedId,
      userId,
    },
  });
  // await saveActivity("comment", createdComment.id);
  revalidatePath(`/treed/${treedId}`);
};

export const likeTreed = async (formData: FormData) => {
  "use server";
  const session = await getLoggedInUser();
  const userId = session?.user?.email;
  const treedId = formData.get("treedId") as string;
  if (!userId || !treedId) {
    throw new Error("Invalid credentials");
  }
  const isTweetLiked = await prisma.like.findUnique({
    where: {
      treedId_userId: {
        treedId,
        userId,
      },
    },
  });
  if (isTweetLiked) {
    await prisma.like.delete({
      where: {
        treedId_userId: {
          treedId,
          userId,
        },
      },
    });
  }
  const like = await prisma.like.create({
    data: {
      treedId,
      userId,
    },
  });
  await saveActivity("like", like.treedId);
  revalidatePath("/");
};