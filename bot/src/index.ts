import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'
import { Client, Guild, Intents } from 'discord.js'
import dotenv from 'dotenv'
dotenv.config()

import { getCommands } from './commands'
import database from './db/db'

const { TOKEN } = process.env

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_INVITES
    ]
})

const rest = new REST({ version: '9' }).setToken(TOKEN!)

const main = async () => {
    await database.initalize()
    const commands = await getCommands()
    const commandNames = commands.map(s => s.name)
    client.on('ready', async () => {
        console.log(`Logged in as ${client.user!.tag}!`)
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

    client.on('inviteCreate', async ({ guild }) => {
        if (guild instanceof Guild) {
            const invites = await guild?.invites?.fetch()
            console.log(invites)
        }
    })

    client.login(TOKEN!)
}

main().catch(err => console.error(err))
