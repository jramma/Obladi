import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_ROUTES = ["/", "/about", "/auth/signin", "/auth/signup", "/terms", "/privacy"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  console.log("Middleware triggered for:", pathname); // Debug

  // Permitir rutas públicas
  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  // Verificar autenticación en rutas no públicas (incluyendo /api)
  const token =
    req.cookies.get("next-auth.session-token")?.value ||
    req.cookies.get("__Secure-next-auth.session-token")?.value;

  if (!token) {
    const loginUrl = new URL("/auth/signin", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|static|favicon.ico).*)",  // Excluye archivos estáticos
    "/api/:path*"  // Incluye API
  ],
};