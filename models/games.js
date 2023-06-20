const mongoose  = require('mongoose')

const gamesSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    completed : {
        type : Boolean,
        default : false
    },
    image_url : {
        type: String,
        default:""
    },
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users'
    }
})

module.exports = mongoose.model('games',gamesSchema)