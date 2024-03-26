import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { SelectBookings } from "../types";
import dayjs from "dayjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function validateIfBookingValuesSame({
  bookingToBeUpdated,
  ToBeCompared,
}: {
  bookingToBeUpdated: SelectBookings;
  ToBeCompared: {
    customerName: string;
    phoneNumber: string;
    selectedDate: string;
    selectedTime: string;
    personInCharge: string;
  };
}) {
  const isDateSame = dayjs(ToBeCompared.selectedDate).isSame(
    bookingToBeUpdated?.selectedDate,
    "day"
  );

  const isTimeSame =
    dayjs(`${ToBeCompared.selectedDate} ${ToBeCompared.selectedTime}`).format(
      "HH:mm"
    ) ===
    dayjs(
      `${ToBeCompared.selectedDate} ${bookingToBeUpdated.selectedTime}`
    ).format("HH:mm");

  return (
    ToBeCompared.customerName === bookingToBeUpdated?.customerName &&
    ToBeCompared.phoneNumber === bookingToBeUpdated?.phoneNumber &&
    isDateSame &&
    ToBeCompared.personInCharge === bookingToBeUpdated?.personInCharge &&
    isTimeSame
  );
}
