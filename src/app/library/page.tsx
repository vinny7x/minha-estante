import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { ProfileCard } from "@/components/ProfileCard";
import { redirect } from "next/navigation";
import { Container } from "@/components/Container";
import { getUserById } from "@/lib/db/queries/user/getUserById";
import { getUserBooks } from "@/lib/db/queries/user/getUserBooks";
import { PlusCircleIcon, LogOutIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BookCard } from "@/components/BookCard";

export default async function LibraryPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const user = await getUserById(session.user.id);
  const userBooks = await getUserBooks(session.user.id);
  if (!user) {
    redirect("/login");

  };


  return (
    <Container>
      <div className="flex justify-end">
        <Button asChild className="m-2 flex gap-2 cursor-pointer">
          <Link href="/logout" className="flex items-center gap-2">
            <LogOutIcon size={16} />
            Sair
          </Link>
        </Button>
      </div>
      <div className="flex">
        <ProfileCard
          image={session.user.image ?? ''}
          username={user.username ?? ''}
          bio={user.bio ?? ''}
          realname={user.realname ?? ''}
          booksRead={userBooks.filter((book) => book.status === 'read').length}
          pagesRead={userBooks
            .reduce((t, b) => Number(t) + Number(b.pages), 0)}
          isOwner
        />
      </div>
      <span className="flex items-center justify-center m-6 gap-2 flex-col md:flex-row">
        <h1 className="text-2xl font-bold text-center">Sua estante</h1>

        <Button asChild className="cursor-pointer">
          <Link href="/library/add" className="flex items-center gap-2">
            <PlusCircleIcon size={18} />
            Adicionar livro
          </Link>
        </Button>
      </span>
      <div className="flex flex-wrap justify-center gap-6">

        {userBooks.map((book) => (
          <BookCard
            key={book.bookId}
            authors={book.authors}
            coverUrl={book.coverUrl}
            title={book.title}
            status={book.status}
            rating={book.rating}
            review={book.review}
          />
        ))}
      </div>

    </Container>
  );
}