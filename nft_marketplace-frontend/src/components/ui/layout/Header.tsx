"use client";

import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Header = () => {
  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8 w-full">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-10 w-10 overflow-hidden rounded-full bg-blue-500">
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-white"
                >
                  <path
                    d="M4 15L7 9L12 4L17 9L20 15H16L12 11L8 15H4Z"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <span className="text-xl font-bold">OpenSea</span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 font-bold">
            <Link
              href="/create-nft"
              className="text-sm font-medium hover:text-gray-600"
            >
              Create
            </Link>
            <Link
              href="/history"
              className="text-sm font-medium hover:text-gray-600"
            >
              History
            </Link>
          </nav>

          <div className="flex ml-auto w-full justify-end">
            <ConnectButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
