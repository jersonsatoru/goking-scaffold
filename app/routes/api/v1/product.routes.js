import { Router } from 'express'
const controller = require('../../../controllers/product.controller.js')
const validate = require('../../../validator/product.validation')

const router = Router()

module.exports = (app) => {
  // get all
  router.get('/', controller.findAll)

  router.post('/', validate.create, controller.create)

  //version api
  app.use('/api/v1/products', router)
}
