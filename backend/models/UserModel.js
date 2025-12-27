const mongoose = require('mongoose')

const shcema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        required: false
    },

    favourites:{
        type: Array,
        required: true
    }
}, {timestamps: true})

const model = mongoose.model('User', shcema, 'users')
module.exports = model