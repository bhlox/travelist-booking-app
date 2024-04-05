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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  bookedTimes: string[];
  isFetchingBookings: boolean;
  previousSelectedTime: string | undefined;
  isBookingsFetched: boolean;
  inputSelectedDate: Date | undefined;
  samePerson: boolean;
  isSelectedSameToPreviousDate: boolean;
}) {
  // const [changePreviousTime, setChangePreviousTime] = useState(false);
  // const filterPassedTime = (time: Date) => {
  //   const currentDate = new Date();
  //   const selectedDate = new Date(time);

  //   return currentDate.getTime() < selectedDate.getTime();
  // };

  // const availableTimes = (date: Date) => {
  //   const formattedDate = dayjs(date).format("HH:mm");
  //   if (
  //     bookedTimes.find(
  //       (time) => formattedDate === dayjs(time).format("HH:mm")
  //     ) ||
  //     !openingTimes.includes(formattedDate)
  //   ) {
  //     return "dark:text-white/40 text-black/40 dark:bg-black bg-white cursor-not-allowed";
  //   }
  //   return "dark:text-white text-black dark:bg-black bg-white hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer";
  // };

  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor="time">Time</Label>
      {!isFetchingBookings ? (
        <Controller
          control={control}
          name="selectedTime"
          disabled={!isBookingsFetched}
          rules={{ required: { value: true, message: "Please select a time" } }}
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
                    disabled={bookedTimes.includes(hr)}
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
      {errors.selectedTime?.message && (
        <span className="text-red-500">{errors.selectedTime?.message}</span>
      )}
    </div>
  );
}
