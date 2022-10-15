import mongoose from 'mongoose'

class MongooseDB {
    connection: mongoose.Connection

    async getConnection() {
        const { connection: db } = await mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/inv-t')
        this.connection = db
    }
    initalize() {
        console.log('INITALIZING MONGO')
        return new Promise(res => {
            mongoose.connection.on('connected', () => {
                console.log('CONNECTED :D')
                res(true)
            })
            this.getConnection()
        })
    }
}
const database = new MongooseDB()
export default database
