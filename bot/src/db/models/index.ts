import { getModelForClass } from '@typegoose/typegoose'
import { GuildClass } from './Guild'
import { TicketClass } from './Ticket'
import { UserClass } from './User'

export const UserModel = getModelForClass(UserClass)
export const TicketModel = getModelForClass(TicketClass)
export const GuildModel = getModelForClass(GuildClass)
