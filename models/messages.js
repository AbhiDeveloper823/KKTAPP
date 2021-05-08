const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const messageSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    postedBy:{
        type:ObjectId,
        ref:'User'
    },
    postedTo:{
        type:ObjectId,
        ref:'User'
    },
    guessed:{
        type:Boolean,
        default:false
    }
}, {timestamps:true})

module.exports = mongoose.model('Message', messageSchema)