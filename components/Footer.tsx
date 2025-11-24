import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold">Trade Connect</h3>
          <p className="mt-2 text-gray-400">
            The future of trading is here.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h4 className="font-semibold">Quick Links</h4>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/about" className="hover:text-purple-400">
                  About
                </Link>
              </li>
              <li>
                <Link href="/features" className="hover:text-purple-400">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-purple-400">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Legal</h4>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/privacy" className="hover:text-purple-400">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-purple-400">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <h4 className="font-semibold">Stay Connected</h4>
          <p className="mt-4 text-gray-400">
            Get the latest updates and news.
          </p>
          <div className="mt-4 flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <Button>Subscribe</Button>
          </div>
        </div>
      </div>
      <div className="mt-12 border-t border-gray-800 pt-8 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} Trade Connect. All rights reserved.</p>
      </div>
    </footer>
  );
}
