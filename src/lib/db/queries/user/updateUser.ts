import { eq } from "drizzle-orm";
import { users } from "@/db/schema";
import { db } from "@/db/db";

type UpdateProfileData = {
  username?: string;
  realname?: string;
  bio?: string;
};

export async function updateUserProfile(
  id: string,
  data: UpdateProfileData
) {
  const [user] = await db
    .update(users)
    .set({
      username: data.username,
      realname: data.realname,
      bio: data.bio,
    })
    .where(eq(users.id, id))
    .returning();

  return user;
}