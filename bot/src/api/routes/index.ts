import { Express } from 'express'
import guildsRouter from './guilds'
export const initializeRouters = (app: Express) => {
    app.use('/api/v1/guilds', guildsRouter)
}
