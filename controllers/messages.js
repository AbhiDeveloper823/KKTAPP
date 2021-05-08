const Message = require('../models/messages')
const User = require('../models/user')

exports.getMessage = async(req, res)=>{
    try {
        let user = await User.findOne({email:req.user.email}).exec()
        let messages = await Message.find({postedTo:user._id}).populate('postedTo', 'info').populate('postedBy', 'info username').sort({'createdAt':-1}).exec()
        let recieved = []
        messages.map((item)=>{
            if(user.likedMessages.includes(item._id)){
            }else{
                recieved.push(item)
            }
        })
        res.status(200).json(recieved)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

exports.readMessage = async(req, res)=>{
    try {
        let {id} = req.params
        let message = await Message.findById(id).populate('postedBy', 'info username').exec()
        res.status(200).json(message)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

exports.getUserMessage = async(req, res)=>{
    try {
        let user = await User.findOne({email:req.user.email}).exec()
        let messages = await Message.find({postedBy:user._id}).populate('postedTo', 'username').exec()
        res.status(200).json(messages)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

exports.getMessagePostedTo = async(req, res)=>{
    try {
        let {postedTo} = req.body
        let user = await User.findOne({email:req.user.email}).exec()
        let messages = await Message.find({postedBy:user._id, postedTo}).exec()
        res.status(200).json(messages)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

exports.postMessage = async(req, res)=>{
    try {
        let {title, description, postedTo} = req.body
        let user = await User.findOne({email:req.user.email}).exec()
        let messages = await new Message({title, description, postedBy:user._id, postedTo}).save()
        res.status(200).json(messages)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

exports.removeMessage = async(req, res)=>{
    try {
        let {id} = req.params
        let user = await User.findOne({email:req.user.email}).exec()
        let message = await Message.findOne({_id:id}).exec()
        console.log('MESSAGE>>>', message)
        console.log('USER>>>', user)
        if(message.postedBy.toString() === user._id.toString()){
            let remove = await Message.findOneAndRemove({_id:id}).exec()
            res.status(200).json({'success':true})
        }else{
            console.log('NOT MATCHED!!')
        }
    } catch (error) {
        res.status(400).json(error.message)
    }
}


exports.updateGuess = async(req, res)=>{
    try {
        let {guessed} = req.body
        let {id} = req.params
        let update = await Message.findByIdAndUpdate(id, {guessed}, {new:true}).exec()
        res.status(200).json(update)
    } catch (error) {
        res.status(400).json(error.message)
    }
}