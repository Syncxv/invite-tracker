import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'
import { Client, GuildMember, GuildMemberRoleManager, Intents, Message, MessageActionRow, MessageButton } from 'discord.js'
import dotenv from 'dotenv'
import { apiMain } from './api'
import inviteManager from './classes/inviteManager'
dotenv.config()

import { getCommands } from './commands'
import { ButtonIds } from './constants'
import database from './db/db'
import { GuildClass } from './db/models/Guild'
import { TicketModel } from './db/models/Ticket'
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
            switch (interaction.customId) {
                case ButtonIds.claim:
                    if (!interaction.guild)
                        return await interaction.reply({ content: 'bruh where tf is the guild wigga', ephemeral: true })
                    const guild = await GuildClass.getGuild(interaction.guild.id)
                    const ticket = await TicketModel.findOne({ channelId: interaction.channelId })
                    if (!guild.isSetUp() || ticket == null)
                        return await interaction.reply({
                            content:
                                'bruh how did you even mnage to do this, SET UP YOU SERVER FIRST do /ticket setup-auto OOOOOR the ticket may not exist :|',
                            ephemeral: true
                        })
                    //check if they in the role list
                    if (
                        interaction.user.id !== interaction.guild.ownerId &&
                        !(interaction.member as GuildMember).permissions.has('ADMINISTRATOR') &&
                        !(interaction.member!.roles as GuildMemberRoleManager).cache.hasAny(...guild.ticketRoleIds)
                    )
                        return await interaction.reply({
                            content:
                                'only staff can do that :| if you a staff do `/ticket setup-add-roles` and add your role gg ez',
                            ephemeral: true
                        })
                    await ticket.updateOne({
                        $set: { responder: interaction.user.id }
                    })
                    await (interaction.message as Message).edit({
                        components: [
                            new MessageActionRow().addComponents(
                                new MessageButton()
                                    .setCustomId(ButtonIds.close)
                                    .setLabel('Close')
                                    .setStyle('DANGER')
                                    .setEmoji('🔒'),

                                new MessageButton()
                                    .setCustomId(ButtonIds.createCloseWithReason(ButtonIds.closeWithReason))
                                    .setLabel('Close With Reason')
                                    .setStyle('DANGER')
                                    .setEmoji('🔒')
                            )
                        ]
                    })
                    return await interaction.reply(`<@${interaction.user.id}> will handle yo ticket wigga boy`)
            }
            await interaction.reply({ content: ':)', ephemeral: true })
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
