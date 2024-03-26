import { getMyBookings } from "@/lib/actions/bookings";
import React from "react";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/utils/encrypt";
import ClientMyBookingsPage from "@/components/my-bookings";
import { revalidatePath } from "next/cache";

async function MyBookingsPage() {
  let phoneNumber = cookies().get("pn")?.value;
  if (phoneNumber) {
    phoneNumber = decrypt(phoneNumber);
  }
  const bookings = await getMyBookings({ phoneNumber });
  console.log("bookings");
  return (
    <ClientMyBookingsPage bookings={bookings} storedPhoneNumber={phoneNumber} />
  );
}

export default MyBookingsPage;
