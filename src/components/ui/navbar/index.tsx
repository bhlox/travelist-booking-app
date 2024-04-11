"use client";
import { cn } from "@/lib/utils/utils";
import Link from "next/link";
import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import ShowToastBtn from "../../show-toast-btn";
import { useWindowScroll, useWindowSize } from "@uidotdev/usehooks";
import Hamburger from "./hamburger";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { usePathname } from "next/navigation";

const ThemeToggler = dynamic(
  () => import("@/components/theme-toggler").then((mod) => mod.default),
  { ssr: false }
);

function Navbar() {
  // const pn = cookies().get("pn")?.value;
  // const { width } = useWindowSize();
  const pathname = usePathname();
  const [openMobileMenu, setOpenMobileMenu] = React.useState(false);
  const handleToggleMenu = () => {
    setOpenMobileMenu((c) => !c);
  };
  const [hide, setHide] = React.useState(false);
  const [{ y: currentY }] = useWindowScroll();
  const previousY = React.useRef(currentY ?? 0);

  useEffect(() => {
    if (currentY) {
      if (previousY.current < currentY) {
        setHide(true);
      } else {
        setHide(false);
      }
      setOpenMobileMenu(false);
      previousY.current = currentY;
    }
  }, [currentY, previousY]);

  useEffect(() => {
    if (pathname) {
      setHide(false);
    }
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "w-full block z-50 fixed top-0 transition-all duration-200 ease-in-out",
          null,
          {
            "-top-20": hide,
            "top-0": !hide,
            "bg-white dark:bg-black": (currentY ?? 0) > 0 || openMobileMenu,
          }
        )}
      >
        <nav
          className={cn(
            "max-w-screen-2xl mx-auto px-4 py-3 flex justify-between items-center gap-4",
            null,
            { "md:py-3": (currentY ?? 0) > 0, "md:py-6": currentY === 0 }
          )}
        >
          <Link
            onClick={() => setOpenMobileMenu(false)}
            href="/"
            className="text-2xl font-bold"
          >
            Logo
          </Link>
          <Mobile
            handleToggleMenu={handleToggleMenu}
            openMobileMenu={openMobileMenu}
          />
          <Desktop />
        </nav>
        <MobileMenu
          openMobileMenu={openMobileMenu}
          handleToggleMenu={handleToggleMenu}
        />
      </header>
    </>
  );
}

function Mobile({
  handleToggleMenu,
  openMobileMenu,
}: {
  handleToggleMenu: () => void;
  openMobileMenu: boolean;
}) {
  return (
    <div className="flex gap-4 items-center md:hidden">
      <ThemeToggler />
      <Hamburger
        handleToggleMenu={handleToggleMenu}
        openMobileMenu={openMobileMenu}
      />
    </div>
  );
}

function MobileMenu({
  openMobileMenu,
  handleToggleMenu,
}: {
  openMobileMenu: boolean;
  handleToggleMenu: () => void;
}) {
  const [openAccordion, setOpenAccordion] = React.useState("1");

  const handleChange = () => {
    setOpenAccordion("2");
    handleToggleMenu();
  };
  return (
    <div
      className={cn("grid transition-all duration-200 ease-in-out", null, {
        "grid-rows-[1fr] ": openMobileMenu,
        "grid-rows-[0fr]": !openMobileMenu,
      })}
    >
      <div
        className={cn(
          "overflow-hidden px-4 transtion-all duration-200 ease-in-out space-y-4 bg-gray-100 dark:bg-gray-950",
          null,
          { "py-2": openMobileMenu }
        )}
      >
        <Accordion
          type="single"
          collapsible
          value={openAccordion}
          onValueChange={setOpenAccordion}
        >
          <AccordionItem value="1" className="border-b-0">
            <AccordionTrigger className="justify-start no-underline hover:no-underline gap-4 py-0 text-xl">
              Bookings
            </AccordionTrigger>
            <AccordionContent className="pb-0 px-4 py-1">
              <ul className="list-disc list-inside space-y-1 text-lg capitalize">
                <li>
                  <Link onClick={handleChange} href="/booking">
                    book now
                  </Link>
                </li>
                <li>
                  <Link onClick={handleChange} href="/find-bookings">
                    find booking
                  </Link>
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="">
          <Link onClick={handleChange} href="/contact" className="text-xl">
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
}

function Desktop() {
  const pathname = usePathname();
  return (
    <>
      <ul className="items-center gap-6 hidden md:flex">
        <div className="flex items-center gap-16">
          <li>
            <Link
              href="/find-bookings"
              className={cn(
                "text-sm capitalize text-gray-600 dark:text-gray-300 font-light",
                null,
                {
                  "text-black dark:text-white text-lg font-normal":
                    pathname === "/find-bookings",
                }
              )}
            >
              find booking
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className={cn(
                "text-sm capitalize text-gray-600 dark:text-gray-300 font-light",
                null,
                {
                  "text-black dark:text-white text-lg font-normal":
                    pathname === "/contact",
                }
              )}
            >
              contact
            </Link>
          </li>
        </div>
        <li className="ml-12">
          <ThemeToggler />
        </li>
        <li className="">
          <Link
            href="/booking"
            className="flex items-center bg-blue-500 gap-1 px-4 py-2 cursor-pointer text-white font-semibold tracking-widest rounded-md hover:bg-blue-400 duration-300 hover:gap-2 hover:translate-x-3"
          >
            Book now
            <svg
              className="w-5 h-5"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                strokeLinejoin="round"
                strokeLinecap="round"
              ></path>
            </svg>
          </Link>
        </li>
      </ul>
    </>
  );
}

export default Navbar;
