const admin = require('../firebase/fbserver')

exports.authCheck = async(req, res, next)=>{
    let {authtoken} = req.headers
    await admin.auth().verifyIdToken(authtoken).then((result)=>{
        req.user = result
        console.log('AUTH CHECK PASSED')
        next()
    }).catch((err)=>{
        res.status(400).json({'error':'You are not log in!!'})
    })
}