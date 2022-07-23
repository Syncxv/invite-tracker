import { prop } from '@typegoose/typegoose'
import { GuildModel } from '.'
import { InvitesBruh } from './User'

export type Status = 'open' | 'closed'

export class GuildClass {
    @prop()
    guildId: string

    @prop()
    public messages: number

    @prop()
    public invites: InvitesBruh

    public static async createGuild(
        guildId: string,
        messages: number = 0,
        invites: InvitesBruh = { joins: 0, leaves: 0, fake: 0, bonus: 0 }
    ) {
        const guild = new GuildModel({ guildId, messages, invites })
        await guild.save()
        return guild
    }
}
