import { authOptions } from "@/auth";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// import NextAuth from "next-auth"
// import GithubProvider from "next-auth/providers/github"
// import { signIn } from "next-auth/react"
// export const authOptions = {
//   // Configure one or more authentication 
//   pages : {
//     signIn : '/auth/login'
//   },
//   providers: [
//     GithubProvider({
//       clientId: '',
//       clientSecret: '',
//     }),
//     // ...add more providers here
//   ],
// }
// export default NextAuth(authOptions)