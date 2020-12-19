const { check, oneOf, validationResult } = require('express-validator/check')
const validator = require('validator')

exports.login = [
  oneOf([
    check('username')
      .not()
      .isEmpty()
      .custom((value) => {
        if (validator.isNumeric(value) && value.length <= 11) {
          return true
        }
        if (validator.isEmail(value)) {
          return true
        }
      }),
  ]),
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
