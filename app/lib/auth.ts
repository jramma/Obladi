import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github"; // o el proveedor que uses
import GoogleProvider from "next-auth/providers/google"; // otro ejemplo
import { getServerSession } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    // Puedes añadir más proveedores aquí
  ],
  secret: process.env.NEXTAUTH_SECRET,
};
