import { ApplicationCommandOptionTypes } from 'discord.js/typings/enums'
import { client } from '..'
import { UserModel } from '../db/models/User'
import { Command } from '../types'

const AddMessages: Command = {
    name: 'addmessages',
    description: 'adds messages to specified user',
    options: [
        {
            name: 'user',
            description: 'the user you want to add the messages to :|',
            type: ApplicationCommandOptionTypes.USER,
            required: true
        },
        {
            name: 'amount',
            description: 'how many messages you want added',
            type: ApplicationCommandOptionTypes.INTEGER,
            required: true
        }
    ],
    execute: async interaction => {
        const [userData, amountData] = interaction.options.data
        await UserModel.incrementAttr(
            userData.user!.id,
            interaction.guildId!,
            'messages',
            amountData.value as number
        )
        interaction.reply({
            embeds: [
                {
                    footer: {
                        text: 'Invite Tracker',
                        iconURL: client.user!.avatarURL()!
                    },
                    color: '#04d275',
                    author: {
                        name: 'Success',
                        iconURL:
                            'https://cdn.discordapp.com/attachments/766372306192695401/984432589769150474/iconmonstr-check-mark-1-240.png'
                    },
                    description: `You successfully added \`${
                        amountData.value
                    }\` messages to <@${userData.user!.id}>.`
                }
            ]
        })
    }
}

export default AddMessages
