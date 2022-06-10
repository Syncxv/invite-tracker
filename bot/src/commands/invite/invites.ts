import { CacheType, CommandInteraction, GuildMember } from 'discord.js'
import { UserClass } from '../../db/models/User'
import { MongoDocument } from '../../types'
import { createEmbed } from '../../utils/createEmbed'

export const invitesWigga = async (
    interaction: CommandInteraction<CacheType>
) => {
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
