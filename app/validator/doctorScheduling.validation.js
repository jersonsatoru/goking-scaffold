const { check, validationResult } = require('express-validator/check')

exports.create = [
  check('day').notEmpty(),
  check('ordernar').notEmpty(),
  check('start_time').notEmpty(),
  check('end_time').notEmpty(),
  check('start_pause').notEmpty(),
  check('end_pause').notEmpty(),
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
  check('day').notEmpty(),
  check('ordernar').notEmpty(),
  check('start_time').notEmpty(),
  check('end_time').notEmpty(),
  check('start_pause').notEmpty(),
  check('end_pause').notEmpty(),
  check('status').notEmpty(),
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
