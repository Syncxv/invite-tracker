import { ApplicationCommandOptionTypes } from 'discord.js/typings/enums'
import { UserModel } from '../../db/models/User'
import { SubCommand } from '../../types'
import { createEmbed } from '../../utils/createEmbed'

const MessageLeaderboards: SubCommand = {
    type: ApplicationCommandOptionTypes.SUB_COMMAND,
    name: 'leaderboard',
    description: 'see who has the most messages',
    execute: async interaction => {
        const top10 = await UserModel.find({}, ['guilds', 'userId'], {
            limit: 10,
            sort: {
                [`guilds.${interaction.guild!.id}.messages`]: -1
            }
        })
        interaction.reply({
            embeds: [
                createEmbed({
                    type: 'brand',
                    timestamp: new Date(),
                    title: 'Message Leaderboards',
                    description: top10
                        .map((user, i) => {
                            return `\`${i + 1}. \` <@${user.userId}> • **${
                                user.guilds[interaction.guild!.id].messages
                            }** messages sent`
                        })
                        .join('\n')
                })
            ]
        })
    }
}

export default MessageLeaderboards
