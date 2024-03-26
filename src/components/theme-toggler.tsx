"use client";
import { useTheme } from "next-themes";
import React from "react";

export default function ThemeToggler() {
  const { setTheme, resolvedTheme } = useTheme();
  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      {resolvedTheme === "dark" ? "dark" : "light"}
    </button>
  );
}
