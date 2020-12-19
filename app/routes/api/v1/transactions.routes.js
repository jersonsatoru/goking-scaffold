const router = require('express').Router()
const controller = require('../../../controllers/transaction.controller.js')

module.exports = (app) => {
  // Create
  router.post('/', controller.postbackUpdate)

  app.use('/api/v1/postback_transaction', router)
}
