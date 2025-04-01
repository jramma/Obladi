import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

const clientPromise = new MongoClient(process.env.MONGODB_URI!).connect();

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
        const client = await clientPromise;
        const users = client.db().collection("users");

        const user = await users.findOne({ email: credentials?.email });

        if (!user) {
          throw new Error("Usuario no encontrado");
        }

        const passwordValid = await bcrypt.compare(
          credentials!.password,
          user.password
        );

        if (!passwordValid) {
          throw new Error("Contraseña incorrecta");
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.rol,
        };
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
        token.rol = user.rol ?? "usuario";
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.rol = token.rol as string;
      }
      return session;
    },
    async signIn({ user, account }) {
      const client = await clientPromise;
      const db = client.db();
      const users = db.collection("users");

      const existingUser = await users.findOne({ email: user.email });

      if (!existingUser) {
        await users.insertOne({
          email: user.email,
          name: user.name || "",
          surname: "",
          authProvider: "google",
          rol: "user",
          phone: "",
          mail: user.email,
          picture: user.image || "",
          description: "",
          time: new Date(),
          pines: [],
          contributor: 0,
          lost: false,
          location: null,
          rewardPins: 0,
          foundObjects: {},
        });
      }

      return true;
    },
  },
};
