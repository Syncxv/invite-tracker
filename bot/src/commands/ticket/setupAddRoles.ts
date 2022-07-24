import { GuildMember } from 'discord.js'
import { ApplicationCommandOptionTypes } from 'discord.js/typings/enums'
import { GuildClass } from '../../db/models/Guild'
import { SubCommand } from '../../types'
import { createEmbed } from '../../utils/createEmbed'
import { getSubCommandOptions } from '../../utils/getSubCommandOptions'

export const setupAddRoles: SubCommand = {
    type: ApplicationCommandOptionTypes.SUB_COMMAND,
    name: 'setup-add-roles',
    description: 'add the roles who can see the tickets idk man',
    options: [
        {
            name: 'role',
            description: 'choose the role that can view the tickets',
            type: ApplicationCommandOptionTypes.ROLE,
            required: true
        }
    ],
    execute: async interaction => {
        console.log(interaction)
        if (!interaction.guild) return
        if (!(interaction.member as GuildMember).permissions.has('ADMINISTRATOR'))
            return await interaction.reply({ content: 'only admins can do this', ephemeral: true })
        const [role] = getSubCommandOptions(interaction)
        console.log(role)
        const guild = await GuildClass.getGuild(interaction.guild.id)
        await guild.updateOne({
            $push: { ticketRoleIds: role.value! }
        })
        await interaction.reply({
            content: 'ADDED!',
            embeds: [createEmbed({ type: 'success', description: 'added the role gg ez' })]
        })
    }
}
