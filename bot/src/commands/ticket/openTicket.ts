import { CategoryChannel } from 'discord.js'
import { ApplicationCommandOptionTypes } from 'discord.js/typings/enums'
import { GuildClass } from '../../db/models/Guild'
import { TicketClass } from '../../db/models/Ticket'
import { SubCommand } from '../../types'
import { getSubCommandOptions } from '../../utils/getSubCommandOptions'

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
            return await interaction.reply({ content: 'wigga boy do `/ticket setup-auto` first', ephemeral: true })
        const [reason] = getSubCommandOptions(interaction)
        await guild.updateOne({
            $push: {
                tickets: await TicketClass.createTicket(
                    interaction.guild.id,
                    interaction.user.id,
                    (reason?.value as string | undefined) || 'reason not provided'
                )
            }
        })
        const category = interaction.guild.channels.cache.get(guild.ticketCategoryId) as CategoryChannel
        await category.createChannel(`ticket ${guild.tickets.length + 1}`, {
            permissionOverwrites: [
                {
                    id: interaction.guild.id,
                    deny: ['VIEW_CHANNEL']
                },
                {
                    id: interaction.user.id,
                    allow: ['VIEW_CHANNEL']
                }
            ]
        })
        console.log(interaction, guild)
        ;(global as any).GuildClass = GuildClass
        await interaction.reply('welll well well')
    }
}
