import type { Metadata } from "next";
import { getLoggedInUser } from "@/lib/actions";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Treed Authentication",
};

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getLoggedInUser();
  if (session) {
    redirect("/");
  }
  return (
    <div className="container mx-auto flex items-center justify-center w-screen h-screen">
      {children}
    </div>
  );
}
