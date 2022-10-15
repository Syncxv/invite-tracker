import { ButtonInteraction, CacheType } from 'discord.js'
import { GuildClass } from '../db/models/Guild'
import { TicketClass, TicketModel } from '../db/models/Ticket'
import { MongoDocument } from '../types'

export const isValidticket = async (
    interaction: ButtonInteraction<CacheType>
): Promise<[MongoDocument<GuildClass>, MongoDocument<TicketClass>] | false> => {
    if (!interaction.guild) {
        await interaction.reply({ content: 'bruh where tf is the guild wigga', ephemeral: true })
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

    return [guild, ticket]
}
