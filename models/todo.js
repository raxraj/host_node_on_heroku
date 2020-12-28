let {Schema, model}  = require('mongoose')

const todoSchema = new Schema({
    text:{
        type: String,
        required: true,
    },
    isDone:{
        type: Boolean,
        required: true,
        default: false
    }
})

module.exports = model('todo', todoSchema)