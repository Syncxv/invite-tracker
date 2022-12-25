import { Express } from 'express'
import guildsRouter from './guilds'
import settingsRouter from './settings'
export const initializeRouters = (app: Express) => {
    app.use('/api/v1/guilds', guildsRouter)
    app.use('/api/v1/settings', settingsRouter)
}
