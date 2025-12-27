const mongoose = require('mongoose')
const mongo_url = process.env.MONGODB_URI


async function connectDB() {
    try {
        console.log('MONGODB URI:', mongo_url)
        await mongoose.connect(mongo_url)
        console.log('MONGODB CONNECTED')
    } catch (error) {
        console.error('MONGO ERROR:', error && error.message ? error.message : error)
        if (error && error.stack) console.error(error.stack)
        throw error
    }
}

module.exports = connectDB