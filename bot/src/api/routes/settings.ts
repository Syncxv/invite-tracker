import { Router } from 'express'
import * as guildController from '../controllers/settings'
import middleOfTheseNuts from '../middleware'

const settingsRouter = Router()

settingsRouter.get('/invite-settings', middleOfTheseNuts(guildController.inviteSettings))

export default settingsRouter
