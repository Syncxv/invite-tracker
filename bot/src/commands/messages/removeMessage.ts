import { ApplicationCommandOptionTypes } from 'discord.js/typings/enums'
import { UserModel } from '../../db/models/User'
import { SubCommand } from '../../types'
import { createEmbed } from '../../utils/createEmbed'

const RemoveMessage: SubCommand = {
    type: ApplicationCommandOptionTypes.SUB_COMMAND,
    name: 'remove',
    description: 'removes messages to specified user',
    options: [
        {
            name: 'user',
            description: 'remove messages from a user :)',
            type: ApplicationCommandOptionTypes.USER,
            required: true
        },
        {
            name: 'amount',
            description: 'how many messages you want removed',
            type: ApplicationCommandOptionTypes.INTEGER,
            required: true
        }
    ],
    execute: async interaction => {
        const [command] = interaction.options.data
        const [userData, amountData] = command.options!
        await UserModel.incrementAttr(
            userData.user!.id,
            interaction.guildId!,
            'messages',
            -(amountData.value as number)
        )
        interaction.reply({
            embeds: [
                createEmbed({
                    type: 'success',
                    timestamp: new Date(),
                    description: `You successfully added \`${
                        amountData.value
                    }\` messages to <@${userData.user!.id}>.`
                })
            ]
        })
    }
}

export default RemoveMessage
