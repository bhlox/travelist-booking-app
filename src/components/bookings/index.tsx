"use client";
import Link from "next/link";
import React from "react";
import PersonList from "./person-list";
import { Button } from "../ui/button";

function ClientBookingsPage({
  storedPhoneNumber,
}: {
  storedPhoneNumber: string | undefined;
}) {
  return (
    <section className="max-w-7xl mx-auto p-4 dark:text-white flex flex-col items-center justify-center min-h-[95dvh] h-full gap-4 pt-8 sm:pt-4">
      {storedPhoneNumber ? (
        <Button asChild className="block">
          <Link href="/my-bookings">Check my bookings</Link>
        </Button>
      ) : null}
      <PersonList />
    </section>
  );
}

export default ClientBookingsPage;
