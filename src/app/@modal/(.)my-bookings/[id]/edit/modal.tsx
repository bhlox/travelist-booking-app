"use client";
import BookingForm from "@/components/bookings/form/form";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SelectBookingsWithHandler } from "@/lib/types";
import { useRouter } from "next/navigation";

export default function ModalMyBookingsEdit({
  bookingToBeUpdated,
  handlers,
}: {
  bookingToBeUpdated: SelectBookingsWithHandler;
  handlers: {
    id: string;
    displayName: string;
  }[];
}) {
  const router = useRouter();
  return (
    <Dialog defaultOpen onOpenChange={() => router.back()}>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        className="sm:max-w-md w-11/12 rounded-lg"
      >
        <DialogHeader>
          <DialogTitle>
            Update your booking with {bookingToBeUpdated.handler.displayName}
          </DialogTitle>
        </DialogHeader>
        <BookingForm
          handlerId={bookingToBeUpdated.handler.id}
          handlerName={bookingToBeUpdated.handler.displayName}
          storedPhoneNumber={bookingToBeUpdated.phoneNumber}
          bookingToBeUpdated={bookingToBeUpdated}
          handlers={handlers}
        />
      </DialogContent>
    </Dialog>
  );
}
