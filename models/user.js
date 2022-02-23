const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    user_address : String,
    user_name : String,
    user_email : String,
    user_image : String,
    user_token : String
})

module.exports = mongoose.model('user', UserSchema)