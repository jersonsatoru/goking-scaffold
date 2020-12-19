const { check, validationResult } = require('express-validator/check')

exports.create = [
  check('street').notEmpty(),
  check('number').notEmpty(),
  check('zip').notEmpty(),
  check('neighborhood').notEmpty(),
  check('city').notEmpty(),
  check('state').notEmpty(),
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
  check('street').notEmpty(),
  check('number').notEmpty(),
  check('zip').notEmpty(),
  check('neighborhood').notEmpty(),
  check('city').notEmpty(),
  check('state').notEmpty(),
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
