const { default: mongoose } = require("mongoose");

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description : {
        type: String,
        required: false
    },

    owner: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    },

    fields: {
        type: Array,
        required: true
    },


    status:{
        type: String,
        required: true
    }
}, {timestamps: true})

const model = mongoose.model('Form', schema, 'forms')

module.exports = model