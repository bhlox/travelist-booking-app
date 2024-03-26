import {
  pgTable,
  pgEnum,
  serial,
  date,
  time,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey().notNull(),
  selectedDate: date("selected_date").notNull(),
  selectedTime: time("selected_time").notNull(),
  phoneNumber: varchar("phone_number", { length: 20 }).notNull(),
  personInCharge: varchar("person_in_charge", { length: 100 }).notNull(),
  customerName: varchar("customer_name", { length: 100 }).notNull(),
  bookedAt: timestamp("booked_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});
