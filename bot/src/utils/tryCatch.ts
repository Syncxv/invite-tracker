import { CacheType, CommandInteraction } from 'discord.js'
import { createEmbed } from './createEmbed'

const tryCatchExecute = (fn: Function) => {
    return async (interaction: CommandInteraction<CacheType>) => {
        try {
            await fn(interaction)
        } catch (err) {
            console.error(err)
            interaction.reply({
                embeds: [
                    createEmbed({
                        type: 'error',
                        title: 'Whoopsie',
                        description: 'THIS COMMAND IS BROKEN'
                    })
                ]
            })
        }
    }
}

export default tryCatchExecute
