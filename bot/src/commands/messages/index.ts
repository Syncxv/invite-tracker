import { Command } from '../../types'
import AddMessages from './addMessages'
import MessageLeaderboards from './messageLeaderboards'

const subCommands = {
    [AddMessages.name]: AddMessages,
    [MessageLeaderboards.name]: MessageLeaderboards
}

const Messages: Command = {
    name: 'messages',
    description: 'stuff to do with messages',
    options: [AddMessages, MessageLeaderboards],
    execute: async interaction => {
        console.log(interaction)
        const [command] = interaction.options.data
        subCommands[command.name].execute(interaction)
    }
}

export default Messages
