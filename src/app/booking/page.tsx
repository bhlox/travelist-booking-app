import ClientBookingsPage from "@/components/bookings";
import React from "react";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/utils/encrypt";

function BookingPage() {
  let phoneNumber = cookies().get("pn")?.value;
  if (phoneNumber) {
    phoneNumber = decrypt(phoneNumber);
  }
  return <ClientBookingsPage storedPhoneNumber={phoneNumber} />;
}

export default BookingPage;
