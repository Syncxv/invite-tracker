import { getModelForClass, prop } from '@typegoose/typegoose'
import { MongoDocument } from '../../types'

export type InvitesBruh = {
    joins: number
    leaves: number
    fake: number
    bonus: number
}

export interface Bruh {
    invites: InvitesBruh
    messages: number
    inviter?: string
}

export class UserClass {
    @prop()
    public userId?: string

    @prop()
    public guilds: {
        [guildId: string]: Bruh
    }

    public static async createUser(userId: string, guildId: string): Promise<MongoDocument<UserClass>> {
        const user = new UserModel({
            userId,
            guilds: {
                [guildId]: {
                    messages: 0,
                    invites: {
                        joins: 0,
                        leaves: 0,
                        fake: 0,
                        bonus: 0
                    }
                }
            }
        })
        await user.save()
        return user
    }

    public static async getUser(userId: string, guildId: string): Promise<MongoDocument<UserClass>> {
        const user = await UserModel.findOne({ userId })
        if (user == null) return await this.createUser(userId, guildId)
        const guild = user.guilds[guildId]
        if (!guild) {
            user.guilds[guildId] = {
                messages: 0,
                invites: {
                    joins: 0,
                    leaves: 0,
                    fake: 0,
                    bonus: 0
                }
            }
            await user.save()
        }
        return user
    }

    public static async incrementAttr(userId: string, guildId: string, attribute: keyof Bruh, amount = 1) {
        const usr = await this.getUser(userId, guildId)
        await usr.updateOne({
            $inc: { [`guilds.${guildId}.${attribute}`]: amount }
        })
    }
    public static async incrementInvite(userId: string, guildId: string, attribute: keyof InvitesBruh, amount = 1) {
        const usr = await this.getUser(userId, guildId)
        await usr.updateOne({
            $inc: { [`guilds.${guildId}.invites.${attribute}`]: amount }
        })
    }
    public static async setInviter(inviteeId: string, guildId: string, inviterId: string) {
        const usr = await this.getUser(inviteeId, guildId)
        await usr.updateOne({
            $set: { [`guilds.${guildId}.inviter`]: inviterId }
        })
    }
}

export const UserModel = getModelForClass(UserClass)
