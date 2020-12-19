import { Router } from 'express'
import authMiddleware from '../../../middleware/auth'
const controller = require('../../../controllers/configDate.controller.js')

const router = Router()

module.exports = (app) => {
  router.use(authMiddleware)

  // Create
  router.get('/', controller.findAll)

  router.post('/', controller.create)

  router.post('/update', controller.update)

  app.use('/api/v1/config_date', router)
}
