import { Command, SubCommand } from '../../types'
import { getSubCommands } from '../../utils/getSubCommands'
import { openTicket } from './openTicket'
import { setupAddRoles } from './setupAddRoles'
import { setupAuto } from './setupAuto'
const options: SubCommand[] = [openTicket, setupAuto, setupAddRoles]

const subCommands = getSubCommands(options)

const Invite: Command = {
    name: 'ticket',
    description: 'for the tickets bruh',
    options,
    execute: async interaction => {
        console.log(interaction)
        const [command] = interaction.options.data
        subCommands[command.name].execute(interaction)
    }
}

export default Invite
