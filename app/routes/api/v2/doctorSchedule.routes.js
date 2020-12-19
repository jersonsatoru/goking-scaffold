import { Router } from 'express'
import authMiddleware from '../../../middleware/auth'
const controller = require('../../../controllers/v2/doctorSchedule.controller.js')
const validate = require('../../../validator/v2/doctorScheduling.validation')

const router = Router()

module.exports = (app) => {
  //middleware jwt
  router.use(authMiddleware)

  router.get('/', controller.findAll)

  router.post('/', validate.create, controller.create)

  router.put('/:uuid', validate.update, controller.update)

  router.delete('/:uuid', controller.delete)

  //version api
  app.use('/api/v2/doctor_schedule', router)
}
