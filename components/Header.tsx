import Image from "next/image";
import Link from "next/link";
import NavItems from "./NavItems";
import UserDropDown from "./userDropdown";
import { searchStocks } from "@/lib/actions/finnhub.actions";

const Header = async ({ user }: { user: User | null }) => {
  const initialStocks = await searchStocks();
  return (
    <header className="sticky top-0 z-50 w-full bg-black/40 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-3 md:py-4">
        {/* Left Section: Logo + Desktop Nav */}
        <div className="flex items-center gap-4 md:gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gray-700">
              <Image
                src="/assets/icons/logo.svg"
                alt="Trade Connect"
                width={130}
                height={120}
                className="h-6 w-auto"
              />
            </div>

            {/* Hide text on small screens */}
            <span className="hidden sm:inline text-lg font-semibold tracking-tight text-gray-100">
              Trade Connect
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:block">
            <NavItems initialStocks={initialStocks} />
          </nav>
        </div>

        {/* Right Section: User or Auth buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {user ? (
            <UserDropDown user={user} initialStocks={initialStocks} />
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/sign-in"
                className="px-3 py-2 text-xs sm:text-sm font-medium text-gray-300 hover:text-yellow-400 transition-colors"
              >
                Sign In
              </Link>

              <Link
                href="/sign-up"
                className="px-3 py-2 text-xs sm:text-sm font-medium bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-500 transition-colors"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
