import React, { useState } from "react";
import ModalMyBookingsEdit from "./modal";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/utils/encrypt";
import { redirect } from "next/navigation";
import { getBooking } from "@/lib/actions/bookings";

async function MyBookingsModalPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  let phoneNumber = cookies().get("pn")?.value;
  if (phoneNumber) {
    phoneNumber = decrypt(phoneNumber);
  }
  try {
    if (!phoneNumber) {
      throw new Error("no phone found");
    }
    const booking = await getBooking({
      bookingId: params.id,
      phoneNumber: phoneNumber,
    });
    if (!booking) {
      redirect("/my-bookings");
    }
    return <ModalMyBookingsEdit bookingToBeUpdated={booking} />;
  } catch (error) {
    console.log(error);
  }
}

export default MyBookingsModalPage;
