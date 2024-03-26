import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import env from "@/lib/config/env";

export const client = postgres(env.DB_URL, { prepare: false });
export const db = drizzle(client, { schema });
