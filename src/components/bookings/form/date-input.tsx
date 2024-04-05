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
import {
  disableWeekends,
  validDays,
} from "@/lib/constants";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

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
  // const [count, { increment }] = useCounter(0, {
  //   max: 1,
  // });
  // const date30DaysFromNow = dayjs().add(30, "day").toDate();
  // const withtin30DaySpan = (date: Date) => {
  //   // if date is not within 30 day span adjust opacity of text
  //   if (date > dayjs().add(30, "day").toDate() || date <= dayjs().toDate()) {
  //     return "opacity-40 dark:text-white text-black cursor-not-allowed";
  //   }
  //   return "dark:text-white text-black dark:hover:bg-gray-700 hover:bg-gray-300 ";
  // };

  return (
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
            <PopoverContent className="w-auto p-0" side="bottom" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={(date) => {
                  field.onChange(date);
                  setOpen(false);
                  // form.resetField("startTime", {
                  //   defaultValue: "",
                  // });
                  // form.resetField("endTime", { defaultValue: "" });
                }}
                disabled={[disableWeekends, validDays]}
              />
            </PopoverContent>
          </Popover>
        )}
      />
    </div>
  );
}
