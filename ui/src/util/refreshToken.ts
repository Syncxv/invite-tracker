import axios from 'axios'
import { Routes } from 'discord-api-types/v10'
import { JWT } from 'next-auth/jwt'
import { URLSearchParams } from 'url'

export const refreshAccessToken = async (token: JWT) => {
    try {
        const formData = new URLSearchParams({
            client_id: process.env.NEXT_PUBLIC_CLIENT_ID!,
            client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET!,
            grant_type: 'refresh_token',
            refresh_token: token.refreshToken as string
        })

        // const { data } = await axios({
        //     method: 'POST',
        //     url: 'https://discord.com/api/v10/oauth2/token',
        //     headers: { 'content-type': 'application/x-www-form-urlencoded' },
        //     data: formData.toString()
        // })
        // console.log('GOT THE DATA: ', data)
        throw Error(':( doenst work rn idk why BRO IT SAYS INVALID GRANT WHY ')
        return {
            ...token
            // accessToken: data.access_token,
            // accessTokenExpires: Date.now() + data.expires_in * 1000,
            // refreshToken: data.refresh_token || token.refreshToken
        }
    } catch (err) {
        console.error(err)
        console.log('FAILED')
        return {
            ...token,
            error: 'why man'
        }
    }
}
