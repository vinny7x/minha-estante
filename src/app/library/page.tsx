import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { ProfileCard } from "@/components/ProfileCard";

import { redirect } from "next/navigation";
import { getUserWithBooks } from "@/lib/db/queries/user/getUserWithBookCount";
import { getUserBooks } from "@/lib/db/queries/user/getUserBooks";
import { Container } from "@/components/Container";
import { signOut } from "next-auth/react";

export default async function LibraryPage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  const user = await getUserWithBooks(session.user.id);

  if (!user) {
    await signOut()
    redirect("/login")

  };
  const userBooks = await getUserBooks(session.user.id);
  console.log(user);
  return (
    <Container>

      <div className="flex">
        <ProfileCard
          image={session.user.image ?? ''}
          username={user.username ?? ''}
          bio={user.bio ?? ''}
          realname={user.realname ?? ''}
          bookCounter={Number(user.bookCount) ?? 0}
        />
      </div>
    </Container>
  );
}