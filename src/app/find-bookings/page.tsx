import { getMyBookings } from "@/lib/actions/bookings";
import React from "react";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/utils/encrypt";
import { revalidatePath } from "next/cache";
import ClientMyBookingsPage from "./client";

async function MyBookingsPage() {
  let phoneNumber = cookies().get("pn")?.value;
  if (phoneNumber) {
    phoneNumber = decrypt(phoneNumber);
  }
  const bookings = await getMyBookings({ phoneNumber, withPicture: true });
  return (
    <ClientMyBookingsPage bookings={bookings} storedPhoneNumber={phoneNumber} />
  );
}

export default MyBookingsPage;
