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
import { cn, handlerProfileImageString } from "@/lib/utils/utils";
import { lightFormat } from "date-fns";

export default function MyBookingsCard({
  booking,
  setCurrentBookings,
  className,
  withOtherDetails,
}: {
  booking: SelectBookingsWithHandler;
  setCurrentBookings?: React.Dispatch<
    React.SetStateAction<SelectBookingsWithHandler[]>
  >;
  className?: string;
  withOtherDetails?: boolean;
}) {
  const profPic = handlerProfileImageString(booking.handler.profilePicture!);
  return (
    <div className={cn("w-full", className)}>
      <Card className="">
        <CardHeader className="p-0 relative">
          <div className="relative h-96 lg:h-64 w-full">
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
          <div className={cn({ "grid grid-cols-2 gap-4": withOtherDetails })}>
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
            {withOtherDetails && (
              <>
                <p className="font-light text-sm">
                  Customer Name: <br />
                  <span className="font-medium text-base">
                    {booking.customerName}
                  </span>
                </p>
                <p className="font-light text-sm">
                  Customer Phone: <br />
                  <span className="font-medium text-base">
                    +{booking.phoneNumber}
                  </span>
                </p>
                <p className="font-light text-sm">
                  Booked at: <br />
                  <span className="font-medium text-base">
                    {lightFormat(booking.bookedAt, "dd/MM/yyyy HH:mm")}
                  </span>
                </p>
                <p className="font-light text-sm">
                  Status: <br />
                  <span className="font-medium text-base">
                    {booking.status}
                  </span>
                </p>
              </>
            )}
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
