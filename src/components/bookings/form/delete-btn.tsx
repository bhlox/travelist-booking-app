import Loader from "@/components/svg/loader";
import { Button } from "@/components/ui/button";
import { deleteBooking } from "@/lib/actions/bookings";
import { SelectBookings } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

export default function DeleteBookingBtn({
  booking,
}: {
  booking: SelectBookings;
}) {
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteBooking({ bookingId: booking.id }),
    onSuccess: () => {
      // setTimeout(() => {
      router.replace("/my-bookings");
      toast.success(
        <>
          <h3>Booking Cancelled</h3>
          <p>
            Booking with {booking.personInCharge} on {booking.selectedDate} at{" "}
            {booking.selectedTime} cancelled
          </p>
        </>
      );
      // }, 700);
    },
    onError: (err) => {
      console.error(err);
      toast.error("Failed to cancel booking");
    },
  });
  return (
    <Button type="button" onClick={() => mutate()} variant={"destructive"}>
      {isPending ? <Loader loadingWord={undefined} /> : "Cancel Booking"}
    </Button>
  );
}
