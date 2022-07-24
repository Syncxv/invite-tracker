import { getModelForClass, prop, Ref } from '@typegoose/typegoose'
import { TicketClass } from './Ticket'

export type Status = 'open' | 'closed'
export interface CreateTicketOptions {
    ticketCategoryId?: string
    ticketText?: string
}
export class GuildClass {
    @prop()
    public guildId: string

    @prop()
    public ticketCategoryId?: string

    @prop()
    public ticketText?: string

    @prop({ ref: () => TicketClass })
    public tickets: Ref<TicketClass>[]

    public static async createGuild(guildId: string, { ticketCategoryId, ticketText }: CreateTicketOptions) {
        const guild = new GuildModel({ guildId, ticketCategoryId, ticketText })
        await guild.save()
        return guild
    }

    public static async getGuild(guildId: string, opt: CreateTicketOptions = {}) {
        const guild = await GuildModel.findOne({ guildId })
        if (!guild) return await this.createGuild(guildId, opt)
        return guild.populate({ path: 'tickets' })
    }

    public static async set(guildId: string, keys: string, value: any) {
        const guild = await this.getGuild(guildId)
        await guild.updateOne({
            $set: { [keys]: value }
        })
    }
}
//idk why but GuildClass is undefined in ./index.ts :|
export const GuildModel = getModelForClass(GuildClass)
