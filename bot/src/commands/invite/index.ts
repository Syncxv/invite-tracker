import { Command } from '../../types'
import { getSubCommands } from '../../utils/getSubCommands'
import inviteIncrements from './inviteIncrement'
import inviteLeaderBoards from './inviteLeaderboards'
import invitesarchitecture from './invites'
const options = [invitesarchitecture, inviteLeaderBoards, ...inviteIncrements]

const subCommands = getSubCommands(options)

const Invite: Command = {
    name: 'invite',
    description: 'bruh',
    options,
    execute: async interaction => {
        console.log(interaction)
        const [command] = interaction.options.data
        subCommands[command.name].execute(interaction)
    }
}

export default Invite
