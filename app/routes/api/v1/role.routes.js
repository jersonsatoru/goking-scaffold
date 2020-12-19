import { Router } from 'express'
const controller = require('../../../controllers/role.controller.js')

const router = Router()

module.exports = (app) => {
  router.get('/', controller.findAll)

  //version api
  app.use('/api/v1/role', router)
}
