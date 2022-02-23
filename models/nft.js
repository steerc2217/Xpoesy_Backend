const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Commet = new Schema({
    comment : String,
    xpoem_id : String,
    reply : String,
    user_id : Number,
    memo : String
})

module.exports = mongoose.model('nft', NFTSchema)