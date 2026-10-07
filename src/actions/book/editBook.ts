'use server';

import { and, eq } from "drizzle-orm";
import { db } from "@/db/db";
import { userBooks } from "@/db/schema";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";

type EditBookInput = {
  bookId: string;
  status: string;
  rating: number;
  review: string;
};

export async function editBook(data: EditBookInput) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    throw new Error("usuário não autenticado");
  }

  const isRead = data.status === "read";

  await db
    .update(userBooks)
    .set({
      status: data.status,
      rating: isRead ? data.rating.toString() : null,
      review: isRead ? data.review : null,
    })
    .where(
      and(
        eq(userBooks.userId, session.user.id),
        eq(userBooks.bookId, data.bookId)
      )
    );

  return { success: true };
}