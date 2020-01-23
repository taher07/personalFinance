const mongoose = require('mongoose')
const schema = mongoose.Schema

const entrySchema = new schema({
    nature: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true
    },
    narration: {
        type: String,
        required: false
    },
    date: {
        type: String,
        required: true,
        default: Date().toString()
    }
})

const entry = mongoose.model('entries',entrySchema)

module.exports = entry