import {
    BeAnObject,
    IObjectWithTypegooseFunction
} from '@typegoose/typegoose/lib/types'
import {
    ApplicationCommandData,
    ApplicationCommandOptionData,
    CommandInteraction
} from 'discord.js'
import { Document } from 'mongoose'

export type Command = ApplicationCommandData & {
    execute: (interaction: CommandInteraction) => Promise<any>
}
export type MongoDocument<T> = Document<string, BeAnObject, any> &
    T &
    IObjectWithTypegooseFunction & {
        _id: string
    }
export type SubCommand = ApplicationCommandOptionData & {
    execute: (interaction: CommandInteraction) => Promise<any>
    options?: ApplicationCommandOptionData[]
}
