import { ButtonInteraction, CacheType, GuildMember, GuildMemberRoleManager } from 'discord.js'
import { GuildClass } from '../db/models/Guild'
import { TicketClass, TicketModel } from '../db/models/Ticket'
import { MongoDocument } from '../types'

export const getTicket = async (interaction: ButtonInteraction<CacheType>): Promise<MongoDocument<TicketClass> | false> => {
    if (!interaction.guild) {
        await interaction.reply({ content: 'bruh where tf is the guild architecture', ephemeral: true })
        return false
    }

    const guild = await GuildClass.getGuild(interaction.guild.id)
    const ticket = await TicketModel.findOne({ channelId: interaction.channelId })
    if (!guild.isSetUp() || ticket == null) {
        await interaction.reply({
            content:
                'bruh how did you even mnage to do this, SET UP YOU SERVER FIRST do /ticket setup-auto OOOOOR the ticket may not exist :|',
            ephemeral: true
        })
        return false
    }
    if (
        interaction.user.id !== interaction.guild!.ownerId &&
        !(interaction.member as GuildMember).permissions.has('ADMINISTRATOR') &&
        !(interaction.member!.roles as GuildMemberRoleManager).cache.hasAny(...guild.ticketRoleIds)
    ) {
        await interaction.reply({
            content: 'only staff can do that :| if you a staff do `/ticket setup-add-roles` and add your role gg ez',
            ephemeral: true
        })
        return false
    }
    return ticket
}
