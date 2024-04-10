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
import Image from "next/image";
import { handlerProfileImageString } from "@/lib/utils/utils";

export default function MyBookingsCard({
  booking,setCurrentBookings
}: {
  booking: SelectBookingsWithHandler;
  setCurrentBookings: React.Dispatch<
    React.SetStateAction<SelectBookingsWithHandler[]>
  >;
}) {
  const profPic = handlerProfileImageString(booking.handler.profilePicture!);
  return (
    <div className="w-full md:w-1/2 lg:w-1/4 md:px-2 pb-4">
      <Card className="">
        <CardHeader className="p-0 relative">
          <div className="relative h-64 w-full">
            <Image
              src={profPic}
              alt={booking.handler.displayName}
              fill
              className="rounded-t-lg object-cover"
            />
          </div>
          <DeleteBookingBtn
            booking={booking}
            setCurrentBookings={setCurrentBookings}
            className="absolute -right-2 -top-4 z-10 size-10 lg:size-6 bg-red-500 rounded-full text-sm grid place-items-center text-white hover:text-white/70"
          />
        </CardHeader>
        <CardContent className="space-y-2">
          <CardTitle className="pt-2">{booking.handler.displayName}</CardTitle>
          <div>
            <p className="font-light text-sm">
              Scheduled Date: <br />
              <span className="font-medium text-base">
                {" "}
                {booking.selectedDate}
              </span>
            </p>
            <p className="font-light text-sm">
              Scheduled Time: <br />
              <span className="font-medium text-base">
                {booking.selectedTime.slice(0, 5)}
              </span>
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button asChild>
            <Link scroll={false} href={`/find-bookings/${booking.id}/edit`}>
              Update booking
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
