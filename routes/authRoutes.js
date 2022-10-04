const express = require('express')
const router = express.Router()

const { register, login, logout } = require('../controllers/authController')

const logger = (req, res, next) => {
  res.status(200).json({ message : "successful"})
}

router.post('/register', register)
router.post('/login', login)
router.get('/logout', logout)

module.exports = router