const { Users } = require('../models')
const asyncHandler = require('express-async-handler')

//@description post users from CSV
//@route post /api/users/csv
const addUsersCSV = asyncHandler(async (req, res) => {
  const users = req.body
  const newUser = users.map(({ id, ...firstName }) => firstName)
  await Users.bulkCreate(newUser)
  res.status(201).json({ message: `${newUser.length} New Employees Added`})
})

//@description get users
//@route get /api/users
const getUsers = asyncHandler(async (req, res) => {
    const listOfUsers = await Users.findAll()
    res.status(201).json(listOfUsers)
})

//@description get users
//@route post /api/users
const addUser = asyncHandler(async (req, res) => {
    const users = req.body
    await Users.create(users)
    res.status(201).json({message: 'New Employee Added'})
})

module.exports = {
  addUsersCSV,
  getUsers,
  addUser,
}
