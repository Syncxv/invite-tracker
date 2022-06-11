import NextAuth from 'next-auth'
import Discord from 'next-auth/providers/discord'
import { AUTH_LINK } from '../../../util/getAuthLink'
console.log(process.env)
export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        Discord({
            clientId: process.env.NEXT_PUBLIC_CLIENT_ID!,
            clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET!,
            authorization: AUTH_LINK
        })
        // ...add more providers here
    ],
    callbacks: {},
    secret: process.env.A_COOL_SECRET
})
