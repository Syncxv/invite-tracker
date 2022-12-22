import { Message, MessageActionRow, MessageButton, CacheType, ButtonInteraction, TextChannel } from 'discord.js'
import { ButtonIds } from '../constants'
import { getTicket } from '../utils/isValidTicket'

export class TicketManager {
    async claimTicket(interaction: ButtonInteraction<CacheType>) {
        if (!interaction.isButton()) return
        const ticket = await getTicket(interaction)
        if (!ticket) return
        await ticket.updateOne({
            $set: { responder: interaction.user.id }
        })
        await (interaction.message as Message).edit({
            components: [
                new MessageActionRow().addComponents(
                    new MessageButton()
                        .setCustomId(ButtonIds.closeTicket)
                        .setLabel('Close')
                        .setStyle('DANGER')
                        .setEmoji('🔒'),

                    new MessageButton()
                        .setCustomId(ButtonIds.closeTicketWithReason)
                        .setLabel('Close With Reason')
                        .setStyle('DANGER')
                        .setEmoji('🔒')
                )
            ]
        })
        return await interaction.reply(`<@${interaction.user.id}> will handle yo ticket architecture boy`)
    }

    async closeTicket(interaction: ButtonInteraction<CacheType>) {
        if (!interaction.channel?.isText()) return
        const ticket = await getTicket(interaction)
        if (!ticket) return
        await ticket.updateOne({ $set: { status: 'closed' } })
        ;(interaction.channel as TextChannel).permissionOverwrites.edit(interaction.guildId!, { SEND_MESSAGES: false })
        await (interaction.message as Message).edit({
            components: [
                new MessageActionRow().addComponents(
                    new MessageButton()
                        .setCustomId(ButtonIds.reOpenTicket)
                        .setLabel('Re-Open')
                        .setStyle('PRIMARY')
                        .setEmoji('😎')
                )
            ]
        })
        interaction.reply(`ticket closed by <@${interaction.user.id}>`)
    }

    async reOpenTicket(interaction: ButtonInteraction<CacheType>) {
        if (!interaction.channel?.isText()) return
        const ticket = await getTicket(interaction)
        if (!ticket) return
        await ticket.updateOne({ $set: { status: 'open' } })
        ;(interaction.channel as TextChannel).permissionOverwrites.edit(interaction.guildId!, { SEND_MESSAGES: true })
        await (interaction.message as Message).edit({
            components: [
                new MessageActionRow().addComponents(
                    new MessageButton()
                        .setCustomId(ButtonIds.closeTicket)
                        .setLabel('Close')
                        .setStyle('DANGER')
                        .setEmoji('🔒'),

                    new MessageButton()
                        .setCustomId(ButtonIds.closeTicketWithReason)
                        .setLabel('Close With Reason')
                        .setStyle('DANGER')
                        .setEmoji('🔒')
                )
            ]
        })
        interaction.reply(`ticket re opened by <@${interaction.user.id}>`)
    }
}

export const ticketManager = ((global as any).ticketManager = new TicketManager())
