import { Router } from 'express'
import authMiddleware from '../../../middleware/auth'
const controller = require('../../../controllers/address.controller.js')
const validate = require('../../../validator/address.validation')

const router = Router()

module.exports = (app) => {
  //middleware jwt
  router.use(authMiddleware)

  router.get('/', controller.findAll)

  router.get('/:uuid', controller.findOne)

  router.post('/', validate.create, controller.create)

  router.post('/update', validate.update, controller.update)

  //version api
  app.use('/api/v1/address', router)
}
