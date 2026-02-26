import { db } from "@/db/db";
import { userBooks } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getUserBooks(userId: string) {
    const books = await db.select().from(userBooks).where(eq(userBooks.userId, userId));
    return books;
}