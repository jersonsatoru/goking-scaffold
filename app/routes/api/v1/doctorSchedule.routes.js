import { Router } from 'express'
import authMiddleware from '../../../middleware/auth'
const controller = require('../../../controllers/doctorSchedule.controller.js')
const validate = require('../../../validator/doctorScheduling.validation')

const router = Router()

module.exports = (app) => {
  //middleware jwt
  router.use(authMiddleware)

  router.get('/', controller.findAll)

  router.post('/', validate.create, controller.create)

  router.put('/:uuid', validate.update, controller.update)

  //version api
  app.use('/api/v1/doctor_schedule', router)
}
