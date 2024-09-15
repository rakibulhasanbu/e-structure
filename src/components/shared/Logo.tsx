import { ShoppingBag } from "lucide-react";
import Link from "next/link";

const Logo = () => {
  return (
    <Link
      href="/"
      className="hidden md:flex items-center gap-2 font-semibold pl-4 lg:pl-6 2xl:pl-8 "
    >
      <ShoppingBag className="h-6 w-6" />
      <span className="">Shoply</span>
    </Link>
  );
};

export default Logo;
