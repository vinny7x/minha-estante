import { db } from "@/db/db";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getUserById(userId: string ){
    return db.query.user.findFirst({
        where: eq(user.id, userId)
    })
}