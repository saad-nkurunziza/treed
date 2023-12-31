import Image from "next/image";
import Link from "next/link";
import Menu from "./Menu";

const Header = () => {
  return (
    <nav className="fixed top-0 z-30 flex items-center justify-between w-full px-6 py-3 bg-dark-2">
      <Link href="/" className="flex items-center gap-4">
        <Image src="/logo.png" alt="logo" width={28} height={28} />
        <p className="text-heading3-bold text-light-1 max-xs:hidden">Treeds</p>
      </Link>

      <div className="flex items-center gap-1">
        <div className="block md:hidden">
          <Menu />
        </div>
      </div>
    </nav>
  );
};

export default Header;
