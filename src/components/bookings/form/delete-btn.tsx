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
import { cn } from "@/lib/utils/utils";

export default function DeleteBookingBtn({
  booking,
  className,
  setCurrentBookings,
}: {
  booking: SelectBookingsWithHandler;
  className?: string;
  setCurrentBookings: React.Dispatch<
    React.SetStateAction<SelectBookingsWithHandler[]>
  >;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteBooking({ bookingId: booking.id }),
    onSuccess: () => {
      setCurrentBookings((prev) => prev.filter((b) => b.id !== booking.id));
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
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn("text-gray-400 hover:text-gray-600", className)}
      >
        <FaTrash />
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
