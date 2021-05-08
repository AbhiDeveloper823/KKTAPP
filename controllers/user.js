const User = require('../models/user')

exports.getUser = async(req, res)=>{
    try {
        let {username} = req.params
        let user = await User.findOne({username});
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json(err.message)
    }
}

exports.getUserProfile = async(req, res)=>{
    try {
        let {username} = req.params
        let user = await User.findOne({username});
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

exports.updateUserProfile = async(req, res)=>{
    try{
        let {info, username} = req.body;
        let update = await User.findOneAndUpdate({email:req.user.email}, {info, username}, {new:true})
        let result = {
            info:update.info,
            username:update.username,
            email:update.email
        }
        res.status(200).json(result)
    }catch(error){
        res.status(400).json(error.message)
    }
}

exports.updateUserAvatar = async(req, res)=>{
    try{
        let {avatar} = req.body;
        let update = await User.findOneAndUpdate({email:req.user.email}, {avatar}, {new:true})
        res.status(200).json({success:true})
    }catch(error){
        res.status(400).json(error.message)
    }
}

exports.updateUserBanner = async(req, res)=>{
    try {
        let {banner} = req.body
        let updated = await User.findOneAndUpdate({email:req.user.email}, {banner}, {new:true}).exec()
        res.status(200).json({success:true})
    } catch (error) {
        res.status(200).json(error.message)
    }
}


//SEARCH
exports.searchUser = async(req, res)=>{
    try {
        let {text} = req.body
        let users = await User.find({ username: { $regex: text, $options: "i" }}).exec()
        res.status(200).json(users)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

//LIKED MESSAGES
exports.getLikedMessages = async(req, res)=>{
    try {
        let messages = await User.findOne({email:req.user.email}).populate({path : 'likedMessages', populate: { path: 'postedBy', select:'username' }}).exec()
        res.status(200).json(messages.likedMessages)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

exports.addToLikedMessages = async(req, res)=>{
    try {
        let {messageId} = req.body
        const messages = await User.findOneAndUpdate({email:req.user.email}, {$addToSet:{likedMessages:messageId}}, {new:true}).exec()
        res.status(200).json(messages)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

exports.removeFromLiked = async(req, res)=>{
    try {
        let {id} = req.body
        let user = await User.findOneAndUpdate({email:req.user.email}, {$pull:{likedMessages:id}}, {new:true})
        res.status(200).json({'success':'true'})
    } catch (error) {
        res.status(400).json(error.message)
    }
}

//FRIEND REQUEST (OTHER USER)
exports.getFriendRequests = async(req, res)=>{
    try {
        let requests = await User.findOne({email:req.user.email}).populate('requests', 'username info avatar').exec()
        res.status(200).json(requests.requests)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

exports.postRequests = async(req, res)=>{
    try {
        console.log(req.body)
        let {user_id} = req.body
        let user = await User.findOne({email : req.user.email}).exec()
        let request = await User.findOneAndUpdate({_id:user_id}, {$addToSet : {requests :user._id }}, {new:true}).exec()
        res.status(200).json({'success':'true'})
    } catch (error) {
        res.status(400).json(error.message)
    }
}

exports.removeRequest = async(req, res)=>{
    try {
        let {user_id} = req.body
        let user = await User.findOne({email : req.user.email}).exec()
        let remove  = await User.findOneAndUpdate({_id : user_id}, {$pull : {requests : user._id}}, {new:true}).exec()
        res.status(200).json({'success':'true'})
    } catch (error) {
        res.status(400).json(error.message)
    }
}

//FRIEND REQUEST (MAIN USER)
exports.removeMainRequest = async(req, res)=>{
    try {
        let {user_id} = req.body
        let remove  = await User.findOneAndUpdate({email : req.user.email}, {$pull : {requests : user_id}}, {new:true}).exec()
        res.status(200).json({'success':'true'})
    } catch (error) {
        res.status(400).json(error.message)
    }
}


exports.getAllFriends = async(req, res)=>{
    try {
        let friends = await User.findOne({email:req.user.email}).populate('friends', 'info username email avatar').exec()
        res.status(200).json(friends.friends)
    } catch (error) {
        res.status(400).json(error.message)
    }
}


exports.acceptFriendRequest = async(req, res)=>{
    try {
        let {user_id} = req.body
        let remove  = await User.findOneAndUpdate({email : req.user.email}, {$pull : {requests : user_id}}, {new:true}).exec()
        let friend1 = await User.findOneAndUpdate({email:req.user.email}, {$addToSet : {friends : user_id}}, {new:true}).exec()
        let friend2 = await User.findOneAndUpdate({_id:user_id}, {$addToSet : {friends : friend1._id}}, {new:true}).exec()
        res.status(200).json({'success':true})
    } catch (error) {
        res.status(400).json(error.message)
    }
}

exports.removeFriend = async(req, res)=>{
    try {
        let {user_id} = req.body
        let friend1 = await User.findOneAndUpdate({email:req.user.email}, {$pull : {friends : user_id}}, {new:true}).exec()
        let friend2 = await User.findOneAndUpdate({_id:user_id}, {$pull : {friends : friend1._id}}, {new:true}).exec()
        res.status(200).json({'success':true})
    } catch (error) {
        res.status(400).json(error.message)
    }
}

exports.getMutualFriends = async(req, res)=>{
    try {
        let {user_id} = req.body
        let friend1 = await User.findOne({email:req.user.email}).populate('friends', 'info username eamil avatar').exec()
        let friend2 = await User.findOne({_id:user_id}).populate('friends', 'info username eamil avatar').exec()
        let mutual = []
        friend1.friends.map((item)=>{
            friend2.friends.map((n)=>{
                if(item._id.toString() === n._id.toString()){
                    mutual.push(item)
                }
            })
        })
        res.status(200).json(mutual)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

//DELETE USER

exports.removeUser = async(req, res)=>{
    try {
        console.log('REQ>>>', req.user)
        let removed = await User.findOneAndRemove({email:req.user.email}).exec()
        res.status(200).json({success:true})
    } catch (error) {
        res.status(400).json(error.message)
    }
}