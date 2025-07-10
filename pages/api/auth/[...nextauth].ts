import { PrismaClient } from "@/generated/prisma";
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  session: {
    strategy: 'jwt'
  },
  providers: [
    CredentialsProvider({
        name: "Credentials",
        credentials: {
          username: { label: "Username", type: "text" },
          password: { label: "Password", type: "password" }
        },
        authorize: async(credentials) => {
            // console.log("credentials", credentials);
            if (!credentials) {
              throw new Error("Credentials is not provided");
            }
            if (!credentials.username || !credentials.password) {
              throw new Error("Username and password must be provided");
            }

            const admin = await prisma.admin.findUnique({
                where: {
                    username: credentials.username
                }
            })

            if (!admin) {
                throw new Error("No admin found");
            }

            if (admin.password !== credentials.password) {
              throw new Error("Username and password do not match")
            }
            
            return {id: admin.id.toString(), name: admin.username}

        }
        
        
    })
  ],
}

export default NextAuth(authOptions)