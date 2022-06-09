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

    public static async getUser(
        userId: string,
        guildId: string
    ): Promise<MongoDocument<UserClass>> {
        const bro = await UserModel.findOne({ userId })
        if (bro == null) {
            const wat = new UserModel({
                userId,
                guilds: {
                    [guildId]: {
                        messages: 0,
                        invites: 0
                    }
                }
            })
            await wat.save()
            return wat
        }
        const pls = bro.guilds[guildId]
        if (!pls) {
            bro.guilds[guildId] = {
                messages: 0,
                invites: 0
            }
            await bro.save()
        }
        return bro
    }

    public static async incrementAttr(
        userId: string,
        guildId: string,
        attribute: keyof Bruh,
        amount = 1
    ) {
        const usr = await this.getUser(userId, guildId)
        const what = `guilds.${guildId}.${attribute}`
        await usr.updateOne({ $inc: { [what]: amount } })
    }
}

export const UserModel = getModelForClass(UserClass)
