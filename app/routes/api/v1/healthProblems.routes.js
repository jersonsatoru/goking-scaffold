import { Router } from 'express'
import authMiddleware from '../../../middleware/auth'
const controller = require('../../../controllers/healthProblems.controller.js')

const router = Router()

module.exports = (app) => {
  //middleware jwt
  router.use(authMiddleware)

  router.get('/', controller.findAll)

  //version api
  app.use('/api/v1/health_problems', router)
}
