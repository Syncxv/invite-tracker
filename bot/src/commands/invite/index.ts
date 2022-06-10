import { ApplicationCommandOptionTypes } from 'discord.js/typings/enums'
import { Command } from '../../types'
import { inviteLeaderBoards } from './inviteLeaderboards'
import { invitesWigga } from './invites'

const Invite: Command = {
    name: 'invite',
    description: 'bruh',
    options: [
        {
            type: ApplicationCommandOptionTypes.SUB_COMMAND,
            name: 'leaderboard',
            description: 'shows who has the most invites and sheet'
        },
        {
            type: ApplicationCommandOptionTypes.SUB_COMMAND,
            name: 'invites',
            options: [
                {
                    name: 'user',
                    description: 'see invites for this a user',
                    type: ApplicationCommandOptionTypes.USER,
                    required: false
                }
            ],
            description: 'see how many invites a user has'
        }
    ],
    execute: async interaction => {
        console.log(interaction)
        const [command] = interaction.options.data
        switch (command.name) {
            case 'leaderboard':
                return await inviteLeaderBoards(interaction)
            case 'invites':
                return invitesWigga(interaction)
            default:
                interaction.reply('WAHT')
        }
    }
}

export default Invite
