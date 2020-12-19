import { Router } from 'express'
const controller = require('../../../controllers/partner.controller.js')
const validate = require('../../../validator/partner.validation')

const router = Router()

module.exports = (app) => {
  router.get('/', controller.findAll)

  router.post('/', validate.create, controller.create)

  //version api
  app.use('/api/v1/partner', router)
}
