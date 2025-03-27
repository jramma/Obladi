import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Aquí deberías verificar las credenciales en la base de datos
        if (
          credentials?.username === "user" &&
          credentials?.password === "password"
        ) {
          return { id: "1", name: "John Doe", email: "john@example.com" };
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt", // Usamos JWT para manejar la sesión
  },
  pages: {
    signIn: "/auth/signin", // Página de login
    error: "/auth/error", // Página de error
  },
});

export { handler as GET, handler as POST };
