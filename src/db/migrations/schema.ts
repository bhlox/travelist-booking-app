import { pgTable, pgEnum, serial, date, time, varchar } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"

export const keyStatus = pgEnum("key_status", ['expired', 'invalid', 'valid', 'default'])
export const keyType = pgEnum("key_type", ['stream_xchacha20', 'secretstream', 'secretbox', 'kdf', 'generichash', 'shorthash', 'auth', 'hmacsha256', 'hmacsha512', 'aead-det', 'aead-ietf'])
export const factorStatus = pgEnum("factor_status", ['verified', 'unverified'])
export const factorType = pgEnum("factor_type", ['webauthn', 'totp'])
export const aalLevel = pgEnum("aal_level", ['aal3', 'aal2', 'aal1'])
export const codeChallengeMethod = pgEnum("code_challenge_method", ['plain', 's256'])


export const bookings = pgTable("bookings", {
	id: serial("id").primaryKey().notNull(),
	selectedDate: date("selected_date").notNull(),
	selectedTime: time("selected_time").notNull(),
	phoneNumber: varchar("phone_number", { length: 20 }).notNull(),
	personInCharge: varchar("person_in_charge", { length: 100 }).notNull(),
});