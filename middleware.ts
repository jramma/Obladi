import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_ROUTES = [
  "/",
  "/about",
  "/auth/signin",
  "/auth/signup",
  "/terms",
  "/privacy",
];

const ALLOWED_API_ROUTES = [
  "/api/auth/", // Permite todas las rutas de NextAuth
  "/api/hcaptcha/", // Si usas hCaptcha
];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  console.log("[Middleware] Ruta accedida:", pathname);

  // 1. Permitir TODOS los archivos estáticos
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/static/") ||
    pathname.match(/\.(svg|png|jpg|jpeg|webp|gif|ico|css|js|woff|woff2)$/)
  ) {
    return NextResponse.next();
  }

  // 2. Permitir rutas públicas definidas
  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  // 3. Permitir rutas API de autenticación
  if (ALLOWED_API_ROUTES.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // 4. Bloquear otras APIs si no está autenticado
  if (pathname.startsWith("/api")) {
    const token =
      req.cookies.get("next-auth.session-token")?.value ||
      req.cookies.get("__Secure-next-auth.session-token")?.value;

    if (!token) {
      return new NextResponse(
        JSON.stringify({ error: "Acceso no autorizado" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }
  }

  // 5. Para el resto de rutas no estáticas, requerir autenticación
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
    /*
     * Matcher optimizado:
     * - Aplica middleware a todas las rutas EXCEPTO:
     *   - Archivos estáticos
     *   - Pero SÍ incluye /api/ para proteger endpoints
     */
    "/((?!_next/static|_next/image|static|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|webp|gif|ico|css|js)$).*)",
    "/api/:path*"
  ],
};