import {
  pgTable,
  foreignKey,
  pgEnum,
  serial,
  date,
  time,
  varchar,
  text,
  timestamp,
  unique,
  boolean,
  json,
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey().notNull(),
  selectedDate: date("selected_date").notNull(),
  selectedTime: time("selected_time").notNull(),
  phoneNumber: varchar("phone_number", { length: 20 }).notNull(),
  handler: text("handler")
    .notNull()
    .references(() => user.id),
  customerName: varchar("customer_name", { length: 100 }).notNull(),
  bookedAt: timestamp("booked_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  status: text("status").default("pending"),
});

export const session = pgTable("session", {
  id: text("id").primaryKey().notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "string",
  }).notNull(),
});

export const user = pgTable(
  "user",
  {
    id: text("id").primaryKey().notNull(),
    username: text("username").notNull(),
    hashedPassword: text("hashed_password").notNull(),
    role: text("role").default("staff"),
    displayName: text("display_name").default("person").notNull(),
    testRole: text("test_role"),
    email: text("email").notNull(),
    emailVerified: boolean("email_verified").default(false),
    description: text("description"),
    profilePicture: text("profile_picture")
      .default("/avatar_default.jpg")
      .notNull(),
  },
  (table) => {
    return {
      userUsernameUnique: unique("user_username_unique").on(table.username),
      userEmailUnique: unique("user_email_unique").on(table.email),
    };
  }
);

export const blockedSchedules = pgTable("blocked_schedules", {
  id: serial("id").primaryKey().notNull(),
  date: date("date").notNull(),
  timeRanges: json("time_ranges"),
  type: text("type").notNull(),
  handlerId: text("handlerID")
    .notNull()
    .references(() => user.id),
  comment: text("comment"),
  approved: boolean("approved").default(false).notNull(),
  statusUpdatedBy: text("status_updated_by").references(() => user.id),
});

export const emailVerificationCodes = pgTable("email_verification_codes", {
  id: serial("id").primaryKey().notNull(),
  email: text("email")
    .notNull()
    .references(() => user.email),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  code: text("code").notNull(),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "string",
  }).notNull(),
});

export const bookingsRelations = relations(bookings, ({ one }) => ({
  handler: one(user, {
    fields: [bookings.handler],
    references: [user.id],
  }),
}));

export const blockedSchedulesRelations = relations(
  blockedSchedules,
  ({ one }) => ({
    approver: one(user, {
      fields: [blockedSchedules.statusUpdatedBy],
      references: [user.id],
    }),
    handler: one(user, {
      fields: [blockedSchedules.handlerId],
      references: [user.id],
    }),
  })
);

export const usersRelations = relations(user, ({ many }) => ({
  bookings: many(bookings),
  sessions: many(session),
  blockedSchedules: many(blockedSchedules),
  emailVerificationCodes: many(emailVerificationCodes),
}));
