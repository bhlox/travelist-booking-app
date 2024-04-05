import React from "react";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/utils/encrypt";
import ClientBookingsPage from "./client";
import { getHandlers } from "@/lib/actions/handlers";

async function BookingPage() {
  let phoneNumber = cookies().get("pn")?.value;
  if (phoneNumber) {
    phoneNumber = decrypt(phoneNumber);
  }
  const handlers = await getHandlers();
  return (
    <ClientBookingsPage storedPhoneNumber={phoneNumber} handlers={handlers} />
  );
}

export default BookingPage;
