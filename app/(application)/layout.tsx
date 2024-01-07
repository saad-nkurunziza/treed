import Header from "@/components/Header";
import Leftbar from "@/components/Leftbar";
import Rightbar from "@/components/Rightbar";
import Footer from "@/components/Footer";
export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Header />
      <main className="flex">
        <Leftbar />
        <section className="flex flex-col items-center flex-1 min-h-screen px-6 pb-10 bg-dark-1 pt-28 max-md:pb-32 sm:px-10">
          <div className="rounded-t-xl w-full max-w-4xl">{children}</div>
        </section>
        <Rightbar />
      </main>
      <Footer />
    </section>
  );
}
