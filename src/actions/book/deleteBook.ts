'use server';

import { and, eq } from "drizzle-orm";
import { db } from "@/db/db";
import { userBooks } from "@/db/schema";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";

type DeleteBookInput = {
  bookId: string;
};

export async function deleteBook(data: DeleteBookInput) {
  const session = await auth.api.getSession({ headers: await headers() });
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