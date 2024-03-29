import { ApplicationCommandOptionTypes, ChannelTypes } from 'discord.js/typings/enums'
import { GuildClass } from '../../db/models/Guild'
import { SubCommand } from '../../types'

export const setupAuto: SubCommand = {
    type: ApplicationCommandOptionTypes.SUB_COMMAND,
    name: 'setup-auto',
    description: 'does everything automatically',
    execute: async interaction => {
        if (!interaction.guild) return await interaction.reply({ content: 'bruh is this even a server', ephemeral: true })
        const guild = await GuildClass.getGuild(interaction.guild.id)
        if (guild.ticketCategoryId)
            return await interaction.reply({
                content: 'seems like its alreayd been setup before do `/ticket setup ticketCategory`',
                ephemeral: true
            })
        const ticketRole = await interaction.guild.roles.create({
            name: 'Ticket Support architecture',
            color: 'BLUE',
            reason: 'FOR THE BOT :|'
        })
        const category = await interaction.guild.channels.create('tickets', { type: ChannelTypes.GUILD_CATEGORY })
        await guild.updateOne({
            $set: {
                ticketCategoryId: category.id,
                ticketText: 'Welcome architecture boy wait for someone to claim yo ticket and help you :)'
            },
            $push: { ticketRoleIds: ticketRole.id }
        })
        await interaction.reply('welll well well')
    }
}
