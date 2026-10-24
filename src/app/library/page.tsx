import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { ProfileCard } from "@/components/ProfileCard";
import { redirect } from "next/navigation";
import { Container } from "@/components/Container";
import { getUserById } from "@/lib/db/queries/user/getUserById";
import { getUserBooks } from "@/lib/db/queries/user/getUserBooks";
import { LibraryBigIcon, PlusCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BookCard } from "@/components/BookCard";

export default async function LibraryPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const user = await getUserById(session.user.id);
  const userBooks = await getUserBooks(session.user.id);
  if (!user) {
    redirect("/login");

  };
  return (
    <Container className="pt-4">
      <div className="flex">
        <ProfileCard
          image={user.image ?? ''}
          username={user.username ?? ''}
          bio={user.biography ?? ''}
          realname={user.realname ?? ''}
          booksRead={userBooks.filter((book) => book.status === 'read').length}
          pagesRead={userBooks
            .reduce((t, b) => Number(t) + Number(b.pages), 0)}
          isOwner
          publicProfileLink={`/user/${user.username}`}
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
        {userBooks.length === 0 && (
          <div className="relative flex w-full max-w-md flex-col items-center gap-5 rounded-2xl border border-dashed px-6 py-16 text-center">
            <div className="relative">
              <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.25),transparent_70%)]" />
              <div className="bg-muted relative flex size-20 items-center justify-center rounded-full">
                <LibraryBigIcon className="size-10 text-muted-foreground" />
              </div>
            </div>
            <div className="space-y-2">
                <h2 className="text-2xl font-bold">
                  Sua estante está{" "}
                  <span className="text-primary">
                    vazia
                  </span>
                </h2>
              <p className="text-muted-foreground">
                Adicione seus livros favoritos para acompanhar seu progresso de leitura e manter suas resenhas em um só lugar.
              </p>
            </div>
            <Button asChild variant="outline" className="cursor-pointer">
              <Link href="/library/add" className="flex items-center gap-2">
                <PlusCircleIcon size={18} />
                Adicionar meu primeiro livro
              </Link>
            </Button>
          </div>
        )}
        {userBooks.map((book) => (
          <BookCard
            key={book.bookId}
            bookId={book.bookId}
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