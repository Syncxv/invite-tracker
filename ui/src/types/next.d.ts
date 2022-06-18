import NextAuth from 'next-auth'

declare module 'next-auth' {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            accent_color: null
            avatar: string
            avatar_decoration: null
            banner: null
            banner_color: null
            discriminator: string
            email: string
            flags: number
            id: string
            image_url: string
            locale: string
            mfa_enabled: boolean
            public_flags: number
            username: string
        }
    }
}
