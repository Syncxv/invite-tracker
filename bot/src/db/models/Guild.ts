import { getModelForClass, prop } from '@typegoose/typegoose'

export type Status = 'open' | 'closed'

export class GuildClass {
    @prop()
    public guildId: string

    @prop()
    public ticketCategoryId?: string

    public static async createGuild(guildId: string) {
        const guild = new GuildModel({ guildId })
        await guild.save()
        return guild
    }

    public static async getGuild(guildId: string) {
        const guild = await GuildModel.findOne({ guildId })
        if (!guild) return await this.createGuild(guildId)
        return guild
    }
}
//idk why but GuildClass is undefined in ./index.ts :|
export const GuildModel = getModelForClass(GuildClass)
