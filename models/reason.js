const mongoose = require('mongoose')

let reasonSchema = new mongoose.Schema({
    reason:{
        type:String,
        required:true
    },
    postedBy:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('Reason', reasonSchema)