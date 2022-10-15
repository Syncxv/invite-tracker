import {
    GuildMember,
    GuildMemberRoleManager,
    Message,
    MessageActionRow,
    MessageButton,
    CacheType,
    ButtonInteraction
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

    async closeTicket(_: ButtonInteraction<CacheType>) {}
}

export const ticketManager = ((global as any).ticketManager = new TicketManager())
