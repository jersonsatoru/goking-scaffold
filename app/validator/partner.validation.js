const { check, validationResult } = require('express-validator/check')

exports.create = [
  check('unit_id').notEmpty(),
  check('unit_name').notEmpty(),
  check('phone').notEmpty(),
  check('street').notEmpty(),
  check('number').notEmpty(),
  check('complement').notEmpty(),
  check('zip').notEmpty(),
  check('neighborhood').notEmpty(),
  check('city').notEmpty(),
  check('state').notEmpty(),
  check('zone').notEmpty(),
  check('latitude').notEmpty(),
  check('longitude').notEmpty(),
  check('country').notEmpty(),
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
