import { db } from "@/db/db";
import { user, userBooks } from "@/db/schema";
import { eq, count } from "drizzle-orm";

export async function getUserWithBooks(userId: string) {
  const result = await db
    .select({
      id: user.id,
      username: user.username,
      realname: user.realname,
      biography: user.biography,
      bookCount: count(userBooks.userId),
    })
    .from(user)
    .leftJoin(userBooks, eq(userBooks.userId, user.id))
    .where(eq(user.id, userId))
    .groupBy(user.id);

  return result[0];
}