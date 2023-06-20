const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
    username : {
        type: String,
        required: [true,'username is required!']
    },
    password : {
        type : String,
        required : [true,'password is required!']
    }
},{timestamps:true})

module.exports = mongoose.model('users',usersSchema)