import { Label } from "@/components/ui/label";
import { IBookingForm } from "@/lib/types";
import { useCounter } from "@uidotdev/usehooks";
import dayjs from "dayjs";
import React, { useState } from "react";
import {
  Control,
  Controller,
  UseFormReset,
  UseFormSetValue,
} from "react-hook-form";
import DatePicker from "react-datepicker";
import { Input } from "@/components/ui/input";
import { defaultStartingDate } from "@/lib/constants";

// #BUG when updating booking, from picking a new date to switching back to previous selected date, time input is correct BUT useform is stating that there is no value defined.
export default function DateInput({
  setValue,
  previousSelectedDate,
  reset,
  previousSelectedTime,
  control,
}: {
  setValue: UseFormSetValue<IBookingForm>;
  previousSelectedDate: string | undefined;
  reset: UseFormReset<IBookingForm>;
  previousSelectedTime: string | undefined;
  control: Control<IBookingForm, any>;
}) {
  const [open, setOpen] = useState(false);
  const [count, { increment }] = useCounter(0, {
    max: 1,
  });
  const date30DaysFromNow = dayjs().add(30, "day").toDate();
  const withtin30DaySpan = (date: Date) => {
    // if date is not within 30 day span adjust opacity of text
    if (date > dayjs().add(30, "day").toDate() || date <= dayjs().toDate()) {
      return "opacity-40 dark:text-white text-black cursor-not-allowed";
    }
    return "dark:text-white text-black dark:hover:bg-gray-700 hover:bg-gray-300 ";
  };

  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor="selectedDate">Date</Label>
      <Controller
        control={control}
        name="selectedDate"
        rules={{ required: true }}
        render={({ field }) => (
          <DatePicker
            {...field}
            showIcon
            id="dateInput"
            open={open}
            // onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            preventOpenOnFocus
            closeOnScroll
            customInput={<Input inputMode="none" />}
            dropdownMode="select"
            dateFormat="MM/d/yyyy"
            minDate={dayjs(defaultStartingDate).toDate()}
            maxDate={date30DaysFromNow}
            selected={dayjs(field.value).toDate()}
            timeIntervals={60}
            onInputClick={() => {
              count ? setOpen((c) => !c) : increment();
            }}
            onChange={(date) => {
              if (date) {
                field.onChange(dayjs(date).format("MM/DD/YYYY"));
                setOpen(false);
                if (
                  previousSelectedDate &&
                  dayjs(date).isSame(previousSelectedDate, "day")
                ) {
                  // reset(
                  //   {
                  //     personInCharge: "WTF",
                  //     selectedTime: dayjs(
                  //       `${previousSelectedDate} ${previousSelectedTime}`
                  //     ).format("HH:mm"),
                  //     selectedDate: previousSelectedDate,
                  //   },
                  //   { keepDefaultValues: true }
                  // );
                  return;
                  // setValue("selectedTime", undefined);
                }
                setValue("selectedTime", undefined);
              }
            }}
            calendarIconClassname="dark:fill-white fill-black"
            calendarClassName="dark:bg-black bg-white dark:text-white text-black border border-slate-800 border-4"
            weekDayClassName={() => "dark:text-white text-black"}
            dayClassName={withtin30DaySpan}
            className="text-black dark:bg-black dark:text-white border-2 text-center w-36 rounded border-gray-400 focus:border-black dark:border-gray-300"
          />
        )}
      />
    </div>
  );
}
