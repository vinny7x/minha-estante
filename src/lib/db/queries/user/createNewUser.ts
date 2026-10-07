import { InferInsertModel } from "drizzle-orm";
import { user } from "@/db/schema";
import { db } from "@/db/db";

type NewUser = InferInsertModel<typeof user>;

export async function createNewUser(data: NewUser) {
  const [NewUser] = await db
    .insert(user)
    .values(data)
    .returning();

  return NewUser;
}