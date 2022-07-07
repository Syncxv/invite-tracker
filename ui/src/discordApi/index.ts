import { Session } from 'next-auth'
import { getSession } from 'next-auth/react'
import * as constants from '../constants'
export class DiscordAPI {
    async getGuilds() {
        const session = await getSession()!
        const response = await fetch(`${constants.DISCORD_API}/users/@me/guilds`, {
            headers: { Authorization: `Bearer ${session!.accessToken}` }
        })
        const data = await response.json()
        console.log(data)
    }
}

const discordApi = new DiscordAPI()
export default discordApi
