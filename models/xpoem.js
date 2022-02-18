const mongoose = require('mongoose')
const Schema = mongoose.Schema

const XPoem = new Schema({
    title : String,
    nft_link : String,
    xpoem : String,
    category : Number,
    author : String
})

module.exports = mongoose.model('xpoem', XPoem)