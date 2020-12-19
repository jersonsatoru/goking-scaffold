const db = require('../models')
const { v4: uuidv4 } = require('uuid')
const Model = db.partner
const Op = db.Sequelize.Op

// Retrieve all from the database.
exports.findAll = (req, res) => {
  const unit_name = req.query.unit_name
  var condition = unit_name
    ? {
        unit_name: {
          [Op.like]: `%${unit_name}%`,
        },
      }
    : null
  // Get in the database
  Model.findAll({ where: condition })
    .then((data) => {
      //return json
      res
        .send({
          status: true,
          message: 'The request has succeeded',
          data: {
            partner: data,
          },
        })
        .status(200)
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
exports.create = (req, res) => {
  //create uuid version 4
  const uuid = uuidv4()

  // datetime
  const timestamp = new Date().getTime()

  // variables params
  const params = {
    uuid: uuid,
    created_at: timestamp,
    created_id: req.userId,
    unit_id: req.body.unit_id,
    unit_name: req.body.unit_name,
    phone: req.body.phone,
    street: req.body.street,
    number: req.body.title,
    complement: req.body.complement,
    zip: req.body.zip,
    neighborhood: req.body.neighborhood,
    city: req.body.city,
    state: req.body.state,
    zone: req.body.zone,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    country: req.body.country,
    status: 1,
    //published: req.body.published ? req.body.published : false
  }

  // Save in the database
  Model.create(params)
    .then((data) => {
      //return json
      res
        .send({
          status: true,
          message: 'The request has succeeded',
          data: {
            partner: data,
          },
        })
        .status(200)
    })
    .catch((err) => {
      //return json
      res.status(500).send({
        status: false,
        message: 'The request has not succeeded',
        message_error: err.message || 'Some error occurred while creating data',
        data: null,
      })
    })
}
