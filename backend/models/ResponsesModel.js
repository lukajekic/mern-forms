const { default: mongoose } = require("mongoose");

const schema = new mongoose.Schema({
values: {
    type: Object,
    required: true
},
form: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Form'
},

owner: {
    type: mongoose.Types.ObjectId,
    required: false,
    ref: "User"
}
}, {timestamps: true})


const model = mongoose.model('Response', schema, 'responses')

module.exports = model