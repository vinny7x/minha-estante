import { notFound } from "next/navigation";
import { BookCard } from "@/components/BookCard";
import { Container } from "@/components/Container";
import { ProfileCard } from "@/components/ProfileCard";
import { LibraryBigIcon } from "lucide-react";
import { getCachedUserInfo } from "@/lib/cache/userInfoCache";

export const revalidate = 60;
export default async function UserPage({
    params,
}: {
    params: Promise<{ user: string; }>;
}) {
    const { user: username } = await params;

    const user = await getCachedUserInfo(decodeURIComponent(username));

    if (!user) notFound();

    const userBooks = user.userBooks;

    return (
        <Container>
            <div className="flex">
                <ProfileCard
                    image={user.user.image ?? ''}
                    username={user.user.username ?? ''}
                    bio={user.user.bio ?? ''}
                    realname={user.user.realname ?? ''}
                    booksRead={
                        userBooks.filter((book) => book.status === 'read').length
                    }
                    pagesRead={userBooks
                        .filter((book) => book.status === 'read')
                        .reduce((t, b) => Number(t) + Number(b.pages), 0)}
                />
            </div>

            <span className="flex items-center justify-center m-6 gap-2 flex-col md:flex-row">
                <h1 className="text-2xl font-bold text-center">
                    Estante de {user.user.username}
                </h1>
            </span>

            <div className="flex flex-wrap justify-center gap-6">
                {userBooks.length === 0 && (
                    <div className="relative flex w-full max-w-md flex-col items-center gap-5 rounded-2xl border border-dashed px-6 py-16 text-center">
                        <div className="relative">
                            <div className="bg-muted relative flex size-20 items-center justify-center rounded-full">
                                <LibraryBigIcon className="size-10 text-muted-foreground" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-2xl font-bold">
                                Estante{" "}
                                <span className="bg-linear-to-r from-indigo-400 to-sky-400 bg-clip-text text-transparent">
                                    vazia
                                </span>
                            </h2>
                            <p className="text-muted-foreground">
                                Este usuário ainda não adicionou livros à
                                estante.
                            </p>
                        </div>
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