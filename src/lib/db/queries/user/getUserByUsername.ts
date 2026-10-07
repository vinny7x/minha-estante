import { db } from "@/db/db";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getUserByUsername(username: string) {
    return db.query.user.findFirst({
        where: eq(user.username, username),
    });
}// Better Auth usa text/cuid ou uuid - configurar