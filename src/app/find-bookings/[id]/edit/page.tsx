import BookingForm from "@/components/bookings/form/form";
import BGGradient from "@/components/ui/bg-gradient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getBooking } from "@/lib/actions/bookings";
import { getHandlers } from "@/lib/actions/handlers";
import { decrypt } from "@/lib/utils/encrypt";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: "Travelist - Edit your booking",
  description: "A key to a better travel",
};

export default async function MyBookingEditPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  try {
    const booking = await getBooking({
      bookingId: params.id,
    });
    if (!booking) {
      throw new Error("no booking found");
    }
    const handlers = await getHandlers();
    return (
      <div className="relative min-h-[90dvh] grid place-items-center">
        <BGGradient />
        <div className="relative z-10">
          <Card>
            <CardHeader>
              <CardTitle>
                <h2 className="text-center text-2xl md:text-4xl font-bold">
                  Edit your booking
                </h2>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <BookingForm
                handlerName={booking.handler.displayName}
                handlerId={booking.handler.id}
                storedPhoneNumber={booking.phoneNumber}
                bookingToBeUpdated={booking}
                handlers={handlers}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  } catch (error) {
    console.log(error);
    redirect("find-bookings");
    // redirect to 404 page
  }
}
