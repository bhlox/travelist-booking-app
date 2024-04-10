import { getMyBookings } from "@/lib/actions/bookings";
import React from "react";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/utils/encrypt";
import ClientFindBookingsPage from "./client";

export default async function FindBookingsPage() {
  let phoneNumber = cookies().get("pn")?.value;
  if (phoneNumber) {
    phoneNumber = decrypt(phoneNumber);
  }
  return <ClientFindBookingsPage />;
}
