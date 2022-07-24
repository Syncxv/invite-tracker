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
import { GuildClass } from '../db/models/Guild'
import { TicketModel } from '../db/models/Ticket'

export class TicketManager {
    async claimTicket(interaction: ButtonInteraction<CacheType>) {
        if (!interaction.isButton()) return
        console.log(interaction)
        if (!interaction.guild) return await interaction.reply({ content: 'bruh where tf is the guild wigga', ephemeral: true })
        const guild = await GuildClass.getGuild(interaction.guild.id)
        const ticket = await TicketModel.findOne({ channelId: interaction.channelId })
        if (!guild.isSetUp() || ticket == null)
            return await interaction.reply({
                content:
                    'bruh how did you even mnage to do this, SET UP YOU SERVER FIRST do /ticket setup-auto OOOOOR the ticket may not exist :|',
                ephemeral: true
            })
        //check if they in the role list
        if (
            interaction.user.id !== interaction.guild.ownerId &&
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
                    new MessageButton().setCustomId(ButtonIds.close).setLabel('Close').setStyle('DANGER').setEmoji('🔒'),

                    new MessageButton()
                        .setCustomId(ButtonIds.createCloseWithReason(ButtonIds.closeWithReason))
                        .setLabel('Close With Reason')
                        .setStyle('DANGER')
                        .setEmoji('🔒')
                )
            ]
        })
        return await interaction.reply(`<@${interaction.user.id}> will handle yo ticket wigga boy`)
    }
}

export const ticketManager = ((global as any).ticketManager = new TicketManager())
