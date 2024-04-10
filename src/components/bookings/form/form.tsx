"use client";
import {
  createBooking,
  getBookedTimes,
  updateBooking,
  createSecureCookiePN,
} from "@/lib/actions/bookings";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import React, { useState } from "react";
import { Controller, SubmitHandler, useForm, useWatch } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import CustomPhoneInput from "../../phone-input";
import {
  disableWeekends,
  openingTimes,
  startOfBookingTime,
  validDays,
} from "@/lib/constants";
import { cn, validateIfBookingValuesSame } from "@/lib/utils/utils";
import { useRouter } from "next/navigation";
import { Button } from "../../ui/button";
import Loader from "../../svg/loader";
import { toast } from "react-toastify";
import {
  BookingFormProps,
  IBookingForm,
  IUpdateBookingForm,
} from "@/lib/types";
import ToastContent from "@/components/ui/toast-content";
import { format, isSameDay, lightFormat, toDate } from "date-fns";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getDisabledTimeSlots } from "@/lib/actions/schedule";

// #TODO regarding storedPhoneNumber props, verify if you still need this

function BookingForm({
  storedPhoneNumber,
  handlerId,
  bookingToBeUpdated,
  handlerName,
  handlers,
}: BookingFormProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors: formErrors, isSubmitting, isSubmitSuccessful },
    setValue,
    reset,
  } = useForm<
    typeof bookingToBeUpdated extends undefined
      ? IBookingForm
      : IUpdateBookingForm
  >({
    shouldFocusError: false,
    defaultValues: {
      customerName: bookingToBeUpdated?.customerName,
      selectedDate: bookingToBeUpdated?.selectedDate
        ? toDate(bookingToBeUpdated?.selectedDate)
        : undefined,
      phoneNumber: storedPhoneNumber,
      bookingId: bookingToBeUpdated?.id,
      selectedTime: bookingToBeUpdated?.selectedTime.slice(0, 5),
      handlerId,
    },
  });

  const onSubmit: SubmitHandler<
    typeof bookingToBeUpdated extends undefined
      ? IBookingForm
      : IUpdateBookingForm
  > = async ({
    selectedDate,
    selectedTime,
    customerName,
    phoneNumber,
    bookingId,
    handlerId,
  }) => {
    const formattedDate = lightFormat(selectedDate, "yyyy-MM-dd");

    // bookingId condition here indicates that we are updating a record.
    if (bookingId) {
      if (
        validateIfBookingValuesSame({
          bookingToBeUpdated: bookingToBeUpdated!,
          ToBeCompared: {
            customerName,
            phoneNumber,
            selectedDate: formattedDate,
            selectedTime: selectedTime!,
            handler: handlerId,
          },
        })
      ) {
        return toast.error("No changes were made");
      }
      await updateBooking({
        bookingId,
        booking: {
          handler: handlerId,
          phoneNumber,
          selectedDate: formattedDate,
          selectedTime,
          customerName,
        },
      });
      toast.info(
        <ToastContent
          title="Updated a booking"
          description={`${formattedDate} at ${selectedTime} under ${handlerName}`}
        />
      );
      router.push(`/find-bookings/${bookingId}`);
    } else {
      const bookingId = await createBooking({
        handler: handlerId,
        phoneNumber,
        selectedDate: formattedDate,
        selectedTime,
        customerName,
      });
      toast.info(
        <ToastContent
          title="Scheduled a booking"
          description={`${formattedDate} at ${selectedTime} under ${handlerName}`}
        />
      );
      router.replace(`/find-bookings/${bookingId}`);
    }
  };
  const {
    selectedDate: inputSelectedDate,
    selectedTime,
    handlerId: handlerIdFormValue,
  } = useWatch({
    control: control,
  });

  const { data: disabledTimeSlots, isFetching: isFetchingDisabledTimeSlots } =
    useQuery({
      queryKey: ["disabledTimeSlots", handlerIdFormValue],
      queryFn: async () => {
        const data = await getDisabledTimeSlots(handlerIdFormValue!);
        return data;
      },
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
      handlerIdFormValue,
      startOfBookingTime,
    ],
    enabled: Boolean(inputSelectedDate),
    initialData: [],
    queryFn: () => {
      return getBookedTimes({
        person: handlerIdFormValue!,
        date: lightFormat(inputSelectedDate!, "yyyy-MM-dd"),
      });
    },
    // staleTime: Infinity,
  });

  // console.log(isBookingsFetched);
  // if (queryError) {
  //   throw new Error(queryError.message);
  // }

  const disabledDays =
    disabledTimeSlots
      ?.filter((time) => time.type === "day")
      .map((time) => time.date) ?? [];

  const disabledTimes = [
    ...(disabledTimeSlots
      ?.filter(
        (time) =>
          time.type === "time" &&
          inputSelectedDate &&
          isSameDay(time.date, inputSelectedDate)
      )
      .flatMap((time) => time.timeRanges) ?? []),
    ...bookedTimes,
  ].filter((value, index, arr) => arr.indexOf(value) === index);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {bookingToBeUpdated ? (
        <div className="flex flex-col gap-1">
          <Label htmlFor="handlerId">Handler</Label>
          <Controller
            control={control}
            name="handlerId"
            render={({ field }) => (
              <Select
                defaultValue={handlerId}
                onValueChange={(value) => {
                  field.onChange(value);
                  setValue("selectedDate", "" as any);
                  setValue("selectedTime", "");
                }}
              >
                <SelectTrigger className="w-[180px] border-gray-400 dark:border-gray-300 border-2">
                  <SelectValue placeholder="Select your person" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {handlers?.map((person) => (
                      <SelectItem key={`select-${person.id}`} value={person.id}>
                        {person.displayName}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </div>
      ) : null}
      {/* <NameInput
        register={register}
        errorMsg={formErrors.customerName?.message}
      /> */}
      <div className="flex flex-col gap-1">
        <Label htmlFor="customerName">Name</Label>
        <Input
          id="customerName"
          {...register("customerName", {
            required: { message: "Please enter your name", value: true },
          })}
          placeholder="Name"
          className={cn(
            "border-2 border-gray-400 focus:border-black dark:border-gray-300",
            undefined,
            {
              "dark:border-red-600 border-red-600":
                formErrors.customerName?.message,
            }
          )}
        />
        {formErrors.customerName?.message ? (
          <p className="text-red-500 text-sm font-semibold">
            {formErrors.customerName?.message}
          </p>
        ) : null}
      </div>
      <CustomPhoneInput
        control={control}
        name="phoneNumber"
        storedPhoneNumber={storedPhoneNumber}
        errorMsg={formErrors.phoneNumber?.message}
      />
      {/* <DateInput
        control={control}
        setValue={setValue}
        previousSelectedDate={bookingToBeUpdated?.selectedDate}
        reset={reset}
        previousSelectedTime={bookingToBeUpdated?.selectedTime}
      /> */}
      <div className="flex flex-col gap-1">
        <Label htmlFor="selectedDate">Date</Label>
        <Controller
          control={control}
          name="selectedDate"
          rules={{ required: true }}
          render={({ field }) => (
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  disabled={isFetchingDisabledTimeSlots}
                  variant={"outline"}
                  className={cn(
                    "pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto p-0"
                side="bottom"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={(date) => {
                    field.onChange(date);
                    setOpen(false);
                    setValue("selectedTime", "");
                  }}
                  disabled={[disableWeekends, validDays, ...disabledDays]}
                />
              </PopoverContent>
            </Popover>
          )}
        />
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="time">Time</Label>
        {!isFetchingBookings ? (
          <Controller
            control={control}
            name="selectedTime"
            // disabled={!isBookingsFetched}
            rules={{
              required: { value: true, message: "Please select a time" },
            }}
            // defaultValue={
            //   samePerson && previousSelectedTime && isSelectedSameToPreviousDate
            //     ? dayjs()
            //         .hour(+previousSelectedTime.slice(0, 2))
            //         .minute(0)
            //         .format("hh:mm a")
            //     : undefined
            // }
            render={({ field }) => (
              <Select
                key={`selectedTime-${field.value}`}
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
                disabled={!isBookingsFetched}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a starting time" />
                </SelectTrigger>
                <SelectContent>
                  {openingTimes.map((hr) => (
                    <SelectItem
                      key={`hr-${hr}`}
                      value={hr}
                      disabled={[...bookedTimes, ...disabledTimes].includes(hr)}
                    >
                      {hr}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        ) : (
          <Loader className="dark:fill-white" loadingWord="Loading..." />
        )}
        {formErrors.selectedTime?.message && (
          <span className="text-red-500">
            {formErrors.selectedTime?.message}
          </span>
        )}
      </div>
      {/* <TimeInput
        control={control}
        errors={formErrors}
        bookedTimes={bookedTimes!}
        isFetchingBookings={isFetchingBookings}
        previousSelectedTime={bookingToBeUpdated?.selectedTime}
        isBookingsFetched={isBookingsFetched}
        inputSelectedDate={inputSelectedDate!}
        samePerson={handlerId === bookingToBeUpdated?.handler}
        isSelectedSameToPreviousDate={dayjs(inputSelectedDate).isSame(
          bookingToBeUpdated?.selectedDate,
          "day"
        )}
      /> */}
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
