module.exports = (app) => {
  const router = require('express').Router()

  //controllers
  const controller = require('../../../controllers/companie.controller.js')

  // create payment
  router.get('/', controller.findAll)

  // create
  router.post('/', controller.create)

  // edit
  router.post('/update', controller.update)

  //version api
  app.use('/api/v1/companie', router)
}
