const express = require('express')
const router = express.Router()
const {
  addUsersCSV,
  getUsers,
  addUser,
  sendMail,
} = require('../controller/userController')

router.route('/').get(getUsers).post(addUser)

router.route('/csv').post(addUsersCSV)

router.route('/mail').post(sendMail)

module.exports = router
