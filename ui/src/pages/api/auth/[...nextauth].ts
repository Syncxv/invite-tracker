import { REST } from '@discordjs/rest'
import NextAuth, { Account } from 'next-auth'
import Discord from 'next-auth/providers/discord'
import { AUTH_LINK } from '../../../util/getAuthLink'
import { Routes } from 'discord-api-types/v10'
import { URLSearchParams } from 'url'
import { JWT } from 'next-auth/jwt'

export const rest = new REST({ version: '10' })
const refreshToken = async (token: JWT) => {
    console.log('REFRESHING TOKEN', token, 'REFRESH TOKEN: ', token.refreshToken)
    rest.setToken(token.accessToken as string)
    const what = await rest.post(Routes.oauth2TokenRevocation(), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            client_id: process.env.NEXT_PUBLIC_CLIENT_ID!,
            client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET!,
            grant_type: 'refresh_token',
            refresh_token: token.refreshToken as string
        })
    })
    console.log('RESPONSE:', what)
    return {}
}
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
    callbacks: {
        async jwt({ account, user, token, profile }) {
            console.log('IN JWT CALLBACK', 'ACCOUNT: ', account, 'USER: ', user, 'TOKEN:', token)
            if (account && user) {
                return {
                    accessToken: account.access_token,
                    refreshToken: account.refresh_token,
                    accessTokenExpires: account.expires_at! * 1000,
                    user: { ...profile },
                    userId: account.providerAccountId
                }
            }
            if (Date.now() < (token.accessTokenExpires as number)) {
                console.log('OK TOKEN IS STILL VALID')
                return token
            }
            console.log('TOKEN HAS EXIRED')
            return refreshToken(token!)
        },
        async session({ session, user, token }) {
            console.log('IN SESSION CALLBACK', session, user, token)
            session.accessToken = token.accessToken
            session.refreshToken = token.refreshToken
            session.user = token.user as any
            return session
        }
    },
    secret: process.env.A_COOL_SECRET
})
