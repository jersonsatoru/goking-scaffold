import { Router } from 'express'
import authMiddleware from '../../../middleware/auth'
const controller = require('../../../controllers/area.controller.js')
const validate = require('../../../validator/area.validation')

const router = Router()

module.exports = (app) => {
  //middleware jwt
  router.use(authMiddleware)

  router.get('/', controller.findAll)

  router.get('/:uuid', controller.findOne)

  router.post('/', validate.create, controller.create)

  router.put('/:uuid', validate.update, controller.update)

  router.delete('/:uuid', controller.delete)

  //version api
  app.use('/api/v1/area', router)
}
