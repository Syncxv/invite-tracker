import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'
import { Client, Intents } from 'discord.js'
import dotenv from 'dotenv'
import { apiMain } from './api'
import inviteManager from './classes/inviteManager'
dotenv.config()

import { getCommands } from './commands'
import database from './db/db'
import { UserClass } from './db/models/User'
import tryCatchExecute from './utils/tryCatch'

const { TOKEN } = process.env

export const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_INVITES, Intents.FLAGS.GUILD_MEMBERS]
})

const rest = new REST({ version: '9' }).setToken(TOKEN!)

const main = async () => {
    await database.initalize()
    const commands = await getCommands()
    const commandNames = commands.map(s => s.name)
    client.on('ready', async () => {
        console.log(`Logged in as ${client.user!.tag}!`)
        await inviteManager.initalize(client)
        rest.put(Routes.applicationCommands(client.user!.id), {
            body: commands
        }).catch(err => console.error(err))
    })
    client.on('interactionCreate', async interaction => {
        if (interaction.isCommand()) {
            const index = commandNames.indexOf(interaction.commandName)
            if (index != -1) {
                //TODO: i feel like you can use decorators for this but ill get to it later
                return tryCatchExecute(commands[index].execute)(interaction)
            }
        }
        if (interaction.isButton()) {
            console.log(interaction)
            interaction.reply({ content: ':)', ephemeral: true })
        }
    })

    client.on('messageCreate', async message => {
        if (message.guild) {
            await UserClass.incrementAttr(message.author.id, message.guild.id, 'messages')
        }
    })

    client.on('inviteCreate', inviteManager.onInviteCreate)
    client.on('inviteDelete', inviteManager.onInviteRemove)
    client.on('guildMemberAdd', inviteManager.onGuildMemberAdd)
    client.on('guildMemberRemove', inviteManager.onGuildMemberRemove)

    apiMain()
    client.login(TOKEN!)
}

main().catch(err => console.error(err))
