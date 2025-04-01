import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { compare } from "bcryptjs";
import clientPromise from "@/lib/mongodb";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const client = await clientPromise;
        const db = client.db();

        const user = await db.collection("users").findOne({ email: credentials?.email });

        if (!user || !user.password) {
          throw new Error("No user found");
        }

        const isValid = await compare(credentials!.password, user.password);

        if (!isValid) {
          throw new Error("Invalid password");
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.rol,
          picture: user.picture
        };
      }
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],

  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.role = (user as any).role || "user";
      }

      // Si es nuevo login con Google, guardar usuario en tu DB
      if (account?.provider === "google") {
        const client = await clientPromise;
        const db = client.db();

        const existingUser = await db.collection("users").findOne({ email: token.email });

        if (!existingUser) {
          await db.collection("users").insertOne({
            email: token.email,
            authProvider: "google",
            authId: token.sub,
            name: token.name || "",
            surname: "",
            password: "", // No aplicable
            rol: "user",
            phone: "",
            mail: token.email,
            picture: token.picture || "",
            description: "",
            time: new Date(),
            pines: [],
            contributor: 0,
            lost: false,
            location: null,
            rewardPins: 0,
            foundObjects: {}
          });
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
        session.user.role = token.role as string;
      }
      return session;
    }
  },

  pages: {
    signIn: "/auth/signin"
  },

  session: {
    strategy: "jwt"
  },

  secret: process.env.NEXTAUTH_SECRET
});

export { handler as GET, handler as POST };
