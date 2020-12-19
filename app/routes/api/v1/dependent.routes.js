import { Router } from 'express'
import authMiddleware from '../../../middleware/auth'
const controller = require('../../../controllers/dependent.controller.js')
const validate = require('../../../validator/dependent.validation')

const router = Router()

module.exports = (app) => {
  //middleware jwt
  router.use(authMiddleware)

  // Retrieve all controller
  router.get('/', controller.findAll)

  // Retrieve a single Tutorial with id
  router.get('/:id', controller.findOne)

  // Create a new idatabase
  router.post('/', validate.create, controller.create)

  // Delete in database with id
  router.delete('/:id', controller.delete)

  //version api
  app.use('/api/v1/dependent', router)
}
