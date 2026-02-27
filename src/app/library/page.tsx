import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { ProfileCard } from "@/components/ProfileCard";

import { redirect } from "next/navigation";
import { Container } from "@/components/Container";
import { signOut } from "next-auth/react";
import { getUserById } from "@/lib/db/queries/user/getUserById";
import { getUserBooks } from "@/lib/db/queries/user/getUserBooks";
import { Card } from "@/components/ui/card";

export default async function LibraryPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const user = await getUserById(session.user.id);
  const userBooks = await getUserBooks(session.user.id);
  if (!user) {
    await signOut();
    redirect("/login");

  };

  console.log(user);
  return (
    <Container>

      <div className="flex">
        <ProfileCard
          image={session.user.image ?? ''}
          username={user.username ?? ''}
          bio={user.bio ?? ''}
          realname={user.realname ?? ''}
        />
      </div>
      <h1 className="text-2xl font-bold text-center my-4">Sua biblioteca</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {userBooks.map((book) => (
          <Card
            key={book.bookId}
            className="group cursor-pointer overflow-hidden transition hover:shadow-lg"
          >
            <div className="aspect-2/3 w-full overflow-hidden bg-muted">
              {book.coverUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={book.coverUrl}
                  alt={`Capa do livro ${book.title}`}
                  className="h-full w-full object-cover transition group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                  Sem capa
                </div>
              )}
            </div>

            <div className="p-3 space-y-1">
              <h2 className="text-sm font-semibold line-clamp-2">
                {book.title}
              </h2>

              {book.authors && (
                <p className="text-xs text-muted-foreground line-clamp-1">
                  {book.authors}
                </p>
              )}

              <p className="text-xs mt-1">
                {book.status}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </Container>
  );
}