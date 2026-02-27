"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/db/db";
import { userBooks } from "@/db/schema";
import { createNewBook } from "@/lib/db/queries/books/createNewBook";
import { getBookById } from "@/lib/db/queries/books/getBookById";
import { eq, and } from "drizzle-orm";
import { getServerSession } from "next-auth";

type SaveUserBookInput = {
  googleId: string;
  title: string;
  authors: string;
  thumbnail?: string;
  description?: string;
  status: string;
  rating: number;
  review: string;
};

export async function saveUserBook(data: SaveUserBookInput) {
    const session = await getServerSession(authOptions);
    if(!session) throw new Error('usuário nao autenticado')

  const existingBook = await getBookById(data.googleId);

  let bookId: string;

  if (!existingBook) {
    const newBook = await createNewBook({
      id: data.googleId,
      title: data.title,
      authors: data.authors,
      description: data.description,
      coverUrl: data.thumbnail,
    });

    bookId = newBook.id;
  } else {
    bookId = existingBook.id;
  }

  const alreadyExists = await db
    .select()
    .from(userBooks)
    .where(
      and(
        eq(userBooks.userId, session.user.id),
        eq(userBooks.bookId, bookId)
      )
    )
    .limit(1);

  if (alreadyExists.length > 0) {
    throw new Error("Livro já está na biblioteca.");
  }

  await db.insert(userBooks).values({
    userId: session.user.id,
    bookId,
    status: data.status,
    rating: data.rating.toString(),
    review: data.review,
  });

  return { success: true };
}