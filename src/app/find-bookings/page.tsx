import React from "react";
import ClientFindBookingsPage from "./client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Travelist - Find your booking(s)",
  description: "Page dedicated to find your booking(s) on Travelist",
};

export default async function FindBookingsPage() {
  return <ClientFindBookingsPage />;
}
