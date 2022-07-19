import { ColorResolvable } from 'discord.js'

interface ColorsInterface {
    success: ColorResolvable
    brandColor: ColorResolvable
    error: ColorResolvable
}

export const Colors: ColorsInterface = {
    success: '#04d275',
    error: '#FF3B3E',
    brandColor: '#FA2DE2'
}

export const Images = {
    successIcon:
        'https://cdn.discordapp.com/attachments/766372306192695401/984432589769150474/iconmonstr-check-mark-1-240.png',
    errorIcon:
        'https://cdn.discordapp.com/attachments/766372306192695401/984447143555244062/iconmonstr-x-mark-lined-240.png'
}

export const corsOptions = {
    origin: function (origin: any, callback: any) {
        if (
            !origin ||
            [process.env.FRONT_END_DOMAIN! || 'http://localhost:3000'].indexOf(
                origin
            ) !== -1
        ) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true
}
