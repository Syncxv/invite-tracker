import { CacheType, CommandInteraction } from 'discord.js'

export const getSubCommandOptions = (interaction: CommandInteraction<CacheType>) => {
    const [command] = interaction.options.data
    return command.options!
}
