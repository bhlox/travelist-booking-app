import { addDays } from "date-fns";
import dayjs from "dayjs";
import { DateAfter, DateBefore, Matcher } from "react-day-picker";

export const openingTimes = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

export const personsInCharge = [{ name: "bhlox" }, { name: "second" }];

export const startOfBookingTime = dayjs().unix();

export const disableWeekends: Matcher = (date) => {
  return date.getDay() === 0 || date.getDay() === 6;
};

export const validDays = {before: addDays(new Date(), 1), after: addDays(new Date(), 31) };
