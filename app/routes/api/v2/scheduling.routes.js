import { Router } from 'express'
import authMiddleware from '../../../middleware/auth'
const controller = require('../../../controllers/v2/scheduling.controller.js')
const validate = require('../../../validator/scheduling.validation')

const router = Router()

module.exports = (app) => {
  //middleware jwt
  router.use(authMiddleware)

  // Retrieve a data
  router.post('/', controller.findAll)

  // Retrieve a single data with id
  router.get('/:uuid', controller.findOne)

  // Create a new idatabase
  router.post(
    '/scheduling_create',
    validate.create,
    controller.schedulingCreate
  )

  // update a new idatabase
  router.post('/process', validate.process, controller.process)

  //scheduling verify
  router.post('/scheduling_verify', controller.schedulingVerify)

  //scheduling check time
  router.post('/scheduling_check_time', controller.schedulingVerifyCheckTime)

  router.put('/:id', controller.update)

  //version api
  app.use('/api/v2/scheduling', router)
}
