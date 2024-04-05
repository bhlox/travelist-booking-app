import { bookings } from "@/db/schema";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

export type SelectBookings = InferSelectModel<typeof bookings>;
export type SelectBookingsWithHandler = SelectBookings & {
  handler: {
    displayName: string;
    id: string;
  };
};
export type InsertBookings = InferInsertModel<typeof bookings>;
export type UpdateBookings = Partial<InsertBookings>;

export type TODO = any;

export interface IBookingForm {
  customerName: string;
  phoneNumber: string;
  selectedDate: Date;
  selectedTime: string;
  bookingId: number | undefined;
}

type OverrideBookingId<T> = Omit<T, "bookingId"> & { bookingId: number };

export type IUpdateBookingForm = OverrideBookingId<IBookingForm> & {
  handlerId: string;
};

export type BookingFormProps = {
  storedPhoneNumber: string | undefined;
  handlerId: string;
  bookingToBeUpdated: SelectBookingsWithHandler | undefined;
  handlerName: string;
  handlers?: {
    displayName: string;
    id: string;
  }[];
} & {
  bookingToBeUpdated: SelectBookingsWithHandler;
  handlers: {
    displayName: string;
    id: string;
  }[];
};
