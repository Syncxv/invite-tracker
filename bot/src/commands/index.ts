import fs from 'node:fs'
export const getCommands = async () => {
    ;(global as any).fs = fs
    ;(global as any).__dirname = __dirname
    return Promise.all(
        fs
            .readdirSync(__dirname)
            .filter(file => file !== 'index.js' && !file.includes('.map'))
            .map(
                async filename =>
                    (await import(`${__dirname}/${filename}`)).default
            )
    )
}
