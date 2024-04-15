import React, { useState } from "react";
import ModalMyBookingsEdit from "./modal";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/utils/encrypt";
import { getBooking } from "@/lib/actions/bookings";
import { toDate } from "date-fns";
import { getHandlers } from "@/lib/actions/handlers";

async function MyBookingsModalPage({ params }: { params: { id: string } }) {
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
    });
    if (!booking) {
      throw new Error("no booking found");
    }
    const handlers = await getHandlers();
    return (
      <ModalMyBookingsEdit bookingToBeUpdated={booking} handlers={handlers} />
    );
  } catch (error) {
    console.log(error);
  }
}

export default MyBookingsModalPage;
