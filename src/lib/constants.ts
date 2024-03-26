import dayjs from "dayjs";

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

export const defaultStartingDate = dayjs().add(1, "day").format("MM/DD/YYYY");

export const personsInCharge = [{ name: "bhlox" }, { name: "second" }];

export const startOfBookingTime = dayjs().unix();
