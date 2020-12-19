module.exports = (app) => {
  const router = require('express').Router()

  //controllers
  const controller = require('../../../controllers/import.controller.js')

  // create payment
  router.post('/', controller.importCSV)

  //version api
  app.use('/api/v1/import', router)
}
