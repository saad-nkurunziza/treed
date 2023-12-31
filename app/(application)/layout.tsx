import Header from "@/components/Header";
import Leftbar from "@/components/Leftbar";
import Rightbar from "@/components/Rightbar";
import Footer from "@/components/Footer";
import { getLoggedInUser } from "@/lib/actions";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getLoggedInUser();
  if (!session) {
    return redirect("/auth");
  } else {
    return (
      <section>
        <Header />
        <main className="flex">
          <Leftbar />
          <section className="flex flex-col items-center flex-1 min-h-screen px-6 pb-10 bg-dark-1 pt-28 max-md:pb-32 sm:px-10">
            <div className="w-full max-w-4xl">{children}</div>
          </section>
          <Rightbar />
        </main>
        <Footer />
      </section>
    );
  }
}
