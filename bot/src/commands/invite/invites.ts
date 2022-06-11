import { GuildMember } from 'discord.js'
import { ApplicationCommandOptionTypes } from 'discord.js/typings/enums'
import { UserClass } from '../../db/models/User'
import { MongoDocument, SubCommand } from '../../types'
import { createEmbed } from '../../utils/createEmbed'

const InvitesWigga: SubCommand = {
    type: ApplicationCommandOptionTypes.SUB_COMMAND,
    name: 'count',
    description: 'see how many invites someone or yourself has :)',
    options: [
        {
            name: 'user',
            description: 'see invites for this a user',
            type: ApplicationCommandOptionTypes.USER,
            required: false
        }
    ],
    execute: async interaction => {
        const [userData] = interaction.options.data[0].options!
        if (!userData)
            return interaction.reply({
                embeds: [
                    createEmbed({
                        type: 'brand',
                        title: interaction.user.tag,
                        description: await getInvitesFormated(
                            (interaction.member as GuildMember).user.id,
                            interaction.guildId!,
                            'You currently have'
                        )
                    })
                ]
            })
        return interaction.reply({
            embeds: [
                createEmbed({
                    type: 'brand',
                    title: userData.user!.tag,
                    description: await getInvitesFormated(
                        userData.user!.id,
                        interaction.guildId!,
                        `<@${userData.user!.id}> currently has`
                    )
                })
            ]
        })
    }
}

export default InvitesWigga
type IOverload = {
    (
        user: MongoDocument<UserClass>,
        guildId: string,
        prefix: string
    ): Promise<string>
    (usersId: string, guildId: string, prefix: string): Promise<string>
}

export const getInvitesFormated: IOverload = async (
    userId: any,
    guildId: string,
    prefix: string
) => {
    if (typeof userId === 'string') {
        const user = await UserClass.getUser(userId, guildId)
        const { invites } = user.guilds[guildId]
        return `${prefix} **${invites.joins - invites.leaves}** (**${
            invites.joins
        }** regular, **${invites.leaves}** left, **${invites.fake}** fake, **${
            invites.bonus
        }** bonus)`
    }
    const { invites } = userId.guilds[guildId]
    return `${prefix} **${invites.joins - invites.leaves}** (**${
        invites.joins
    }** regular, **${invites.leaves}** left, **${invites.fake}** fake, **${
        invites.bonus
    }** bonus)`
}
