import { Router } from 'express'
const controller = require('../../../controllers/faq.controller.js')

const router = Router()

module.exports = (app) => {
  router.get('/', controller.findAll)

  router.post('/', controller.create)

  router.post('/answer', controller.answer)

  //version api
  app.use('/api/v1/faq', router)
}
