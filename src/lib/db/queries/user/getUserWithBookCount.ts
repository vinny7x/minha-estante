import { db } from "@/db/db";
import { users, userBooks } from "@/db/schema";
import { eq, count } from "drizzle-orm";

export async function getUserWithBooks(userId: string) {
  const result = await db
    .select({
      id: users.id,
      username: users.username,
      realname: users.realname,
      bio: users.bio,
      bookCount: count(userBooks.userId),
    })
    .from(users)
    .leftJoin(userBooks, eq(userBooks.userId, users.id))
    .where(eq(users.id, userId))
    .groupBy(users.id);

  return result[0];
}