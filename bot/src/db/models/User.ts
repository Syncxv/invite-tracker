import { getModelForClass, prop } from '@typegoose/typegoose'
import { MongoDocument } from '../../types'

interface Bruh {
    invites: number
    messages: number
}

export class UserClass {
    @prop()
    public userId?: string

    @prop()
    public guilds: {
        [guildId: string]: Bruh
    }

    public static async createUser(
        userId: string,
        guildId: string
    ): Promise<MongoDocument<UserClass>> {
        const user = new UserModel({
            userId,
            guilds: {
                [guildId]: {
                    messages: 0,
                    invites: 0
                }
            }
        })
        await user.save()
        return user
    }

    public static async getUser(
        userId: string,
        guildId: string
    ): Promise<MongoDocument<UserClass>> {
        const user = await UserModel.findOne({ userId })
        if (user == null) return await this.createUser(userId, guildId)
        const guild = user.guilds[guildId]
        if (!guild) {
            user.guilds[guildId] = {
                messages: 0,
                invites: 0
            }
            await user.save()
        }
        return user
    }

    public static async incrementAttr(
        userId: string,
        guildId: string,
        attribute: keyof Bruh,
        amount = 1
    ) {
        const usr = await this.getUser(userId, guildId)
        await usr.updateOne({
            $inc: { [`guilds.${guildId}.${attribute}`]: amount }
        })
    }
}

export const UserModel = getModelForClass(UserClass)
