import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  const { pathname } = request.nextUrl;

  if (session && pathname === "/login") {
    return NextResponse.redirect(new URL("/library", request.url));
  }

  const isProtected =
    pathname.startsWith("/library") ||
    pathname.startsWith("/logout") ||
    pathname.startsWith("/api/books");

  if (!session && isProtected) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json(
        { error: "Não autenticado" },
        { status: 401 }
      );
    }
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/library/:path*", "/logout", "/api/books/:path*", "/login"],
};