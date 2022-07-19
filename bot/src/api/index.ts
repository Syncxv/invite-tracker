import express from 'express'
import { corsOptions } from '../constants'
import { initializeRouters } from './routes'
import cors from 'cors'
const port = 5000
export const app = express()
export const apiMain = async () => {
    app.use(express.json())
    app.use(cors(corsOptions))
    initializeRouters(app)
    app.listen(port, () => {
        console.log(`listening on port ${port}`)
    })
}
