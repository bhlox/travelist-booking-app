"use client";
import MyBookingsCard from "@/components/find-bookings/card";
import CustomPhoneInput from "@/components/phone-input";
import Loader from "@/components/svg/loader";
import { Button } from "@/components/ui/button";
import { getTodayAndFutureBookings } from "@/lib/actions/bookings";
import { SelectBookingsWithHandler } from "@/lib/types";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import BGGradient from "@/components/ui/bg-gradient";

interface IPhoneForm {
  phoneNumber: string;
}

export default function ClientFindBookingsPage() {
  const [currentBookings, setCurrentBookings] = useState<
    SelectBookingsWithHandler[]
  >([]);
  const {
    handleSubmit,
    control,
    formState: { errors: formErrors, isSubmitting, submitCount },
  } = useForm<IPhoneForm>();

  const onSubmit: SubmitHandler<IPhoneForm> = async ({ phoneNumber: pn }) => {
    const result = await getTodayAndFutureBookings({
      phoneNumber: pn,
      withPicture: true,
    });
    setCurrentBookings(result);
  };

  return (
    <div className="relative min-h-[95dvh]">
      <BGGradient />
      <div className="max-w-7xl mx-auto relative py-24 px-4 space-y-9 md:space-y-14">
        <h3 className="text-4xl md:text-6xl font-bold">Find your booking(s)</h3>
        <div className="flex flex-col md:flex-row gap-4 lg:gap-20 md:items-start">
          <Card className="md:w-1/4">
            <CardHeader>
              <CardDescription>
                Enter phone number to retrieve booking(s)
              </CardDescription>
            </CardHeader>
            <CardContent className="">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                <CustomPhoneInput
                  control={control}
                  name="phoneNumber"
                  storedPhoneNumber={undefined}
                  errorMsg={formErrors.phoneNumber?.message}
                />
                {formErrors.phoneNumber?.message ? (
                  <p className="text-red-400 font-semibold">
                    {formErrors.phoneNumber.message}
                  </p>
                ) : null}
              </form>
            </CardContent>
            <CardFooter className="">
              <Button
                disabled={isSubmitting}
                onClick={handleSubmit(onSubmit)}
                className="flex justify-center w-full capitalize "
              >
                {isSubmitting ? <Loader loadingWord={undefined} /> : "submit"}
              </Button>
            </CardFooter>
          </Card>
          {currentBookings.length ? (
            <div className="md:flex md:flex-wrap md:w-3/4">
              {currentBookings.map((booking) => (
                <MyBookingsCard
                  key={`booking-${booking.id}`}
                  booking={booking}
                  setCurrentBookings={setCurrentBookings}
                  className="w-full md:w-1/2 lg:w-1/4 md:px-2 pb-4"
                />
              ))}
            </div>
          ) : submitCount ? (
            <h4 className="text-center text-2xl md:text-4xl font-bold capitalize">
              no bookings found
            </h4>
          ) : null}
        </div>
      </div>
    </div>
  );
}
