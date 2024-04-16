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
import { lightFormat } from "date-fns";

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
  revalidatePath("/find-bookings");
  return bookingId;
  // return { bookingId, didCreateCookie: storedPN ? false : true };
};

// #TODO handler here a type of string & {}. figure out why. Probably because of it having a type of text???
export const getBooking = async ({
  bookingId,
  withPicture,
}: {
  bookingId: string;
  withPicture?: boolean;
}) => {
  const data = await db.query.bookings.findFirst({
    where: (bookings, { eq }) => and(eq(bookings.id, +bookingId)),
    with: {
      handler: {
        columns: { displayName: true, id: true, profilePicture: withPicture },
      },
    },
  });

  return data;
};

export const getTodayAndFutureBookings = async ({
  phoneNumber,
  withPicture,
}: {
  phoneNumber: string | undefined;
  withPicture?: boolean;
}) => {
  if (!phoneNumber) return [];
  const bookings = await db.query.bookings.findMany({
    where: (bookings, { eq, gte }) =>
      and(
        eq(bookings.phoneNumber, phoneNumber),
        gte(bookings.selectedDate, lightFormat(new Date(), "yyyy-MM-dd"))
      ),
    with: {
      handler: {
        columns: { displayName: true, id: true, profilePicture: withPicture },
      },
    },
  });
  return bookings.length ? bookings : [];
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
  revalidatePath("/find-bookings");
  revalidatePath(`/find-bookings/${bookingId}`);
};

export const deleteBooking = async ({ bookingId }: { bookingId: number }) => {
  await db.delete(bookings).where(eq(bookings.id, bookingId));
  revalidatePath("/find-bookings");
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
      and(eq(bookings.handler, person), eq(bookings.selectedDate, date)),
    columns: { selectedTime: true },
  });
  return bookings.map((booking) => booking.selectedTime.slice(0, 5));
};
