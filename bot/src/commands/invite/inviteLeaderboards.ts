import { Guild } from 'discord.js'
import { ApplicationCommandOptionTypes } from 'discord.js/typings/enums'
import { UserModel } from '../../db/models/User'
import { SubCommand } from '../../types'
import { createEmbed } from '../../utils/createEmbed'
import { getInvitesFormated } from './invites'

const inviteLeaderBoards: SubCommand = {
    type: ApplicationCommandOptionTypes.SUB_COMMAND,
    name: 'leaderboard',
    description: 'see the leaderboard eh',
    execute: async interaction => {
        ;(global as any).UserModel = UserModel
        const top10 = await UserModel.find({}, ['guilds', 'userId'], {
            limit: 10,
            sort: {
                [`guilds.${(interaction.guild as Guild).id}.invites.joins`]: -1
            }
        })
        return interaction.reply({
            embeds: [
                createEmbed({
                    type: 'brand',
                    title: 'Invite Leaderboard',
                    timestamp: new Date(),
                    description: (
                        await Promise.all(
                            top10.map((user, i) =>
                                getInvitesFormated(
                                    user,
                                    (interaction.guild as Guild).id,
                                    `\`${i + 1}. \` <@${user.userId}> •`
                                )
                            )
                        )
                    ).join('\n')
                })
            ]
        })
    }
}

export default inviteLeaderBoards
