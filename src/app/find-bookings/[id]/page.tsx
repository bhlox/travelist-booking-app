import Buts from "@/components/find-bookings/buts";
import { Button } from "@/components/ui/button";
import { getBooking } from "@/lib/actions/bookings";
import { decrypt } from "@/lib/utils/encrypt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DeleteBookingBtn from "@/components/bookings/form/delete-btn";

export default async function UpdateBookingPage({
  params,
  searchParams,
}: {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  let pn = cookies().get("pn")?.value;
  if (pn) {
    pn = decrypt(pn);
  }
  if (!pn) {
    pn = searchParams.phone as string;
  }
  try {
    if (!pn) {
      throw new Error("phone number not found");
    }

    // #TODO this must be cached.
    const booking = await getBooking({
      bookingId: params.id,
      phoneNumber: pn || (searchParams.phone as string),
    });
    if (!booking) {
      console.log("booking not found");
      throw new Error("booking not found");
    }
    return (
      <div className="pt-4 mx-auto max-w-lg space-y-8 p-4 sm:px-0">
        <Card className="border-black dark:border-gray-300">
          <CardHeader className="flex flex-row gap-4 justify-between">
            <div>
              <CardDescription>image here</CardDescription>
              <CardTitle>{booking.customerName}</CardTitle>
            </div>
            <DeleteBookingBtn booking={booking} />
          </CardHeader>
          <CardContent>
            <p>handler: {booking.handler.displayName}</p>
            <p>date: {booking.selectedDate}</p>
            <p>time: {booking.selectedTime}</p>
          </CardContent>
          <CardFooter>
            <Buts id={booking.id} phone={booking.phoneNumber} />
          </CardFooter>
        </Card>
      </div>
    );
  } catch (error) {
    console.log(error);
    // redirect("/find-bookings");
  }
}
