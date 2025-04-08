import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import clientPromise from "@/lib/mongodb";
import { ObjectId, Double } from "mongodb";
import { MongoServerError } from "mongodb";
import { allowedEmails } from "@/lib/utils";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credenciales",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        try {
          const client = await clientPromise;
          const users = client.db().collection("users");

          const user = await users.findOne({ email: credentials?.email });

          if (!user) {
            console.warn("❌ Usuario no encontrado");
            return null;
          }

          const passwordValid = await bcrypt.compare(
            credentials!.password,
            user.password
          );

          if (!passwordValid) {
            console.warn("❌ Contraseña incorrecta");
            return null;
          }

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (err) {
          console.error("❌ Error en authorize:", err);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role ?? "usuario";
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },

    async signIn({ user, account }) {

      if (!user.email || !allowedEmails.includes(user.email)) {
        console.warn("❌ Email no permitido:", user.email);
        return false; // Cancela el login
      }
      const client = await clientPromise;
      const db = client.db();
      const users = db.collection("users");

      const existingUser = await users.findOne({ email: user.email });

      if (!existingUser) {
        try {
          await users.insertOne({
            email: user.email,
            name: user.name || "",
            surname: "",
            authProvider: account?.provider || "google",
            authId: account?.providerAccountId || "",
            role: "user",
            phone: "",
            password: "",
            picture: user.image || "",
            description: "",
            time: new Date(),
            pines: [new ObjectId("000000000000000000000000")],
            contributor: new Double(0.0),
            lost: false,
            location: null,
            rewardPins: new Double(0.0),
            objects: [new ObjectId("000000000000000000000000")],
          });
        } catch (err) {
          if (err instanceof MongoServerError) {
            console.error(
              "❌ Error al insertar el usuario:",
              JSON.stringify(err.errInfo, null, 2)
            );
          } else {
            console.error("❌ Error desconocido al insertar el usuario:", err);
          }
          return false; // cancela el login
        }
      }

      return true;
    },
  },
};
