import Image from "next/image"
import Link from "next/link"
import NavItems from "./NavItems"
import UserDropDown from "./userDropdown"

const Header = () => {
  return (
    <header className="sticky top-0 header">
        <div className="container header-wrapper">
            <Link href="/" >
                <Image src="/assets/icons/logo.svg" alt="Trade Connect" width={140} height={32} className="h-8 w-auto cursor-pointer"/>
            </Link>
            <nav className="hidden sm:block">
                {/* Navigation Items */}
                <NavItems/>
            </nav>

            {/* User Drop down */}
            <UserDropDown />
        </div>
    </header>
  )
}

export default Header