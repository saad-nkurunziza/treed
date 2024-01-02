"use client";
import { sidebarLinks } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Menu from "./Menu";

const LeftBar = () => {
  const currentPath = usePathname();

  return (
    <section className="sticky top-0 left-0 z-20 flex flex-col justify-between h-screen pt-24 pb-5 overflow-auto border-r scrollbar-hidden w-fit border-r-dark-4 bg-dark-2 max-md:hidden">
      <div className="flex flex-col flex-1 w-full gap-5 transition-all duration-300 px-7">
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

      <div className="px-6 mt-8">
        <Menu />
      </div>
    </section>
  );
};

export default LeftBar;
