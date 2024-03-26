"use client";
import {
  createBooking,
  getBookedTimes,
  updateBooking,
  createSecureCookiePN,
} from "@/lib/actions/bookings";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import React from "react";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import CustomPhoneInput from "../../phone-input";
import { defaultStartingDate, startOfBookingTime } from "@/lib/constants";
import { validateIfBookingValuesSame } from "@/lib/utils/utils";
import { useRouter } from "next/navigation";
import { Button } from "../../ui/button";
import Loader from "../../svg/loader";
import { toast } from "react-toastify";
import { IBookingForm, SelectBookings } from "@/lib/types";
import SelectInput from "./select";
import NameInput from "./name-input";
import DeleteBookingBtn from "./delete-btn";
import TimeInput from "./time-input";
import DateInput from "./date-input";
import ToastContent from "@/components/ui/toast-content";

// #TODO regarding storedPhoneNumber props, verify if you still need this

function BookingForm({
  storedPhoneNumber,
  selectedPerson,
  bookingToBeUpdated,
}: {
  storedPhoneNumber: string | undefined;
  selectedPerson: string;
  bookingToBeUpdated: SelectBookings | undefined;
}) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors: formErrors, isSubmitting, isSubmitSuccessful },
    setValue,
    reset,
  } = useForm<IBookingForm>({
    shouldFocusError: false,
    defaultValues: {
      customerName: bookingToBeUpdated?.customerName,
      selectedDate: bookingToBeUpdated?.selectedDate ?? defaultStartingDate,
      phoneNumber: storedPhoneNumber,
      personInCharge: selectedPerson,
      bookingId: bookingToBeUpdated?.id,
      // selectedTime: bookingToBeUpdated?.selectedTime,
    },
  });
  const onSubmit: SubmitHandler<IBookingForm> = async ({
    selectedDate,
    selectedTime,
    customerName,
    phoneNumber,
    personInCharge,
    bookingId,
  }) => {
    selectedDate = dayjs(selectedDate).format("YYYY-MM-DD");
    selectedTime = dayjs(selectedTime).isValid()
      ? dayjs(selectedTime).format("HH:mm")
      : dayjs(`${selectedDate} ${selectedTime}`).format("HH:mm");
    // bookingId condition here indicates that we are updating a record.
    if (bookingId) {
      if (
        validateIfBookingValuesSame({
          bookingToBeUpdated: bookingToBeUpdated!,
          ToBeCompared: {
            customerName,
            phoneNumber,
            selectedDate,
            selectedTime: selectedTime!,
            personInCharge,
          },
        })
      ) {
        return toast.error("No changes were made");
      }
      await updateBooking({
        bookingId,
        booking: {
          personInCharge,
          phoneNumber,
          selectedDate,
          selectedTime,
          customerName,
        },
      });
      toast.info(
        <ToastContent
          title="Updated a booking"
          description={`${selectedDate} at ${selectedTime} under ${personInCharge}`}
        />
      );
      if (phoneNumber !== bookingToBeUpdated?.phoneNumber) {
        createSecureCookiePN(phoneNumber);
      }
      router.push(`/my-bookings/${bookingId}`);
    } else {
      const bookingId = await createBooking({
        personInCharge,
        phoneNumber,
        selectedDate,
        selectedTime,
        customerName,
      });
      toast.info(
        <ToastContent
          title="Scheduled a booking"
          description={`${selectedDate} at ${selectedTime} under
              ${personInCharge}`}
        />
      );
      router.replace(`/my-bookings/${bookingId}`);
    }
  };
  const { selectedDate: inputSelectedDate, personInCharge } = useWatch({
    control: control,
  });

  const {
    data: bookedTimes,
    error: queryError,
    isFetching: isFetchingBookings,
    isFetched: isBookingsFetched,
  } = useQuery({
    queryKey: [
      "bookings",
      inputSelectedDate,
      startOfBookingTime,
      personInCharge,
    ],
    queryFn: () =>
      getBookedTimes({ person: personInCharge!, date: inputSelectedDate! }),
    staleTime: Infinity,
  });

  if (queryError) {
    throw new Error(queryError.message);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {bookingToBeUpdated ? (
        <SelectInput
          control={control}
          personInCharge={bookingToBeUpdated.personInCharge}
          setValue={setValue}
        />
      ) : null}
      <NameInput
        register={register}
        errorMsg={formErrors.customerName?.message}
      />
      <CustomPhoneInput
        control={control}
        name="phoneNumber"
        storedPhoneNumber={storedPhoneNumber}
        errorMsg={formErrors.phoneNumber?.message}
      />
      <DateInput
        control={control}
        setValue={setValue}
        previousSelectedDate={bookingToBeUpdated?.selectedDate}
        reset={reset}
        previousSelectedTime={bookingToBeUpdated?.selectedTime}
      />
      <TimeInput
        control={control}
        errors={formErrors}
        bookedTimes={bookedTimes!}
        isFetchingBookings={isFetchingBookings}
        previousSelectedTime={bookingToBeUpdated?.selectedTime}
        isBookingsFetched={isBookingsFetched}
        inputSelectedDate={inputSelectedDate}
        samePerson={personInCharge === bookingToBeUpdated?.personInCharge}
        isSelectedSameToPreviousDate={dayjs(inputSelectedDate).isSame(
          bookingToBeUpdated?.selectedDate,
          "day"
        )}
      />
      {bookingToBeUpdated ? (
        <DeleteBookingBtn booking={bookingToBeUpdated} />
      ) : null}
      <Button
        type="submit"
        disabled={isFetchingBookings ? true : isSubmitting}
        onClick={handleSubmit(onSubmit)}
        className="flex gap-2 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <Loader
            className="dark:fill-black fill-white"
            loadingWord={undefined}
          />
        ) : (
          "Submit"
        )}
      </Button>
    </form>
  );
}

export default BookingForm;
