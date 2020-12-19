const db = require('../models')
const { v4: uuidv4 } = require('uuid')
const DoctorsPrescription = db.doctorsPrescription
const User = db.users

// Retrieve all from the database.
exports.findAll = async (req, res) => {
  DoctorsPrescription.findAll({
    where: { user_id: req.userId },
  })
    .then((data) => {
      res.status(200).send({
        status: true,
        message: 'The request has succeeded',
        data: {
          doctors_prescription: data,
        },
      })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send({
        status: false,
        message: 'The request has not succeeded',
        data: null,
      })
    })
}

// Find a single data with an uuid
exports.findOne = async (req, res) => {
  //get id to uuid
  const userUuid = await User.findOne({ where: { uuid: req.params.uuid } })

  // findOne database to user_id
  DoctorsPrescription.findOne({ where: { user_id: userUuid.id } })
    .then((data) => {
      //return json
      res.status(200).send({
        status: true,
        message: 'The request has succeeded',
        data: {
          doctors_prescription: data,
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

  // get id to uuid
  const userUuidDoctor = await User.findOne({
    where: { uuid: req.body.user_uuid_doctor },
  })

  const userUuidPatient = await User.findOne({
    where: { uuid: req.body.user_uuid },
  })

  // variables params
  const params = {
    uuid: uuid,
    created_at: timestamp,
    created_id: req.userId,
    prescription_id: req.body.prescription_id,
    authentication_code: req.body.authentication_code,
    prescription_url: req.body.prescription_url,
    user_id_doctor: userUuidDoctor.id,
    user_id_holder: userUuidPatient.id,
    user_id: userUuidPatient.id,
    scheduling_date: req.body.scheduling_date,
    status: 1,
    status_description: 'Ativo',
  }

  DoctorsPrescription.create(params)
    .then((data) => {
      //return json
      return res.status(200).send({
        status: true,
        message: 'The request has succeeded',
        data: {
          doctors_prescription: data,
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
