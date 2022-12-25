import { Request, Response } from 'express'
import { GuildClass } from '../../db/models/Guild'
;(global as any).GuildClass = GuildClass

export const inviteSettings = async (req: Request<{ userId: string }>, res: Response) => {
    return req.body, res
}
