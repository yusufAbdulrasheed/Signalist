import Image from "next/image";
import Link from "next/link";
import NavItems from "./NavItems";
import UserDropDown from "./userDropdown";

const Header = ({ user }: { user: User | null }) => {
  return (
    <header className="sticky top-0 header">
      <div className="container header-wrapper">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-yellow-400 via-amber-500 to-orange-500 shadow-[0_0_35px_rgba(250,204,21,0.6)]">
              <Image
                src="/assets/icons/logo.svg"
                alt="Trade Connect"
                width={26}
                height={26}
                className="h-6 w-auto"
              />
            </div>
            <span className="hidden sm:inline text-lg font-semibold tracking-tight text-gray-100">
              Trade Connect
            </span>
          </Link>

          <nav className="hidden md:block">
            <NavItems />
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <UserDropDown user={user} />
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/sign-in"
                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-yellow-400 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="px-4 py-2 text-sm font-medium bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-500 transition-colors"
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