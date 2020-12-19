const { check, validationResult } = require('express-validator/check')
const validator = require('validator')
const db = require('../models')
const User = db.users

exports.create = [
  // check('email').isEmail(),
  check('name').isLength({ min: 5 }),
  check('password')
    .isLength({ min: 8 })
    .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/)
    .withMessage(
      'The password must be more than 8 characters in upper and lower case and contain a number'
    ),
  check('document')
    .isNumeric()
    .isLength({ min: 11, max: 11 })
    .custom((value) => {
      return User.findOne({ where: { document: value, type: 3 } }).then(
        (user) => {
          if (user) {
            return Promise.reject('Document já cadastrado')
          }
        }
      )
    }),
  (req, res, next) => {
    /* the rest of the existing function */
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      // return json
      return res.status(400).json({
        status: false,
        message: 'The request has not succeeded',
        data: {
          errors: errors.array(),
        },
      })
    }
    return next()
  },
]

exports.validateEmail = [
  check('username')
    .not()
    .isEmpty()
    .custom((value) => {
      if (validator.isNumeric(value) && value.length <= 11) {
        return User.findOne({ where: { document: value, type: 3 } }).then(
          (user) => {
            // Document not registered
            if (!user) {
              return Promise.reject('Document not registered')
            }
            // Documento registered
            return true
          }
        )
      }
      if (validator.isEmail(value)) {
        return true
      }
    }),
  (req, res, next) => {
    /* the rest of the existing function */
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      // return json
      return res.status(400).json({
        status: false,
        message: 'The request has not succeeded',
        data: {
          errors: errors.array(),
        },
      })
    }
    return next()
  },
]

exports.devCreateUser = [
  check('email').isEmail(),
  check('name').notEmpty(),
  check('password').notEmpty(),
  check('document').notEmpty(),
  check('type').notEmpty(),
  (req, res, next) => {
    /* the rest of the existing function */
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      // return json
      return res.status(400).json({
        status: false,
        message: 'The request has not succeeded',
        data: {
          errors: errors.array(),
        },
      })
    }
    return next()
  },
]

exports.updated = [
  check('email').isEmail(),
  check('name').notEmpty(),
  check('document').notEmpty(),
  //check('password').notEmpty(),
  check('mother_name').notEmpty(),
  check('cellphone').notEmpty(),
  (req, res, next) => {
    /* the rest of the existing function */
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      // return json
      return res.status(400).json({
        status: false,
        message: 'The request has not succeeded',
        data: {
          errors: errors.array(),
        },
      })
    }
    return next()
  },
]
