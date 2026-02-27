//import { getServerSession } from "next-auth";
//import { NextResponse } from "next/server";
//import { authOptions } from "../../auth/[...nextauth]/route";

import { searchGoogleBooks } from "@/lib/services/google-book";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q");
    // TODO: descomentar bloco abaixo para proteger a rota
    /**
         const session = await getServerSession(authOptions);
    
        if (!session) {
            return NextResponse.json(
                { error: "Não autenticado" },
                { status: 401 }
            );
        }
     */
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
            thumbnail: item.volumeInfo.imageLinks?.thumbnail
        })) ?? [];

    return Response.json(mapped);
}
