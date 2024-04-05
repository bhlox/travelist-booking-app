"use client";
import BookingForm from "@/components/bookings/form/form";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

export default function ModalBookings({
  handlerName,
  phoneNumber,
  handlerId,
}: {
  handlerName: string;
  phoneNumber: string | undefined;
  handlerId: string;
}) {
  const router = useRouter();

  return (
    <Dialog defaultOpen onOpenChange={() => router.back()}>
      <DialogContent
        onInteractOutside={(e) => {
          // if(e.detail.originalEvent.button)
          return e.preventDefault();
        }}
        className="sm:max-w-md w-11/12 rounded-lg"
      >
        <DialogHeader>
          <DialogTitle>Schedule a booking with {handlerName}</DialogTitle>
        </DialogHeader>
        <BookingForm
          handlerId={handlerId}
          handlerName={handlerName}
          storedPhoneNumber={phoneNumber}
          bookingToBeUpdated={undefined}
        />
      </DialogContent>
    </Dialog>
  );
}
