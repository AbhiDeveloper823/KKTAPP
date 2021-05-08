const express  = require('express')
const router = express.Router()

const {getUser, updateUserProfile, searchUser,getUserProfile, getLikedMessages, addToLikedMessages,removeUser, removeFromLiked, updateUserAvatar, postRequests, removeRequest, getFriendRequests, removeMainRequest, acceptFriendRequest, removeFriend, getAllFriends, getMutualFriends, updateUserBanner} = require('../controllers/user')
const { authCheck } = require('../middleware/auth')

router.get('/user/:username',authCheck, getUser)
router.put('/user/:username/edit', authCheck, updateUserProfile)
router.post('/search', authCheck, searchUser)
router.get('/user/:username/profile', getUserProfile)
router.put('/user/:usename/avatar', authCheck, updateUserAvatar)
router.put('/user/:usename/banner', authCheck, updateUserBanner)

//LIKED MESSAGES
router.post('/user/liked-messages', authCheck, getLikedMessages)
router.post('/user/likedmessages', authCheck, addToLikedMessages)
router.post('/user/liked-messages/remove', authCheck, removeFromLiked)

//FRIEND REQUEST (OTHER USER)
router.post('/user/requests', authCheck, getFriendRequests)
router.post('/user/request', authCheck, postRequests)
router.post('/user/request/remove', authCheck, removeRequest)

//FRIEND REQUEST (MAIN USER)
router.post('/user/main/request/remove', authCheck, removeMainRequest)

router.post('/user/friends', authCheck, getAllFriends)
router.post('/user/friend/mutual', authCheck, getMutualFriends)
router.post('/user/request/accept', authCheck, acceptFriendRequest)
router.post('/user/friend/remove', authCheck, removeFriend)

//DELETE USER
router.post('/current/user/delete/remove',authCheck, removeUser )

module.exports = router