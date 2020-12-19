import { Router } from 'express'
import authMiddleware from '../../../middleware/auth'
const controller = require('../../../controllers/payment.controller.js')
const validate = require('../../../validator/payment.validation')

const router = Router()

module.exports = (app) => {
  //middleware jwt
  router.use(authMiddleware)

  // Retrieve all database
  router.get('/', controller.findAll)

  // create payment
  router.post('/', validate.payment, controller.payment)

  // cancel payment
  router.post('/cancel', controller.cancel)

  //version api
  app.use('/api/v1/payment', router)
}
