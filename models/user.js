const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    user_name : String,
    user_image : String,
    address : {type : String, length : 34},
    token : String,
    balance : String
})

module.exports = mongoose.model('User', UserSchema)