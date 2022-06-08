import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'
import { Client, Intents } from 'discord.js'
import dotenv from 'dotenv'
import { getCommands } from './commands'
dotenv.config()

const { TOKEN } = process.env

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
})

const rest = new REST({ version: '9' }).setToken(TOKEN!)

const main = async () => {
    client.on('ready', async () => {
        console.log(`Logged in as ${client.user!.tag}!`)
        const commands = await getCommands()
        await rest.put(Routes.applicationCommands(client.user!.id), {
            body: commands
        })
    })
    client.login(TOKEN!)
}

main().catch(err => console.error(err))
