import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'
import { Client, Intents } from 'discord.js'
import dotenv from 'dotenv'
import { getCommands } from './commands'
dotenv.config()

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
    client.login(TOKEN!)
}

main().catch(err => console.error(err))
