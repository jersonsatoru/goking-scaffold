const { check, validationResult } = require('express-validator/check')

exports.create = [
  check('prescription_id').notEmpty(),
  check('user_uuid_doctor').notEmpty(),
  check('authentication_code').notEmpty(),
  check('prescription_url').notEmpty(),
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
