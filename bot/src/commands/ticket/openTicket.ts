import { ApplicationCommandOptionTypes } from 'discord.js/typings/enums'
import { GuildClass } from '../../db/models/Guild'
import { SubCommand } from '../../types'

export const openTicket: SubCommand = {
    type: ApplicationCommandOptionTypes.SUB_COMMAND,
    name: 'open',
    description: 'open a new ticket wigga boy',
    options: [
        {
            name: 'reason',
            description: 'why tf are you opening the ticket?',
            type: ApplicationCommandOptionTypes.STRING,
            required: false
        }
    ],
    execute: async interaction => {
        if (!interaction.guild) return await interaction.reply({ content: 'bruh is this even a server', ephemeral: true })
        const guild = await GuildClass.getGuild(interaction.guild.id)
        if (!guild.ticketCategoryId)
            return await interaction.reply({ content: 'wigga boy do /ticket setup first', ephemeral: true })
        await interaction.reply('welll well well')
    }
}
