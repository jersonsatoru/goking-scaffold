import { Router } from 'express'
import authMiddleware from '../../../middleware/auth'
const controller = require('../../../controllers/medicalRecordQuestion.controller.js')
const validate = require('../../../validator/medicalRecordQuestion.validation')

const router = Router()

module.exports = (app) => {
  //middleware jwt
  router.use(authMiddleware)

  // Retrieve all controller
  router.get('/', controller.findAll)

  // Retrieve a single Tutorial with id
  router.get('/:uuid', controller.findOne)

  // Create a new idatabase
  router.post('/', validate.create, controller.create)

  // Create a new idatabase
  router.post('/update', controller.update)

  router.get('/new_medical_record/:uuid', controller.newMedicalRecord)

  //version api
  app.use('/api/v1/medical_record_question', router)
}
