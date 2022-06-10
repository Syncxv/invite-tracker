import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'
import { Client, Intents } from 'discord.js'
import dotenv from 'dotenv'
import inviteManager from './classes/inviteManager'
dotenv.config()

import { getCommands } from './commands'
import database from './db/db'
import { UserClass } from './db/models/User'

const { TOKEN } = process.env

export const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_MEMBERS
    ]
})

const rest = new REST({ version: '9' }).setToken(TOKEN!)

const main = async () => {
    await database.initalize()
    const commands = await getCommands()
    const commandNames = commands.map(s => s.name)
    client.on('ready', async () => {
        console.log(`Logged in as ${client.user!.tag}!`)
        await inviteManager.initalize(client)
        await rest.put(Routes.applicationCommands(client.user!.id), {
            body: commands
        })
    })
    client.on('interactionCreate', async interaction => {
        if (interaction.isCommand()) {
            const index = commandNames.indexOf(interaction.commandName)
            if (index != -1) {
                commands[index].execute(interaction)
            }
        }
    })

    client.on('messageCreate', async message => {
        if (message.guild) {
            await UserClass.incrementAttr(
                message.author.id,
                message.guild.id,
                'messages'
            )
        }
    })

    client.on('inviteCreate', inviteManager.onInviteCreate)
    client.on('inviteDelete', inviteManager.onInviteRemove)
    client.on('guildMemberAdd', inviteManager.onGuildMemberAdd)
    client.on('guildMemberRemove', inviteManager.onGuildMemberRemove)
    client.login(TOKEN!)
}

main().catch(err => console.error(err))
