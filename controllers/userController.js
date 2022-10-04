const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const { createTokenUser } = require('../utils')

const getAllUsers = async (req, res) => {
  const users = await User.find( {role: 'user'}).select('-password')
  res.status(StatusCodes.OK).json({ users })

}

const getSingleUser = async (req, res) => {
  const user = await User.findOne( { _id : req.params.id }).select('-password')
  if (!user) {
    throw new CustomError.NotFoundError(`No user with id : ${req.params.id}`)
  }
  res.status(StatusCodes.OK).json({ user })
}

const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user })
}

const updateUser = async (req, res) => {
  const { email, name } = req.body
  console.log("Hello in here")
  if (!email || !name) {
    throw new CustomError.BadRequestError('Please provide all values')
  }
  const user = await User.findOneAndUpdate(
    { _id: req.user.userId },
    { email, name}, 
    { new: true, runValidators: true}
  )
  const token = createTokenUser(user)
  res.status(StatusCodes.OK).json({ token })
}

module.exports = { 
  getAllUsers, 
  getSingleUser,
  showCurrentUser, 
  updateUser
}