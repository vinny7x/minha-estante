import { getToken } from "next-auth/jwt";
import { type NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/library/:path*", "/logout", "/api/books/:path*", "/login"],
};

export async function proxy(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = request.nextUrl;

  // Usuário já autenticado não precisa da tela de login
  if (token && pathname === "/login") {
    return NextResponse.redirect(new URL("/library", request.url));
  }

  const isProtected =
    pathname.startsWith("/library") ||
    pathname.startsWith("/logout") ||
    pathname.startsWith("/api/books");

  if (!token && isProtected) {
    // APIs retornam 401 em JSON para não quebrar os fetches
    if (pathname.startsWith("/api/")) {
      return NextResponse.json(
        { error: "Não autenticado" },
        { status: 401 }
      );
    }

    // Páginas redirecionam para o login, guardando a rota de origem
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}