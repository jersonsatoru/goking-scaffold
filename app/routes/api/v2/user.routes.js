import authMiddleware from '../../../middleware/auth'

const router = require('express').Router()
const controller = require('../../../controllers/v2/user.controller.js')
const validate = require('../../../validator/user.validation')

module.exports = (app) => {
  //develop create user
  router.post(
    '/dev_create_user',
    validate.devCreateUser,
    controller.devCreateUser
  )
  router.post('/dev_create_user_doctor', controller.devCreateUserDoctor)

  router.post('/verify_email', validate.validateEmail, controller.validateEmail)
  router.post('/verify_code', controller.validateCode)
  router.post('/', validate.create, controller.createPassword)

  //middleware jwt
  router.use(authMiddleware)

  router.get('/', controller.findAll)

  // get doctor
  router.post('/user_doctor', controller.findAllDoctor)

  //edit user
  router.post('/edit_user', validate.updated, controller.editUser)

  //get user uuid
  router.post('/user_data', controller.userData)

  router.delete('/:uuid', controller.delete)

  //version api
  app.use('/api/v2/users', router)
}
