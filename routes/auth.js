const express  = require('express')
const router = express.Router()

const { createOrUpdateUser, currentUser, postReason } = require('../controllers/auth')
const { authCheck } = require('../middleware/auth')

router.post('/create-or-update-user',authCheck, createOrUpdateUser)
router.post('/current-user', authCheck, currentUser)
router.post('/reason', authCheck, postReason)

module.exports = router