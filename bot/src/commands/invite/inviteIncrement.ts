import { ApplicationCommandOptionTypes } from 'discord.js/typings/enums'
import { InvitesBruh, UserModel } from '../../db/models/User'
import { SubCommand } from '../../types'
import { createEmbed } from '../../utils/createEmbed'

const createCommand = (
    name: string,
    attr: keyof InvitesBruh,
    increment: boolean
): SubCommand => ({
    type: ApplicationCommandOptionTypes.SUB_COMMAND,
    name,
    description: `${
        increment ? 'add' : 'remove'
    } ${attr} invites to specified user`,
    options: [
        {
            name: 'user',
            description: `${increment ? 'add' : 'remove'} ${attr} invites`,
            type: ApplicationCommandOptionTypes.USER,
            required: true
        },
        {
            name: 'amount',
            description: `how many ${attr} invites you want ${
                increment ? 'add' : 'remove'
            }`,
            type: ApplicationCommandOptionTypes.INTEGER,
            required: true
        }
    ],
    execute: async interaction => {
        const [command] = interaction.options.data
        const [userData, amountData] = command.options!
        await UserModel.incrementInvite(
            userData.user!.id,
            interaction.guildId!,
            attr,
            increment
                ? (amountData.value as number)
                : -1 * (amountData.value as number)
        )
        interaction.reply({
            embeds: [
                createEmbed({
                    type: 'success',
                    timestamp: new Date(),
                    description: `You successfully ${
                        increment ? 'added' : 'removed'
                    } \`${amountData.value}\` ${attr} invites to <@${
                        userData.user!.id
                    }>.`
                })
            ]
        })
    }
})

const AddInvites: SubCommand = createCommand('add', 'joins', true)
const RemoveInvites: SubCommand = createCommand('remove', 'joins', false)
const AddFakeInvites: SubCommand = createCommand('addfake', 'fake', true)
const RemoveFakeInvites: SubCommand = createCommand('removefake', 'fake', false)
const AddBonusInvites: SubCommand = createCommand('addbonus', 'bonus', true)
const RemoveBonusInvites: SubCommand = createCommand(
    'removebonus',
    'bonus',
    false
)
const AddLeavesInvites: SubCommand = createCommand('addleaves', 'leaves', true)
const RemoveLeavesInvites: SubCommand = createCommand(
    'removeleaves',
    'leaves',
    false
)
const inviteIncrements = [
    AddInvites,
    RemoveInvites,
    AddFakeInvites,
    RemoveFakeInvites,
    AddBonusInvites,
    RemoveBonusInvites,
    AddLeavesInvites,
    RemoveLeavesInvites
]

export default inviteIncrements
