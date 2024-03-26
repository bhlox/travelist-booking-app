import { bookings } from "@/db/schema";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

export type SelectBookings = InferSelectModel<typeof bookings>;
export type InsertBookings = InferInsertModel<typeof bookings>;
export type UpdateBookings = Partial<InsertBookings>;

export type TODO = any;

export interface IBookingForm {
  personInCharge: string;
  customerName: string;
  phoneNumber: string;
  selectedDate: string;
  selectedTime: string | undefined;
  bookingId: number | undefined;
}
