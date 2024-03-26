"use server";
import { db } from "@/db";
import { InsertBookings, UpdateBookings } from "../types";
import { bookings } from "@/db/schema";
import dayjs from "dayjs";
import { cookies } from "next/headers";
import { encrypt } from "../utils/encrypt";
import env from "../config/env";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const createSecureCookiePN = (pn: string) => {
  cookies().set({
    name: "pn",
    value: encrypt(pn),
    maxAge: 60 * 60 * 24 * 30,
    secure: env.NODE_ENV !== "development",
    httpOnly: true,
    sameSite: "strict",
  });
};

export const createBooking = async (booking: InsertBookings) => {
  const [{ bookingId }] = await db
    .insert(bookings)
    .values({ ...booking })
    .returning({ bookingId: bookings.id });
  // const storedPN = cookies().get("pn")?.value;
  // if (!storedPN) {
  createSecureCookiePN(booking.phoneNumber);
  // }
  revalidatePath("/my-bookings");
  return bookingId;
  // return { bookingId, didCreateCookie: storedPN ? false : true };
};

export const getBooking = async ({
  bookingId,
  phoneNumber,
}: {
  bookingId: string;
  phoneNumber: string;
}) => {
  const data = await db.query.bookings.findFirst({
    where: (bookings, { eq }) =>
      and(eq(bookings.id, +bookingId), eq(bookings.phoneNumber, phoneNumber)),
  });
  return data;
};

export const updateBooking = async ({
  booking,
  bookingId,
}: {
  bookingId: number;
  booking: UpdateBookings;
}) => {
  await db
    .update(bookings)
    .set({ ...booking })
    .where(eq(bookings.id, +bookingId));
  revalidatePath("/my-bookings");
  revalidatePath(`/my-bookings/${bookingId}`);
};

export const deleteBooking = async ({ bookingId }: { bookingId: number }) => {
  await db.delete(bookings).where(eq(bookings.id, bookingId));
  revalidatePath("/my-bookings");
};

export const getBookedTimes = async ({
  date,
  person,
}: {
  person: string;
  date: string;
}) => {
  const bookings = await db.query.bookings.findMany({
    where: (bookings, { eq }) =>
      and(eq(bookings.personInCharge, person), eq(bookings.selectedDate, date)),
    columns: { selectedTime: true, selectedDate: true },
  });
  const mappedData = bookings.map((item) =>
    dayjs(`${item.selectedDate} ${item.selectedTime}`).toDate()
  );
  return mappedData;
};

export const getMyBookings = async ({
  phoneNumber,
}: {
  phoneNumber: string | undefined;
}) => {
  const pn = phoneNumber;
  if (!pn) {
    return null;
  }
  const bookings = await db.query.bookings.findMany({
    where: (bookings, { eq }) => eq(bookings.phoneNumber, pn),
  });
  return bookings.length ? bookings : null;
};
