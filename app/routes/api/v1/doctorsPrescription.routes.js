import { Router } from 'express'
import authMiddleware from '../../../middleware/auth'
const controller = require('../../../controllers/doctorsPrescription.controller.js')
const validate = require('../../../validator/doctorsPrescription.validation')

const router = Router()

module.exports = (app) => {
  //middleware jwt
  router.use(authMiddleware)

  //get
  router.get('/', controller.findAll)

  // get find one
  router.get('/:uuid', controller.findOne)

  // create
  router.post('/', validate.create, controller.create)

  //version api
  app.use('/api/v1/doctors_prescription', router)
}
