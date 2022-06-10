import { CacheType, CommandInteraction, Guild } from 'discord.js'
import { UserModel } from '../../db/models/User'
import { createEmbed } from '../../utils/createEmbed'
import { getInvitesFormated } from './invites'

export const inviteLeaderBoards = async (
    interaction: CommandInteraction<CacheType>
) => {
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
