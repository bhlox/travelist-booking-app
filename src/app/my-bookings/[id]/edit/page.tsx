import BookingForm from "@/components/bookings/form/form";
import { getBooking } from "@/lib/actions/bookings";
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
    return (
      <>
        <h2 className="text-center text-2xl md:text-4xl font-bold">
          Edit your booking
        </h2>
        <BookingForm
          selectedPerson={booking.personInCharge}
          storedPhoneNumber={booking.phoneNumber}
          bookingToBeUpdated={booking}
        />
      </>
    );
  } catch (error) {
    console.log(error);
    redirect("my-bookings");
    // redirect to 404 page
  }
}
