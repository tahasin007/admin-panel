const { Users } = require('../models')
const asyncHandler = require('express-async-handler')
const Email = require('email-templates')
const path = require('path')

const email = new Email({
  message: {
    from: 'lord@admin.com',
  },
  preview: false,
  send: true,
  transport: {
    host: 'smtp.mailtrap.io',
    port: process.env.MAILTRAP_PORT,
    ssl: false,
    tls: true,
    auth: {
      user: '19bee33a843327',
      pass: '32925304e6261f',
    },
  },
})

//@description post users from CSV
//@route post /api/users/csv
const addUsersCSV = asyncHandler(async (req, res) => {
  const users = req.body
  const newUser = users.map(({ id, ...firstName }) => firstName)
  await Users.bulkCreate(newUser)
  res.status(201).json({ message: `${newUser.length} New Employees Added` })
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
  res.status(201).json({ message: 'New Employee Added' })
})

//@description send email
//@route post /api/users/mail
const sendMail = asyncHandler(async (req, res) => {
  const emailInfo = req.body
  const emailAddresses = emailInfo.emailAddress.split(',')
  emailAddresses.forEach((emailAddress) => {
    email
      .send({
        template: path.join(__dirname, '../emails/welcome'),
        message: {
          to: emailAddress,
        },
        locals: {
          subject: emailInfo.emailSubject,
          body: emailInfo.emailBody,
        },
      })
      .then()
      .catch()
  })
  res.json({ message: 'Email Sent' })
})

module.exports = {
  addUsersCSV,
  getUsers,
  addUser,
  sendMail,
}
