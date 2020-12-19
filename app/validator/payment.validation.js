const { check, validationResult } = require('express-validator/check')

exports.payment = [
  //check('email').isEmail(),
  check('product_uuid').notEmpty(),
  check('card_number').custom((value, { req }) => {
    if (req.body.payment_method == 'credit_card' && !value) {
      return false
    }
    return true
  }),
  check('card_cvv').custom((value, { req }) => {
    if (req.body.payment_method == 'credit_card' && !value) {
      return false
    }
    return true
  }),
  check('card_expiration_date').custom((value, { req }) => {
    if (req.body.payment_method == 'credit_card' && !value) {
      return false
    }
    return true
  }),
  check('card_holder_name').custom((value, { req }) => {
    if (req.body.payment_method == 'credit_card' && !value) {
      return false
    }
    return true
  }),
  check('payment_method').notEmpty(),
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
