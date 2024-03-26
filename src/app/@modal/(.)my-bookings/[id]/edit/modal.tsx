"use client";
import BookingForm from "@/components/bookings/form/form";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SelectBookings } from "@/lib/types";
import { useRouter } from "next/navigation";

export default function ModalMyBookingsEdit({
  bookingToBeUpdated,
}: {
  bookingToBeUpdated: SelectBookings;
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
            Update your booking with {bookingToBeUpdated.personInCharge}
          </DialogTitle>
        </DialogHeader>
        <BookingForm
          selectedPerson={bookingToBeUpdated.personInCharge}
          storedPhoneNumber={bookingToBeUpdated.phoneNumber}
          bookingToBeUpdated={bookingToBeUpdated}
        />
      </DialogContent>
    </Dialog>
  );
}
