const express  = require('express')
const router = express.Router()

const { getMessage, getUserMessage, postMessage, getMessagePostedTo, removeMessage, readMessage, updateGuess } = require('../controllers/messages')
const { authCheck } = require('../middleware/auth')

router.get('/messages',authCheck, getMessage)
router.get('/message/:id', authCheck, readMessage)
router.get('/user/messages', authCheck, getUserMessage)
router.post('/user/message/posted', authCheck, getMessagePostedTo)
router.post('/message', authCheck, postMessage)
router.put('/message/:id', authCheck, updateGuess)
router.delete('/message/:id', authCheck, removeMessage)

module.exports = router