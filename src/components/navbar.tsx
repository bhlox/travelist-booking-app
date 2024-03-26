import { cn } from "@/lib/utils/utils";
import Link from "next/link";
import React from "react";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import ShowToastBtn from "./show-toast-btn";

const ThemeToggler = dynamic(
  () => import("@/components/theme-toggler").then((mod) => mod.default),
  { ssr: false }
);

function Navbar() {
  const pn = cookies().get("pn")?.value;
  return (
    <>
      <header className="dark:bg-red-600 bg-blue-700 w-full fixed top-0 left-0 block z-50">
        <nav className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center gap-4">
          <Link href="/booking" className="text-2xl font-bold">
            Logo
          </Link>
          <ul className="flex gap-4">
            {pn ? (
              <li>
                <Link href="/my-bookings">My Bookings</Link>
              </li>
            ) : null}
            <li>
              <ThemeToggler />
            </li>
            {/* <ShowToastBtn /> */}
          </ul>
        </nav>
      </header>
      <div className="h-[5dvh]" />
    </>
  );
}

export default Navbar;
