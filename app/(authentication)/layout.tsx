import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Treed Authentication",
};

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto flex items-center justify-center w-screen h-screen">
      {children}
    </div>
  );
}
