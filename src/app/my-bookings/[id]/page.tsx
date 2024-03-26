import Buts from "@/components/my-bookings/buts";
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
    console.log({
      bookingId: params.id,
      phoneNumber: pn || (searchParams.phone as string),
    });
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
          <CardHeader>
            <CardDescription>image here</CardDescription>
            <CardTitle>{booking.customerName}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{booking.personInCharge}</p>
            <p>{booking.selectedDate}</p>
            <p>{booking.selectedTime}</p>
          </CardContent>
          <CardFooter>
            <Buts id={booking.id} phone={booking.phoneNumber} />
          </CardFooter>
        </Card>
      </div>
    );
  } catch (error) {
    console.log(error);
    // redirect("/my-bookings");
  }
}
