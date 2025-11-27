import Image from "next/image";
import Link from "next/link";
import NavItems from "./NavItems";
import UserDropDown from "./userDropdown";

const Header = ({ user }: { user: User }) => {
  return (
    <header className="sticky top-0 header">
      <div className="container header-wrapper">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500 shadow-[0_0_35px_rgba(250,204,21,0.6)]">
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
          <Link
            href="/dashboard"
            className="hidden sm:inline-flex items-center rounded-full border border-yellow-400/30 bg-yellow-400/10 px-3 py-1 text-xs font-medium text-yellow-200 hover:bg-yellow-400/20 transition-colors"
          >
            Live dashboard
          </Link>
          <UserDropDown user={user} />
        </div>
      </div>
    </header>
  );
};

export default Header;