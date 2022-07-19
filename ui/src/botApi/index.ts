import { Session } from 'next-auth'
import { getSession } from 'next-auth/react'
import * as constants from '../constants'
import { Guild } from '../types/discord'
export class BotApi {
    async getGuilds(): Promise<Guild[]> {
        const session = await getSession()!
        const response = await fetch(`${constants.BOT_API}/api/v1/guilds/getConnectedGuilds/${session?.user.id}`, {
            headers: { Authorization: `Bearer ${session!.accessToken}` }
        })
        const data = await response.json()
        console.log(data)
        return data || []
    }
}

const botApi = new BotApi()
export default botApi
