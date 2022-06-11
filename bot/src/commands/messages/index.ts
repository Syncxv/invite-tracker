import { Command, SubCommand } from '../../types'
import AddMessages from './addMessages'
import MessageLeaderboards from './messageLeaderboards'
import RemoveMessage from './removeMessage'

const options = [AddMessages, MessageLeaderboards, RemoveMessage]

const subCommands: { [x: string]: SubCommand } = options.reduce(
    (obj, subCommand) => ({ ...obj, [subCommand.name]: subCommand }),
    {}
)

const Messages: Command = {
    name: 'messages',
    description: 'stuff to do with messages',
    options,
    execute: async interaction => {
        console.log(interaction)
        const [command] = interaction.options.data
        subCommands[command.name].execute(interaction)
    }
}

export default Messages
