import { CategoryChannel, MessageActionRow, MessageButton, OverwriteResolvable } from 'discord.js'
import { ApplicationCommandOptionTypes } from 'discord.js/typings/enums'
import { GuildClass } from '../../db/models/Guild'
import { TicketClass } from '../../db/models/Ticket'
import { SubCommand } from '../../types'
import { getSubCommandOptions } from '../../utils/getSubCommandOptions'
import { ButtonIds, Colors } from '../../constants'
import { client } from '../..'
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
        const category = interaction.guild.channels.cache.get(guild.ticketCategoryId) as CategoryChannel
        const channel = await category.createChannel(`ticket ${guild.tickets.length + 1}`, {
            permissionOverwrites: [
                {
                    id: interaction.guild.id,
                    deny: ['VIEW_CHANNEL']
                },
                {
                    id: interaction.user.id,
                    allow: ['VIEW_CHANNEL']
                },
                ...(guild.ticketRoleIds.map(s => ({ id: s, allow: ['VIEW_CHANNEL'] })) as OverwriteResolvable[])
            ]
        })
        const ticket = await TicketClass.createTicket(
            channel.id,
            interaction.guild.id,
            interaction.user.id,
            (reason?.value as string | undefined) || 'reason not provided'
        )
        await guild.updateOne({
            $push: {
                tickets: ticket
            }
        })
        const row = new MessageActionRow().addComponents(
            new MessageButton().setCustomId(ButtonIds.close).setLabel('Close').setStyle('DANGER').setEmoji('🔒'),

            new MessageButton()
                .setCustomId(ButtonIds.createCloseWithReason(ButtonIds.closeWithReason))
                .setLabel('Close With Reason')
                .setStyle('DANGER')
                .setEmoji('🔒'),

            new MessageButton().setCustomId(ButtonIds.claim).setLabel('Claim').setStyle('SUCCESS').setEmoji('😎')
        )
        await channel.send({
            content: 'HEHHE HA HOW WAS YOUR DAY',
            components: [row],
            embeds: [
                {
                    title: (reason?.value as string | undefined) || 'reason not provided',
                    description: guild.ticketText,
                    color: Colors.success,
                    footer: {
                        text: 'Invite Tracker',
                        iconURL: client.user!.avatarURL()!
                    }
                }
            ]
        })
        console.log(interaction, guild)
        ;(global as any).GuildClass = GuildClass
        await interaction.reply(`created ticket at <#${channel.id}>`)
    }
}
