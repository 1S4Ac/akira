const mongoose = require('mongoose')
const uri = process.env.MONGO_URI

try {
    mongoose.connect()
} catch (err) {
    console.log('Internal server error')
}