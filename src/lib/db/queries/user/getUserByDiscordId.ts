import { db } from "@/db/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getUserByDiscordId(discordId: string | undefined){
   if(!discordId) return false
    return db.query.users.findFirst({
        where: eq(users.discordId, discordId)
    })
}