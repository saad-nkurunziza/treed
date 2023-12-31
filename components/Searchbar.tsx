"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";

const Searchbar = () => {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  useEffect(() => {
    router.push(`/search?q=` + searchValue);
  }, [searchValue, router]);

  return (
    <div className="flex gap-1 px-4 py-2 rounded-lg bg-dark-3">
      <Image
        src="/assets/search-gray.svg"
        alt="search"
        width={24}
        height={24}
        className="object-contain"
      />
      <Input
        id="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search users"
        className="focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 border-none bg-transparent text-base-regular placeholder:text-light-4 text-light-3 outline-none h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visi1ble:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-slate-800 ring-offset-slate-950 focus-visible:ring-slate-800"
      />
    </div>
  );
};

export default Searchbar;
