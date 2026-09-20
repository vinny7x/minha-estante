'use server';

import { getServerSession } from "next-auth";
import { and, eq } from "drizzle-orm";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/db/db";
import { userBooks } from "@/db/schema";

type DeleteBookInput = {
  bookId: string;
};

export async function deleteBook(data: DeleteBookInput) {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("usuário não autenticado");
  }

  await db
    .delete(userBooks)
    .where(
      and(
        eq(userBooks.userId, session.user.id),
        eq(userBooks.bookId, data.bookId)
      )
    );

  return { success: true };
}