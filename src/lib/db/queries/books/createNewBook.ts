import { InferInsertModel } from "drizzle-orm";
import { books } from "@/db/schema";
import { db } from "@/db/db";

type NewBook = InferInsertModel<typeof books>;

export async function createNewBook(data: NewBook) {
  const [book] = await db
    .insert(books)
    .values(data)
    .returning();

  return book;
}