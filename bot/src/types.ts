import { ApplicationCommandData, CommandInteraction } from 'discord.js'

export type Command = ApplicationCommandData & {
    execute: (interaction: CommandInteraction) => Promise<any>
}
