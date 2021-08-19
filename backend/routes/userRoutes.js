const express = require('express')
const router = express.Router()
const {
  addUsersCSV,
  getUsers,
  addUser,
} = require('../controller/userController')

router.route('/').get(getUsers).post(addUser)

router.route('/csv').post(addUsersCSV)

module.exports = router
