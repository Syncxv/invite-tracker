import { getModelForClass } from '@typegoose/typegoose'
import { TicketClass } from './Ticket'
import { UserClass } from './User'

console.log(UserClass, TicketClass)

export const UserModel = getModelForClass(UserClass)
export const TicketModel = getModelForClass(TicketClass)
