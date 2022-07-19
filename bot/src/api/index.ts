import express from 'express'
import { initializeRouters } from './routes'

const port = 3000
export const app = express()
export const apiMain = async () => {
    app.use(express.json())
    initializeRouters(app)
    app.listen(port, () => {
        console.log(`listening on port ${port}`)
    })
}
