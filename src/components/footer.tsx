import Image from "next/image";
import Link from "next/link";
import React from "react";
import LogoSVG from "./svg/logo";

export default function Footer() {
  return (
    <footer className="bg-white rounded-lg shadow dark:bg-neutral-950">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link href="/" className="inline max-w-max">
            <LogoSVG />
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <Link href="/booking" className="hover:underline me-4 md:me-6">
                Book now
              </Link>
            </li>
            <li>
              <Link
                href="/find-bookings"
                className="hover:underline me-4 md:me-6"
              >
                Find Booking
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023{" "}
          <Link href="/" className="hover:underline">
            TR™
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
