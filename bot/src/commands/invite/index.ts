import { Command, SubCommand } from '../../types'
import inviteLeaderBoards from './inviteLeaderboards'
import invitesWigga from './invites'
const options = [invitesWigga, inviteLeaderBoards]

const subCommands: { [x: string]: SubCommand } = options.reduce(
    (obj, subCommand) => ({ ...obj, [subCommand.name]: subCommand }),
    {}
)

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
