import { cn } from "@/lib/utils/utils";
import React from "react";

export default function Hamburger({
  handleToggleMenu,
  openMobileMenu,
}: {
  handleToggleMenu: () => void;
  openMobileMenu: boolean;
}) {
  return (
    <button
      onClick={handleToggleMenu}
      className="flex flex-col items-center justify-center h-6 w-6"
    >
      <div
        className={cn(
          "w-full h-0.5 bg-black dark:bg-white transition-all duration-200 ease-in-out",
          null,
          {
            "translate-y-1.5 rotate-45": openMobileMenu,
          }
        )}
      />
      <div
        className={cn(
          "w-full h-0.5 bg-black dark:bg-white mt-1 transition-opacity duration-200 ease-in-out",
          null,
          {
            "opacity-0": openMobileMenu,
          }
        )}
      />
      <div
        className={cn(
          "w-full h-0.5 bg-black dark:bg-white mt-1 transition-all duration-200 ease-in-out",
          null,
          {
            "-translate-y-1.5 -rotate-45": openMobileMenu,
          }
        )}
      />
    </button>
  );
}
