import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

console.warn(process.env.GOOGLE_CLIENT_ID)
console.warn(process.env.GOOGLE_CLIENT_SECRET)

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    signIn: '/signin',
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    redirect: async ({ baseUrl }) => {
      return `${baseUrl}/auth/home`
    },
    // session: async (data) => {
    //   return data
    // }
  },
})
