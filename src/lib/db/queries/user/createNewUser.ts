import { InferInsertModel } from "drizzle-orm";
import { users } from "@/db/schema";
import { db } from "@/db/db";

type NewUser = InferInsertModel<typeof users>;

export async function createNewUser(data: NewUser) {
  const [user] = await db
    .insert(users)
    .values(data)
    .returning();

  return user;
}