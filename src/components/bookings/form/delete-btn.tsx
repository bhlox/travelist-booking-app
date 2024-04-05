"use client";
import Loader from "@/components/svg/loader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { deleteBooking } from "@/lib/actions/bookings";
import { SelectBookingsWithHandler } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";

export default function DeleteBookingBtn({
  booking,
}: {
  booking: SelectBookingsWithHandler;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteBooking({ bookingId: booking.id }),
    onSuccess: () => {
      router.replace("/my-bookings");
      toast.success(
        <>
          <h3>Booking Cancelled</h3>
          <p>
            Booking with {booking.handler.displayName} on {booking.selectedDate}{" "}
            at {booking.selectedTime} cancelled
          </p>
        </>
      );
    },
    onError: (err) => {
      console.error(err);
      toast.error("Failed to cancel booking");
    },
  });
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="p-1">
        <FaTrash className="text-gray-400 hover:text-gray-600" />
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          onInteractOutside={(e) => e.preventDefault()}
          className="sm:max-w-md w-11/12 rounded-lg"
        >
          <DialogHeader className="space-y-4">
            <DialogTitle>Confirm Booking Deletion</DialogTitle>
            <DialogDescription className="space-y-2">
              you are about to delete your booking under{" "}
              {booking.handler.displayName} on {booking.selectedDate} at{" "}
              {booking.selectedTime}.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-y-4">
            <Button
              disabled={isPending}
              variant="outline"
              onClick={() => setOpen(false)}
              type="button"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              disabled={isPending}
              type="button"
              onClick={() => mutate()}
            >
              {isPending ? <Loader loadingWord={undefined} /> : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
