const User = require('../models/user');
const Reason = require('../models/reason');

exports.createOrUpdateUser = async(req, res)=>{
    let {email} = req.user
    await User.findOneAndUpdate({email}, {email}, {new:true}).then(async (result)=>{
        if(result){
            res.status(200).json(result)
        }else{
            let newUser = await new User({email, info:req.body.info, username:req.body.username}).save()
            res.status(200).json(newUser)
        }
    }).catch((err)=>{
        res.status(400).json({'error':'There was a problem while manipulating user!!'})
    })
}

exports.currentUser = async(req, res)=>{
    await User.findOne({email:req.user.email}).then((result)=>{
        res.status(200).json(result)
    }).catch((err)=>{
        res.status(400).json(err.message)
    })
}


exports.postReason = async(req, res)=>{
    try {
        let {reason} = req.body
        let user = await User.findOne({email:req.user.email}).exec()
        let posted = await new Reason ({reason, postedBy:`${user.info.firstName} ${user.info.lastName}`, email:user.email, username:user.username}).save()
        res.status(200).json({received:true})
    } catch (error) {
        res.status(400).json(error.message)
    }
}