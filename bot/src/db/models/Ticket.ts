import { getModelForClass, prop } from '@typegoose/typegoose'
import { UserClass } from './User'

export type Status = 'open' | 'closed'

export class TicketClass {
    @prop()
    public client: UserClass

    @prop()
    public responder: UserClass

    @prop()
    public status: Status

    @prop()
    public closeReason?: string

    public static async createTicket(clientId: string, responderId: string, guildId: string) {
        const client = await UserClass.getUser(clientId, guildId)
        const responder = await UserClass.getUser(responderId, guildId)

        const ticket = new TicketModel({
            client,
            responder,
            status: 'open'
        })
        await ticket.save()
        return ticket
    }
}
export const TicketModel = getModelForClass(TicketClass)
