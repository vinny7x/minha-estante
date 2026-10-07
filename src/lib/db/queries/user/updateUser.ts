import { eq } from "drizzle-orm";
import { user } from "@/db/schema";
import { db } from "@/db/db";

type UpdateProfileData = {
  username?: string;
  realname?: string;
  biography?: string;
};

export async function updateUserProfile(
  id: string,
  data: UpdateProfileData
) {
  const [updatedUser] = await db
    .update(user)
    .set({
      username: data.username,
      realname: data.realname,
      biography: data.biography,
      updatedAt: new Date(),
    })
    .where(eq(user.id, id))
    .returning();

  return updatedUser;
}