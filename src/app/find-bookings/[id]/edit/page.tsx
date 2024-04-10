import BookingForm from "@/components/bookings/form/form";
import { getBooking } from "@/lib/actions/bookings";
import { getHandlers } from "@/lib/actions/handlers";
import { decrypt } from "@/lib/utils/encrypt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export default async function MyBookingEditPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  let pn = cookies().get("pn")?.value;
  if (pn) {
    pn = decrypt(pn);
  }
  if (!pn) {
    throw new Error("no phone found");
  }
  try {
    const booking = await getBooking({
      bookingId: params.id,
      phoneNumber: pn,
    });
    if (!booking) {
      throw new Error("no booking found");
    }
    const handlers = await getHandlers();
    return (
      <>
        <h2 className="text-center text-2xl md:text-4xl font-bold">
          Edit your booking
        </h2>
        <BookingForm
          handlerName={booking.handler.displayName}
          handlerId={booking.handler.id}
          storedPhoneNumber={booking.phoneNumber}
          bookingToBeUpdated={booking}
          handlers={handlers}
        />
      </>
    );
  } catch (error) {
    console.log(error);
    redirect("find-bookings");
    // redirect to 404 page
  }
}
