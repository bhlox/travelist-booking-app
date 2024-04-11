import type { Metadata } from "next";
import HomePageClient from "./client";

export const metadata: Metadata = {
  title: "Travelist",
  description: "A key to a better travel",
};

export default function Home() {
  return (
    <>
      <HomePageClient />
    </>
  );
}
