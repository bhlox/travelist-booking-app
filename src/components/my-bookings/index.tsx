"use client";
import { getMyBookings } from "@/lib/actions/bookings";
import { SelectBookings } from "@/lib/types";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import CustomPhoneInput from "../phone-input";
import { Button } from "../ui/button";
import Loader from "../svg/loader";
import MyBookingsCard from "./card";

interface IPhoneForm {
  phoneNumber: string;
}

function ClientMyBookingsPage({
  storedPhoneNumber,
  bookings,
}: {
  storedPhoneNumber: string | undefined;
  bookings: SelectBookings[] | null;
}) {
  const [currentBookings, setCurrentBookings] = useState(bookings);
  const {
    handleSubmit,
    control,
    formState: { errors: formErrors, isSubmitting, isSubmitSuccessful },
  } = useForm<IPhoneForm>({
    defaultValues: { phoneNumber: storedPhoneNumber },
  });

  const onSubmit: SubmitHandler<IPhoneForm> = async ({ phoneNumber: pn }) => {
    const result = await getMyBookings({ phoneNumber: pn });
    setCurrentBookings(result);
  };

  // removing code below will not make the modal's delete button not update the current state.
  useEffect(() => {
    setCurrentBookings(bookings);
  }, [bookings]);
  return (
    <div className="max-w-7xl mx-auto h-full py-4 flex flex-col gap-4">
      <div className="flex flex-col justify-center items-center gap-2 max-w-sm mx-auto">
        <h3 className="font-bold text-xl md:text-2xl capitalize">
          get bookings
        </h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <CustomPhoneInput
            control={control}
            name="phoneNumber"
            storedPhoneNumber={storedPhoneNumber}
            errorMsg={formErrors.phoneNumber?.message}
          />
          {formErrors.phoneNumber?.message ? (
            <p className="text-red-400 font-semibold">
              {formErrors.phoneNumber.message}
            </p>
          ) : null}
          <Button
            disabled={isSubmitting}
            type="submit"
            className="flex justify-center w-full capitalize "
          >
            {isSubmitting ? <Loader loadingWord={undefined} /> : "submit"}
          </Button>
        </form>
      </div>
      {currentBookings ? (
        <div className="flex flex-wrap">
          {currentBookings.map((booking) => (
            <MyBookingsCard key={`booking-${booking.id}`} booking={booking} />
          ))}
        </div>
      ) : (
        <h4 className="text-center text-2xl md:text-4xl font-bold capitalize">
          no bookings found
        </h4>
      )}
    </div>
  );
}

export default ClientMyBookingsPage;
