import { Router } from 'express'
const controller = require('../../../controllers/AuthController.js')
const validate = require('../../../validator/auth.validation')

const router = Router()

module.exports = (app) => {
  router.post('/', validate.login, controller.login)
  router.post('/forgot', controller.forgotPassword)
  router.post('/reset', validate.login, controller.resetPassword)

  //version api
  app.use('/api/v1/auth', router)
}
