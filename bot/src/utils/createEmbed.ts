import { MessageEmbedOptions } from 'discord.js'
import { client } from '..'
import { Colors, Images } from '../constants'

type createEmbedArgs = {
    type: 'success' | 'error' | 'brand'
} & MessageEmbedOptions

export const createEmbed = ({ type, ...props }: createEmbedArgs) => {
    switch (type) {
        case 'success':
            return {
                ...props,
                footer: {
                    text: 'Invite Tracker',
                    iconURL: client.user!.avatarURL()!,
                    ...props.footer
                },
                color: Colors.success,
                author: {
                    name: 'Success',
                    iconURL: Images.successIcon,
                    ...props.author
                }
            }
        case 'error':
            return {
                ...props,
                footer: {
                    text: 'Invite Tracker',
                    iconURL: client.user!.avatarURL()!,
                    ...props.footer
                },
                color: Colors.error,
                author: {
                    name: 'Error',
                    iconURL: Images.errorIcon,
                    ...props.author
                }
            }
        case 'brand':
            return {
                ...props,
                footer: {
                    text: 'Invite Tracker',
                    iconURL: client.user!.avatarURL()!,
                    ...props.footer
                },
                color: Colors.brandColor
            }
        default:
            return {
                ...props
            }
    }
}

export const createSuccessEmbed = () => {}
