import { getModelForClass, prop, Ref } from '@typegoose/typegoose'
import { UserClass } from './User'

export type Status = 'open' | 'closed'

export class TicketClass {
    @prop({ ref: () => UserClass })
    public client: Ref<UserClass>

    @prop()
    public responder?: Ref<UserClass>

    @prop()
    public status: Status

    @prop()
    public reason?: string

    @prop()
    public closeReason?: string

    public static async createTicket(guildId: string, clientId: string, reason?: string, responderId?: string) {
        const client = await UserClass.getUser(clientId, guildId)
        const responder = responderId ? await UserClass.getUser(responderId, guildId) : undefined

        const ticket = new TicketModel({
            client,
            responder,
            reason,
            status: 'open'
        })
        await ticket.save()
        return ticket
    }
}
export const TicketModel = getModelForClass(TicketClass)
