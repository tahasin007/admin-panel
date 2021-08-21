const express = require('express')
const dotenv = require('dotenv')
const userRoutes = require('./routes/userRoutes')
// const cors = require('cors')
const path = require('path')

dotenv.config()

const db = require('./models')

const app = express()

app.use(express.json())
// const corsOptions = {
//   origin: 'http://localhost:3000',
//   optionSuccessStatus: 200,
// }

app.set('views', path.join(__dirname, 'emails'))
app.set('view engine', 'pug')

// app.get('/', (req, res) => {
//   res.send('API is runnig')
// })

app.use('/api/users', userRoutes)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')))
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is runnig')
  })
}

const PORT = process.env.PORT || 5000

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
  })
})
