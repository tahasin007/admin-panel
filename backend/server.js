const express = require('express')
const dotenv = require('dotenv')
const userRoutes = require('./routes/userRoutes')
const cors =  require('cors')

dotenv.config()

const db = require('./models') 

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('API is runnig')
})

app.use('/api/users', userRoutes)

const PORT = process.env.PORT || 5000

db.sequelize.sync().then(()=>{
    app.listen(PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})
})




