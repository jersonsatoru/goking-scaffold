import dotenv from 'dotenv'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

dotenv.config()

const app = express()

app.use((req, res, next) => {
  //allowed WebSite
  res.header('Access-Control-Allow-Origin', '*')

  //allowed methods
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  app.use(cors())
  next()
})

app.use(cors())

// Disable the X-Powered-By: Express
app.disable('x-powered-by')

// parse requests of content-type - application/json
app.use(bodyParser.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// Load Routes
require('./app/routes/api/v1/tutorial.routes')(app)
require('./app/routes/api/v1/product.routes')(app)
require('./app/routes/api/v1/user.routes')(app)
require('./app/routes/api/v1/auth.routes')(app)
require('./app/routes/api/v1/healthProblems.routes')(app)
require('./app/routes/api/v1/role.routes')(app)
require('./app/routes/api/v1/doctorSchedule.routes')(app)
require('./app/routes/api/v1/partner.routes')(app)
require('./app/routes/api/v1/faq.routes')(app)
require('./app/routes/api/v1/faqAnswer.routes')(app)
require('./app/routes/api/v1/medicalRecord.routes')(app)
require('./app/routes/api/v1/medicalRecordQuestion.routes')(app)
require('./app/routes/api/v1/address.routes')(app)
require('./app/routes/api/v1/personalData.routes')(app)
require('./app/routes/api/v1/scheduling.routes')(app)
require('./app/routes/api/v1/dependent.routes')(app)
require('./app/routes/api/v1/doctorsPrescription.routes')(app)
require('./app/routes/api/v1/payment.routes')(app)
require('./app/routes/api/v1/transactions.routes')(app)
require('./app/routes/api/v1/configDate.routes')(app)
require('./app/routes/api/v1/patient.routes')(app)
require('./app/routes/api/v1/import.routes')(app)
require('./app/routes/api/v1/companie.routes')(app)
require('./app/routes/api/v1/area.routes')(app)

//Load Routes V2
require('./app/routes/api/v2/user.routes')(app)
require('./app/routes/api/v2/doctorSchedule.routes')(app)
require('./app/routes/api/v2/scheduling.routes')(app)
require('./app/routes/api/v2/versionApp.routes')(app)

// set port, listen for requests
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
  console.log(`Server is running in ${process.env.NODE_ENV}`)
  console.log(`DB is running ${process.env.DB_HOST}`)
})

// simple route index || status
app.get(['/', '/status'], (req, res) => {
  res.status(200).send({
    title: 'Welcome to API',
    version: '1.0.0',
  })
})
