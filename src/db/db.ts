import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import {
  books,
  userBooks,
  user,
  session,
  account,
  verification,
} from "./schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL não definida");
}

const client = postgres(process.env.DATABASE_URL, {
  max: 10,
  idle_timeout: 20,
  connect_timeout: 10,
});

export const db = drizzle(client, {
  schema: {
    user,
    session,
    account,
    verification,
    books,
    userBooks,
  },
  logger: false,
});