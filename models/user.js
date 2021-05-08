const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
    username:{
        type:String,
        unique:true,
        required:true,
        text:true
    },
    avatar:{
        type:String
    },
    banner:{
        type:String
    },
    info:{
        firstName:{
            required:true,
            type:String,
            required:true,
            text:true
        },
        lastName:{
            required:true,
            type:String,
            required:true
        },
        dob:{
            type:Date
        },
        bio:{
            type:String,
        },
        gender:{
            type:String,
            enum:['Male', 'Female', 'Other']
        }
    },
    likedMessages:[
        {
            type:mongoose.Schema.ObjectId,
            ref:'Message'
        }
    ],
    requests:[
        {
            type:mongoose.Schema.ObjectId,
            ref:'User'
        }
    ],
    friends:[
        {
            type:mongoose.Schema.ObjectId,
            ref:'User'
        }
    ]
}, {timestamps : true})

module.exports = mongoose.model('User', userSchema)