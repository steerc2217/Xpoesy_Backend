const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema({
    xpoem_id : String,
    user_id : String,
    description : String,
    reply : {type : String, default:''},
    date : { type: Date, default: Date.now }
})

module.exports = mongoose.model('comment', CommentSchema)