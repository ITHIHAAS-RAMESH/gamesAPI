const mongoose  = require('mongoose')

const gamesSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true,'name is required!']
    },
    completed : {
        type : Boolean,
        default : false
    },
    image_url : {
        type: String,
        default:""
    }
})

module.exports = mongoose.model('games',gamesSchema)