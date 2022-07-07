import express from 'express'

const port = 3000
export const app = express()
export const apiMain = async () => {
    app.use(express.json())
    app.listen(port, () => {
        console.log(`listening on port ${port}`)
    })
}
