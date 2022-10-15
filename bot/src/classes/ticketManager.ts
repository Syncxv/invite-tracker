import {
    GuildMember,
    GuildMemberRoleManager,
    Message,
    MessageActionRow,
    MessageButton,
    CacheType,
    ButtonInteraction,
    TextChannel
} from 'discord.js'
import { ButtonIds } from '../constants'
import { isValidticket } from '../utils/isValidTicket'

export class TicketManager {
    async claimTicket(interaction: ButtonInteraction<CacheType>) {
        if (!interaction.isButton()) return
        const isValid = await isValidticket(interaction)
        if (!Array.isArray(isValid)) return
        const [guild, ticket] = isValid
        //check if they in the role list
        if (
            interaction.user.id !== interaction.guild!.ownerId &&
            !(interaction.member as GuildMember).permissions.has('ADMINISTRATOR') &&
            !(interaction.member!.roles as GuildMemberRoleManager).cache.hasAny(...guild.ticketRoleIds)
        )
            return await interaction.reply({
                content: 'only staff can do that :| if you a staff do `/ticket setup-add-roles` and add your role gg ez',
                ephemeral: true
            })
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
        return await interaction.reply(`<@${interaction.user.id}> will handle yo ticket wigga boy`)
    }

    async closeTicket(interaction: ButtonInteraction<CacheType>) {
        const isValid = await isValidticket(interaction)
        if (!Array.isArray(isValid)) return
        const [guild, ticket] = isValid
        if (
            interaction.user.id !== interaction.guild!.ownerId &&
            !(interaction.member as GuildMember).permissions.has('ADMINISTRATOR') &&
            !(interaction.member!.roles as GuildMemberRoleManager).cache.hasAny(...guild.ticketRoleIds)
        )
            return await interaction.reply({
                content: 'only staff can do that :| if you a staff do `/ticket setup-add-roles` and add your role gg ez',
                ephemeral: true
            })
        await ticket.updateOne({ $set: { status: 'closed' } })
        if (!interaction.channel?.isText()) return
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
        const isValid = await isValidticket(interaction)
        if (!Array.isArray(isValid)) return
        const [guild, ticket] = isValid
        if (
            interaction.user.id !== interaction.guild!.ownerId &&
            !(interaction.member as GuildMember).permissions.has('ADMINISTRATOR') &&
            !(interaction.member!.roles as GuildMemberRoleManager).cache.hasAny(...guild.ticketRoleIds)
        )
            return await interaction.reply({
                content: 'only staff can do that :| if you a staff do `/ticket setup-add-roles` and add your role gg ez',
                ephemeral: true
            })
        await ticket.updateOne({ $set: { status: 'open' } })
        if (!interaction.channel?.isText()) return
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
