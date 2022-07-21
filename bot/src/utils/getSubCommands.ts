import { SubCommand } from '../types'

export const getSubCommands = (options: SubCommand[]) =>
    options.reduce(
        (obj, subCommand) => ({ ...obj, [subCommand.name]: subCommand }),
        {}
    )
