import { Router } from 'express'
import { client } from '../..'
import * as guildController from '../controllers/guilds'
import middleOfTheseNuts from '../middleware'

const userRouter = Router()

userRouter.get(
    '/getConnectedGuilds/:userId',
    middleOfTheseNuts(guildController.getConnectedGuilds)
)

export default userRouter
