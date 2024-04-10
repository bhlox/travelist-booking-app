import { getBooking } from "@/lib/actions/bookings";
import React from "react";
import { SelectBookingsWithHandler } from "@/lib/types";
import MyBookingsCard from "@/components/find-bookings/card";
import BGGradient from "@/components/ui/bg-gradient";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";

export default async function UpdateBookingPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  // #TODO this must be cached.
  const booking: SelectBookingsWithHandler | undefined = await getBooking({
    bookingId: params.id,
    withPicture: true,
  });
  if (!booking) {
    console.error("booking not found");
    notFound();
  }
  return (
    <div className="relative min-h-[95dvh] py-24 grid place-items-center">
      <BGGradient />
      <div className="relative space-y-4">
        <Link
          href="/find-bookings"
          className="flex gap-[2px] items-center max-w-max group hover:underline"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform duration-200 ease-in-out" />
          Back
        </Link>
        <MyBookingsCard
          booking={booking}
          withOtherDetails
          className="max-w-2xl mx-auto z-10 px-4"
        />
      </div>
    </div>
  );
}
