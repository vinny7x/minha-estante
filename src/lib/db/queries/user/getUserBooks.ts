import { db } from "@/db/db";
import { userBooks, books } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getUserBooks(userId: string) {
  const result = await db
    .select({
      id: userBooks.bookId,
      status: userBooks.status,
      rating: userBooks.rating,
      review: userBooks.review,
      bookId: books.id,
      title: books.title,
      authors: books.authors,
      coverUrl: books.coverUrl,
      description: books.description,
      pages: books.pages
    })
    .from(userBooks)
    .innerJoin(books, eq(userBooks.bookId, books.id))
    .where(eq(userBooks.userId, userId));

  return result;
}