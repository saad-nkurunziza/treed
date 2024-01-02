"use client";
import { sidebarLinks } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Menu from "./Menu";

const LeftBar = () => {
  const currentPath = usePathname();

  return (
    <section className="scrollbar-hidden sticky left-0 top-0 z-20 flex h-screen w-fit flex-col justify-between overflow-auto border-r border-r-dark-4 bg-dark-2 pb-5 pt-24 max-md:hidden">
      <div className="flex w-full flex-1 flex-col gap-5 px-7 transition-all duration-300">
        {sidebarLinks.map((link) => {
          const isActive =
            (currentPath.includes(link.route) && link.route.length > 1) ||
            currentPath === link.route;

          return (
            <Link
              href={link.route}
              key={link.label}
              className={`relative flex justify-start gap-4 rounded-2xl p-4 ${
                isActive && "bg-primary "
              }`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
              />

              <p className="text-light-1 max-lg:hidden">{link.label}</p>
            </Link>
          );
        })}
      </div>

      <div className="mt-8 px-6">
        <Menu />
      </div>
    </section>
  );
};

export default LeftBar;
