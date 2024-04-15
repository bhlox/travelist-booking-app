import { pgTable, foreignKey, pgEnum, serial, date, time, varchar, text, timestamp, unique, boolean, json } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"

export const keyStatus = pgEnum("key_status", ['default', 'valid', 'invalid', 'expired'])
export const keyType = pgEnum("key_type", ['aead-ietf', 'aead-det', 'hmacsha512', 'hmacsha256', 'auth', 'shorthash', 'generichash', 'kdf', 'secretbox', 'secretstream', 'stream_xchacha20'])
export const factorType = pgEnum("factor_type", ['totp', 'webauthn'])
export const factorStatus = pgEnum("factor_status", ['unverified', 'verified'])
export const aalLevel = pgEnum("aal_level", ['aal1', 'aal2', 'aal3'])
export const codeChallengeMethod = pgEnum("code_challenge_method", ['s256', 'plain'])
export const equalityOp = pgEnum("equality_op", ['eq', 'neq', 'lt', 'lte', 'gt', 'gte', 'in'])
export const action = pgEnum("action", ['INSERT', 'UPDATE', 'DELETE', 'TRUNCATE', 'ERROR'])


export const bookings = pgTable("bookings", {
	id: serial("id").primaryKey().notNull(),
	selectedDate: date("selected_date").notNull(),
	selectedTime: time("selected_time").notNull(),
	phoneNumber: varchar("phone_number", { length: 20 }).notNull(),
	handler: text("handler").notNull().references(() => user.id),
	customerName: varchar("customer_name", { length: 100 }).notNull(),
	bookedAt: timestamp("booked_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	status: text("status").default('pending'),
});

export const session = pgTable("session", {
	id: text("id").primaryKey().notNull(),
	userId: text("user_id").notNull().references(() => user.id),
	expiresAt: timestamp("expires_at", { withTimezone: true, mode: 'string' }).notNull(),
});

export const user = pgTable("user", {
	id: text("id").primaryKey().notNull(),
	username: text("username").notNull(),
	hashedPassword: text("hashed_password").notNull(),
	role: text("role").default('staff'),
	displayName: text("display_name").default('person').notNull(),
	testRole: text("test_role"),
	email: text("email").notNull(),
	emailVerified: boolean("email_verified").default(false),
	description: text("description"),
	profilePicture: text("profile_picture").default('/avatar_default.jpg').notNull(),
},
(table) => {
	return {
		userUsernameUnique: unique("user_username_unique").on(table.username),
		userEmailUnique: unique("user_email_unique").on(table.email),
	}
});

export const blockedSchedules = pgTable("blocked_schedules", {
	id: serial("id").primaryKey().notNull(),
	date: date("date").notNull(),
	timeRanges: json("time_ranges"),
	type: text("type").notNull(),
	handlerId: text("handlerID").notNull().references(() => user.id),
	comment: text("comment"),
	approved: boolean("approved").default(false).notNull(),
	statusUpdatedBy: text("status_updated_by").references(() => user.id),
});

export const emailVerificationCodes = pgTable("email_verification_codes", {
	id: serial("id").primaryKey().notNull(),
	email: text("email").notNull().references(() => user.email),
	userId: text("user_id").notNull().references(() => user.id),
	code: text("code").notNull(),
	expiresAt: timestamp("expires_at", { withTimezone: true, mode: 'string' }).notNull(),
});