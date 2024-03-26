import { openingTimes } from "@/lib/constants";
import { IBookingForm } from "@/lib/types";
import dayjs from "dayjs";
import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import DatePicker from "react-datepicker";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils/utils";
import { Label } from "@/components/ui/label";
import Loader from "@/components/svg/loader";

export default function TimeInput({
  control,
  errors,
  bookedTimes,
  isFetchingBookings,
  previousSelectedTime,
  isBookingsFetched,
  inputSelectedDate,
  samePerson,
  isSelectedSameToPreviousDate,
}: {
  control: Control<IBookingForm, any>;
  errors: FieldErrors<IBookingForm>;
  bookedTimes: Date[];
  isFetchingBookings: boolean;
  previousSelectedTime: string | undefined;
  isBookingsFetched: boolean;
  inputSelectedDate: string | undefined;
  samePerson: boolean;
  isSelectedSameToPreviousDate: boolean;
}) {
  // const [changePreviousTime, setChangePreviousTime] = useState(false);
  // const filterPassedTime = (time: Date) => {
  //   const currentDate = new Date();
  //   const selectedDate = new Date(time);

  //   return currentDate.getTime() < selectedDate.getTime();
  // };

  const availableTimes = (date: Date) => {
    const formattedDate = dayjs(date).format("HH:mm");
    if (
      bookedTimes.find(
        (time) => formattedDate === dayjs(time).format("HH:mm")
      ) ||
      !openingTimes.includes(formattedDate)
    ) {
      return "dark:text-white/40 text-black/40 dark:bg-black bg-white cursor-not-allowed";
    }
    return "dark:text-white text-black dark:bg-black bg-white hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer";
  };

  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor="time">Time</Label>
      {!isFetchingBookings && isBookingsFetched ? (
        <Controller
          control={control}
          name="selectedTime"
          rules={{ required: { value: true, message: "Please select a time" } }}
          defaultValue={
            samePerson && previousSelectedTime && isSelectedSameToPreviousDate
              ? dayjs()
                  .hour(+previousSelectedTime.slice(0, 2))
                  .minute(0)
                  .format("hh:mm a")
              : undefined
          }
          render={({ field }) => {
            const fieldValue = dayjs(field.value).isValid()
              ? field.value
              : dayjs(`${inputSelectedDate} ${field.value}`).toDate();
            return (
              <DatePicker
                {...field}
                id="timeInput"
                // selected={dayjs(field.value).toDate()}
                selected={
                  // previousSelectedTime && !changePreviousTime
                  // ? dayjs(
                  //     dayjs()
                  //       .hour(+previousSelectedTime.slice(0, 2))
                  //       .minute(0)
                  //       .format("YYYY/MM/DD HH:mm a")
                  //   ).toDate()
                  // : field.value
                  field.value ? dayjs(fieldValue).toDate() : null
                }
                onChange={(date) => {
                  if (date) {
                    // if (previousSelectedTime && !changePreviousTime) {
                    //   setChangePreviousTime(true);
                    // }
                    field.onChange(date);
                  }
                }}
                disabled={isFetchingBookings}
                shouldCloseOnSelect
                closeOnScroll
                placeholderText={
                  isFetchingBookings ? "Loading..." : "pick a time"
                }
                autoComplete="off"
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={60}
                timeCaption="Time"
                dateFormat="h:mm a"
                customInput={<Input inputMode="none" />}
                // filterTime={filterPassedTime}
                excludeTimes={bookedTimes}
                minTime={dayjs().hour(8).minute(0).toDate()}
                maxTime={dayjs().hour(17).minute(0).toDate()}
                calendarClassName="dark:bg-black bg-white dark:text-white text-black border border-slate-800 border-4"
                timeClassName={availableTimes}
                className={cn(
                  "text-black dark:bg-black dark:text-white rounded border-gray-400 focus:border-black dark:border-gray-300 border-2 w-28 text-center py-1 text-sm md:text-base disabled:cursor-not-allowed",
                  null,
                  {
                    "dark:border-red-600 border-red-600":
                      errors.selectedTime?.message,
                  }
                )}
              />
            );
          }}
        />
      ) : (
        <Loader className="dark:fill-white" loadingWord="Loading..." />
      )}
      {errors.selectedTime?.message && (
        <span className="text-red-500">{errors.selectedTime?.message}</span>
      )}
    </div>
  );
}
