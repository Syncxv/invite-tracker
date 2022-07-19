import { Request, Response } from 'express'
import { client } from '../..'

export const getConnectedGuilds = async (
    req: Request<{ userId: string }>,
    res: Response
) => {
    ;(global as any).client = client
    ;(global as any).userId = req.params.userId
    ;(global as any).req = req
    const { userId } = req.params
    const allGuilds = client.guilds.cache.filter(guild => {
        if (guild.ownerId === userId) return true
        if (
            guild.members.cache
                .get(userId as string)
                ?.permissions.has('ADMINISTRATOR')
        )
            return true
        return false
    })
    console.log(allGuilds)
    res.send(allGuilds)
}
