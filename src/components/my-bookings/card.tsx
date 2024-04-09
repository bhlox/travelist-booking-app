import { SelectBookingsWithHandler } from "@/lib/types";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Link from "next/link";
import { Button } from "../ui/button";
import DeleteBookingBtn from "../bookings/form/delete-btn";

export default function MyBookingsCard({
  booking,
}: {
  booking: SelectBookingsWithHandler;
}) {
  return (
    <div className="w-full md:w-1/3 lg:w-1/4 p-2">
      <Card className="border-black dark:border-gray-300">
        <CardHeader className="flex flex-row justify-between gap-4">
          <div>
            <CardDescription>image here</CardDescription>
            <CardTitle>{booking.handler.displayName}</CardTitle>
          </div>
          <DeleteBookingBtn booking={booking} />
        </CardHeader>
        <CardContent>
          <p>date: {booking.selectedDate}</p>
          <p>time: {booking.selectedTime.slice(0, 5)}</p>
        </CardContent>
        <CardFooter>
          <Button asChild>
            <Link scroll={false} href={`/my-bookings/${booking.id}/edit`}>
              Update booking
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
