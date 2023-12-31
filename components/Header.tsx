import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <nav className="fixed top-0 z-30 flex w-full items-center justify-between bg-dark-2 px-6 py-3">
      <Link href="/" className="flex items-center gap-4">
        <Image src="/logo.svg" alt="logo" width={28} height={28} />
        <p className="text-heading3-bold text-light-1 max-xs:hidden">Treeds</p>
      </Link>

      <div className="flex items-center gap-1">
        <div className="block md:hidden">
          <div className="flex cursor-pointer">
            <Image
              src="/assets/logout.svg"
              alt="logout"
              width={24}
              height={24}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
