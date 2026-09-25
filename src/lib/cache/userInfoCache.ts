import { unstable_cache } from "next/cache";

import { getUserBooks } from "@/lib/db/queries/user/getUserBooks";
import { getUserByUsername } from "@/lib/db/queries/user/getUserByUsername";

export const getCachedUserInfo = (username: string) =>
    unstable_cache(
        async () => {
            const user = await getUserByUsername(username);

            if (!user) return null;

            const userBooks = await getUserBooks(user.id);

            return {
                user ,
                userBooks,
            };
        },
        ["user-page", username],
        {
            revalidate: 60,
            tags: [`user-info:${username}`],
        }
    )();