import { Router } from 'express'
import authMiddleware from '../../../middleware/auth'

const controller = require('../../../controllers/personalData.controller.js')
const validate = require('../../../validator/personalData.validation')

const router = Router()

module.exports = (app) => {
  //middleware jwt
  router.use(authMiddleware)

  //get
  router.get('/', controller.findAll)

  router.get('/:uuid', controller.findOne)

  router.post('/', validate.create, controller.create)

  //router.get("/: uuid_user ", controller.show);

  router.post('/update', validate.update, controller.update)

  //version api
  app.use('/api/v1/personal_data', router)
}
