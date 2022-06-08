import { Command } from '../types'

const Ping: Command = {
    name: 'ping',
    description: 'Hi',
    execute: async e => {
        e.reply('Pong!')
    }
}

export default Ping
