const router = require('express').Router()
const controller = require('../../../controllers/tutorial.controller.js')

module.exports = (app) => {
  // Create a new Tutorial
  router.post('/', controller.create)

  // Retrieve all controller
  router.get('/', controller.findAll)

  // Retrieve all published controller
  router.get('/published', controller.findAllPublished)

  // Retrieve a single Tutorial with id
  router.get('/:id', controller.findOne)

  // Update a Tutorial with id
  router.put('/:id', controller.update)

  // Delete a Tutorial with id
  router.delete('/:id', controller.delete)

  // Delete all controller
  router.delete('/', controller.deleteAll)

  app.use('/api/v1/tutorials', router)
}
