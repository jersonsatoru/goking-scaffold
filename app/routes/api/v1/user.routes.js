import { Router } from 'express'
import authMiddleware from '../../../middleware/auth'
const controller = require('../../../controllers/user.controller.js')
const validate = require('../../../validator/user.validation')

const router = Router()

module.exports = (app) => {
  //develop create user
  router.post(
    '/dev_create_user',
    validate.devCreateUser,
    controller.devCreateUser
  )
  router.post('/dev_create_user_doctor', controller.devCreateUserDoctor)

  //without jwt
  router.post('/verify_email', validate.validateEmail, controller.validateEmail)
  router.post('/verify_code', controller.validateCode)
  router.post('/', validate.create, controller.createPassword)

  //middleware jwt
  router.use(authMiddleware)

  router.get('/', controller.findAll)

  // get doctor
  router.get('/user_doctor', controller.findAllDoctor)

  //edit user
  router.post('/edit_user', validate.updated, controller.editUser)

  //get user uuid
  router.post('/user_data', controller.userData)

  router.delete('/:uuid', controller.delete)

  //version api
  app.use('/api/v1/users', router)
}
