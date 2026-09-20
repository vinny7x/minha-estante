'use server';

import { getServerSession } from "next-auth";
import { and, eq } from "drizzle-orm";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/db/db";
import { userBooks } from "@/db/schema";

type EditBookInput = {
  bookId: string;
  status: string;
  rating: number;
  review: string;
};

export async function editBook(data: EditBookInput) {
  const session = await getServerSession(authOptions);
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