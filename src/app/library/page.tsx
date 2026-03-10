import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { ProfileCard } from "@/components/ProfileCard";
import { redirect } from "next/navigation";
import { Container } from "@/components/Container";
import { getUserById } from "@/lib/db/queries/user/getUserById";
import { getUserBooks } from "@/lib/db/queries/user/getUserBooks";
import { Card } from "@/components/ui/card";
import { Check, BookOpen, Bookmark, PlusCircleIcon, LogOutIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function LibraryPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const user = await getUserById(session.user.id);
  const userBooks = await getUserBooks(session.user.id);
  if (!user) {
    redirect("/login");

  };
  type BookStatus = "reading" | "read" | "wantToRead";

  const statusConfig: Record<
    BookStatus,
    {
      label: string;
      icon: React.ElementType;
      className: string;
    }
  > = {
    read: {
      label: "Lido",
      icon: Check,
      className: "bg-green-500 hover:bg-green-500/90 text-white",
    },
    reading: {
      label: "Lendo",
      icon: BookOpen,
      className: "bg-yellow-500 hover:bg-yellow-500/90 text-white",
    },
    wantToRead: {
      label: "Quero ler",
      icon: Bookmark,
      className: "bg-blue-500 hover:bg-blue-500/90 text-white",
    },
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
            .reduce((t, b) => Number(t) + Number(b.pages), 0)} />
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
          <Card
            key={book.bookId}
            className="group cursor-pointer overflow-hidden transition hover:shadow-lg pt-0 bg-muted basis-40 sm:basis-48 md:basis-56"
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

            <div className="p-2 space-y-1">
              <h2 className="text-sm font-semibold line-clamp-2">
                {book.title}
              </h2>

              {book.authors && (
                <p className="text-xs text-muted-foreground line-clamp-1">
                  {book.authors}
                </p>
              )}

              {book.status && statusConfig[book.status as BookStatus] ? (
                (() => {
                  const { label, icon: Icon, className } =
                    statusConfig[book.status as BookStatus];

                  return (
                    <Badge
                      className={clsx(
                        "flex items-center gap-1 text-xs font-medium",
                        className
                      )}
                    >
                      <Icon size={14} />
                      {label}
                    </Badge>
                  );
                })()
              ) : (
                <Badge variant="secondary" className="text-xs">
                  Desconhecido
                </Badge>
              )}
            </div>
          </Card>
        ))}
      </div>

    </Container>
  );
}