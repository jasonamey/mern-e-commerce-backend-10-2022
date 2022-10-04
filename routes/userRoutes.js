const express = require('express')
const router = express.Router()

const { 
  authenticateUser,
} = require('../middleware/authentication')

const { 
  getAllUsers, showCurrentUser, getSingleUser, updateUser
} = require('../controllers/userController')

router.route('/').get(authenticateUser, getAllUsers)
router.route('/showMe').get(authenticateUser, showCurrentUser)
router.route('/updateUser').patch(authenticateUser, updateUser)

router.route('/:id').get(authenticateUser, getSingleUser)

module.exports = router