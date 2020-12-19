import { Router } from 'express'

const router = Router()

module.exports = (app) => {
  //version api
  app.use('/api/v1/faq_answer', router)
}
