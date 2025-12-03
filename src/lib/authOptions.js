import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { findUserByEmail } from "./usersDb";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "your@email.com" },
        password: { label: "Password", type: "password", placeholder: "password" }
      },
      async authorize(credentials) {
        try {
          // Validate input
          if (!credentials?.email || !credentials?.password) {
            console.error("Missing credentials");
            return null;
          }
          
          // Find user by email from shared database
          const user = findUserByEmail(credentials.email);
          
          if (user) {
            // Check if password matches
            const isValid = await bcrypt.compare(credentials.password, user.password);
            if (isValid) {
              // Return user object without password
              const { password, ...userWithoutPassword } = user;
              return userWithoutPassword;
            } else {
              console.error("Invalid password");
              return null;
            }
          }
          
          console.error("User not found");
          return null;
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET || 
         (process.env.NODE_ENV === "production" 
           ? undefined 
           : "dev_secret_for_testing_purpose_only"),
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  debug: process.env.NODE_ENV === "development", // Enable debug in development
};