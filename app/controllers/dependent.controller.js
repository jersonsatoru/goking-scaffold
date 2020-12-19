const db = require('../models')
const { v4: uuidv4 } = require('uuid')
const User = db.users

// Retrieve all from the database.
exports.findAll = (req, res) => {
  User.findAll({ where: { user_id: req.userId } })
    .then((data) => {
      //return json
      res.status(200).send({
        status: true,
        message: 'The request has succeeded',
        data: {
          dependent: data,
        },
      })
    })
    .catch((err) => {
      //return json
      res.status(500).send({
        status: false,
        message: 'The request has not succeeded',
        message_error: err,
        data: null,
      })
    })
}

// Find a single data with an uuid
exports.findOne = (req, res) => {
  const uuid = req.params.id

  User.findOne({ where: { uuid: uuid } })
    .then((data) => {
      //return json
      res.status(200).send({
        status: true,
        message: 'The request has succeeded',
        data: {
          dependet: data,
        },
      })
    })
    .catch((err) => {
      //return json
      res.status(500).send({
        status: false,
        message: 'The request has not succeeded',
        message_error: err,
        data: null,
      })
    })
}

// Create and Save in the database
exports.create = async (req, res) => {
  //create uuid version 4
  const uuid = uuidv4()

  // datetime
  const timestamp = new Date().getTime()

  // variables params
  const params = {
    uuid: uuid,
    created_at: timestamp,
    created_id: req.userId,
    user_id: req.userId,
    name: req.body.name,
    email: req.body.email,
    document: req.body.document,
    type: 4,
    status: 1,
    status_description: 'Ativo',
  }

  // Save in the database
  User.create(params)
    .then((data) => {
      //return json
      res.status(200).send({
        status: true,
        message: 'The request has succeeded',
        data: {
          dependent: data,
        },
      })
    })
    .catch((err) => {
      //return json
      res.status(500).send({
        status: false,
        message: 'The request has not succeeded',
        message_error: err.message || 'Some error occurred while creating data',
        message_errorr: err,
        data: null,
      })
    })
}

// Delete in database with the specified id in the request
exports.delete = (req, res) => {
  const uuid = req.params.id

  User.destroy({
    where: { uuid: uuid },
  })
    .then((num) => {
      if (num == 1) {
        //return json
        res.status(200).send({
          status: true,
          message: 'The request has succeeded',
          data: null,
        })
      } else {
        //return json
        res.status(500).send({
          status: false,
          message: 'The request has not succeeded',
          data: null,
        })
      }
    })
    .catch((err) => {
      //return json
      res.status(500).send({
        status: false,
        message: 'The request has not succeeded',
        message_error: err.message,
        data: null,
      })
    })
}
