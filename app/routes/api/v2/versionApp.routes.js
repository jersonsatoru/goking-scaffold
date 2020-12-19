import { Router } from 'express'
const controller = require('../../../controllers/v2/versionApp.controller.js')
// const validate = require('../../../validator/area.validation')

const router = Router()

module.exports = (app) => {

  router.get('/:uuid', controller.findOne)

  router.put('/:uuid', controller.update)

  router.post('/', controller.create)

  //version api
  app.use('/api/v2/versionApp', router)
}
