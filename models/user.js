const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    user_address : String,
    user_name : {type : String, default:''},
    user_email : {type : String, default:''},
    user_image : {type : String, default:''},
    user_token : {type : String, default:''},
    user_bio : {type : String, default:''},
    user_balance : String
})

module.exports = mongoose.model('user', UserSchema)