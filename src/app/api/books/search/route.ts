import { searchGoogleBooks } from "@/lib/services/google-book";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q");
    if (!q) {
        return Response.json([]);
    }

    const res = await searchGoogleBooks(q.trim())


    const mapped =
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        res.items?.map((item: any) => ({
            id: item.id,
            title: item.volumeInfo.title,
            description: item.volumeInfo.description,
            authors: item.volumeInfo.authors?.join(", ") ?? "Desconhecido",
            thumbnail: item.volumeInfo.imageLinks?.thumbnail.replace('&edge=curl', ''),
            pages: item.volumeInfo.pageCount
        })) ?? [];

    return Response.json(mapped);
}
