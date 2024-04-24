import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { Role, IUser } from "utils/types"

export const authOptions = {
  pages: {
    signIn: '/app/login',
  },
  // session: {
  //   // Choose how you want to save the user session.
  //   // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
  //   // If you use an `adapter` however, we default it to `"database"` instead.
  //   // You can still force a JWT session by explicitly defining `"jwt"`.
  //   // When using `"database"`, the session cookie will only contain a `sessionToken` value,
  //   // which is used to look up the session in the database.
  //   strategy: "jwt",

  //   // Seconds - How long until an idle session expires and is no longer valid.
  //   maxAge: 30 * 24 * 60 * 60, // 30 days
  // },
  callbacks: {
    async session({ session, user, token }) {
      session.user = token.user;
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.user = user;
      }
      return token
    }
  },
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "lux@luxru.top" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        const baseUrl = process.env.NEXTAUTH_URL
        const res = await fetch(`${baseUrl}/api/login`)
        const user = await res.json()

        // If no error and we have user data, return it
        if (user) {
          return user
        }
        // Return null if user data could not be retrieved
        return null
      }
    })
  ],
}

export default NextAuth(authOptions)