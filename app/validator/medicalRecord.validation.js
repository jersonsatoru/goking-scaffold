const { check, validationResult } = require('express-validator/check')

exports.create = [
  check('weight').notEmpty(),
  check('height').notEmpty(),
  //check('health_problems').notEmpty(),
  //check('continuous_remedy').notEmpty(),
  //check('medical_allergy_description').notEmpty(),
  (req, res, next) => {
    /* the rest of the existing function */
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      // return json
      return res.status(400).json({
        status: false,
        messsage: 'The request has not succeeded',
        data: {
          errors: errors.array(),
        },
      })
    }
    return next()
  },
]

exports.update = [
  check('weight').notEmpty(),
  check('height').notEmpty(),
  //check('health_problems').notEmpty(),
  //check('continuous_remedy').notEmpty(),
  //check('medical_allergy_description').notEmpty(),
  (req, res, next) => {
    /* the rest of the existing function */
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      // return json
      return res.status(400).json({
        status: false,
        messsage: 'The request has not succeeded',
        data: {
          errors: errors.array(),
        },
      })
    }
    return next()
  },
]
