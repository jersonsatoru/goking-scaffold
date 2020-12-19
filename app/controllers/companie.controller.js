const db = require('../models')
const { v4: uuidv4 } = require('uuid')
const Companie = db.companie
const Address = db.address
const Op = db.Sequelize.Op

// Retrieve all from the database.
exports.findAll = (req, res) => {
  // Get in the database
  Companie.findAll({
    attributes: [
      'uuid',
      'national_registration',
      'legal_nature',
      'legal_name',
      'status',
    ],
  })
    .then((data) => {
      //return json
      res
        .send({
          status: true,
          message: 'The request has succeeded',
          data: {
            companie: data,
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
  // variables params
  const paramsCompanie = {
    uuid: uuidv4(),
    created_at: new Date().getTime(),
    created_id: req.userId,
    national_registration: req.body.national_registration,
    legal_name: req.body.legal_name,
    legal_nature: req.body.legal_nature,
    status: 1,
  }

  // Save in the database
  Companie.create(paramsCompanie)
    .then((data) => {
      // Save in the database
      Address.create({
        uuid: uuidv4(),
        created_at: new Date().getTime(),
        created_id: req.userId,
        companie_id: data.id,
        street: req.body.street,
        number: req.body.number,
        complement: req.body.complement,
        zip: req.body.zip,
        neighborhood: req.body.neighborhood,
        city: req.body.city,
        state: req.body.state,
        country: 'BR',
        status: 1,
      })

      //return json
      res.status(200).send({
        status: true,
        message: 'The request has succeeded',
        data: {
          companie: data,
        },
      })
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

// update
exports.update = async (req, res) => {
  const dataCompanie = await Companie.findOne({
    where: { uuid: req.body.companie_uuid },
  })

  // variables params
  const paramsCompanie = {
    national_registration: req.body.national_registration,
    legal_name: req.body.legal_name,
    legal_nature: req.body.legal_nature,
    updated_at: new Date().getTime(),
    updated_id: req.userId,
    status: 1,
  }
  const paramsAddressCompanie = {
    street: req.body.street,
    number: req.body.number,
    complement: req.body.complement,
    zip: req.body.zip,
    neighborhood: req.body.neighborhood,
    city: req.body.city,
    state: req.body.state,
    country: 'BR',
    updated_at: new Date().getTime(),
    updated_id: req.userId,
    status: 1,
  }

  Companie.update(paramsCompanie, {
    where: { id: dataCompanie.id },
  })
    .then((data) => {
      Address.update(paramsAddressCompanie, {
        where: { companie_id: dataCompanie.id },
      })

      res.status(200).send({
        status: true,
        message: 'Data was updated successfully.',
      })
    })
    .catch((err) => {
      res.status(500).send({
        status: false,
        message: 'The request has not succeeded',
        data: err,
      })
    })
}
