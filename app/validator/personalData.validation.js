const { check, validationResult } = require('express-validator/check')

exports.create = [
  check('birth_day').notEmpty(),
  check('mother_name').notEmpty(),
  check('gender').notEmpty(),
  check('cellphone').notEmpty(),
  check('document').notEmpty(),
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
  check('birth_day').notEmpty(),
  check('mother_name').notEmpty(),
  check('gender').notEmpty(),
  check('cellphone').notEmpty(),
  check('document').notEmpty(),
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
