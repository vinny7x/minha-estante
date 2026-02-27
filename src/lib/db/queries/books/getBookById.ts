import { db } from "@/db/db";
import { books } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getBookById(id: string){
    return db.query.books.findFirst({
        where: eq(books.id, id)
    })
}