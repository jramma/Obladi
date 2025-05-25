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

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  console.log("[Middleware] Ruta accedida:", pathname);

  // 1. Permitir TODOS los archivos estáticos (public/, _next/, etc.)
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

  // 3. Bloquear API si no está autenticado
  if (pathname.startsWith("/api")) {
    const token =
      req.cookies.get("next-auth.session-token")?.value ||
      req.cookies.get("__Secure-next-auth.session-token")?.value;

    if (!token) {
      return new NextResponse(
        JSON.stringify({ error: "No autorizado" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }
  }

  // 4. Para el resto de rutas no estáticas, requerir autenticación
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
     *   - Archivos estáticos (_next, static, extensiones comunes)
     *   - Pero SÍ incluye /api/ para proteger endpoints
     */
    "/((?!_next/static|_next/image|static|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|webp|gif|ico|css|js)$).*)",
    "/api/:path*" // Fuerza a que el middleware siempre revise /api/
  ],
};