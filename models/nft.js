const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NFTSchema = new Schema({
    name : String,
    collection : String,
    supply : String,
    category : Number,
    memo : String
})

module.exports = mongoose.model('Nft', NFTSchema)