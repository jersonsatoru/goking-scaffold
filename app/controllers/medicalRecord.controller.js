const db = require('../models')
const { v4: uuidv4 } = require('uuid')
const MedicalRecord = db.medicalRecord
const User = db.users

// Retrieve all from the database.
exports.findAll = (req, res) => {
  // Get in the database
  MedicalRecord.findAll({
    where: { user_id: req.userId },
  })
    .then((data) => {
      //return json
      res
        .send({
          status: true,
          message: 'The request has succeeded',
          data: {
            medical_record: data,
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

// Find a single data with an uuid
exports.findOne = async (req, res) => {
  //get user uuid
  const user_uuid = await User.findOne({ where: { uuid: req.params.uuid } })

  if (!user_uuid) {
    //return json
    res.status(500).send({
      status: false,
      message: 'The request has not succeeded',
      data: null,
    })
  }

  MedicalRecord.findOne({ where: { user_id: user_uuid.id } })
    .then((data) => {
      //return json
      res.status(200).send({
        status: true,
        message: 'The request has succeeded',
        data: {
          medical_record: data,
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

  if (req.body.user_uuid) {
    var userId = await User.findOne({ where: { uuid: req.body.user_uuid } })

    if (!userId) {
      return res.status(404).send({
        status: true,
        message: 'The request has succeeded', 
        message_error: 'Dependente não encontrado.'
      });
    }
  }

// return res.json(userId);
  const medicalRecordExists = await MedicalRecord.count({
    where: { user_id: userId ? userId.id : req.userId }
  });

  if (medicalRecordExists) {
    return res.status(200).send({
      status: true,
      message: 'The request has succeeded',
      message_error: 'Ficha médica já cadastrada.'
    });
  }

  // variables params
  const params = {
    uuid: uuid,
    created_at: timestamp,
    created_id: req.userId,
    user_id_holder: req.userId,
    user_id: req.body.user_uuid ? userId.id : req.userId,
    profile: req.body.user_uuid ? 'Dependente' : 'Titular',
    weight: req.body.weight,
    height: req.body.height,
    health_problems: JSON.stringify(req.body.health_problems),
    continuous_remedy: req.body.continuous_remedy,
    medical_allergy_description: req.body.medical_allergy_description,
    pregnant: req.body.pregnant,
    status: 1,
  }

  // Save in the database
  MedicalRecord.create(params)
    .then((data) => {
      //return json
      res
        .send({
          status: true,
          message: 'The request has succeeded',
          data: {
            medical_record: data,
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
        message_errorr: err,
        data: null,
      })
    })
}

/**
 * Update Personal data
 * @param {uuid} req
 */
exports.update = async (req, res) => {
  //create uuid version 4
  const uuid = uuidv4()

  // datetime
  const timestamp = new Date().getTime()

  if (req.body.user_uuid) {
    var user_uuid = await User.findOne({ where: { uuid: req.body.user_uuid } })
  }

  var user_id = req.body.user_uuid ? user_uuid.id : req.userId

  MedicalRecord.destroy({ where: { user_id: user_id } })

  // variables params
  const params = {
    uuid: uuid,
    created_at: timestamp,
    created_id: req.userId,
    user_id_holder: req.userId,
    user_id: req.body.user_uuid ? user_uuid.id : req.userId,
    profile: req.body.user_uuid ? 'Dependente' : 'Titular',
    weight: req.body.weight,
    height: req.body.height,
    health_problems: JSON.stringify(req.body.health_problems),
    continuous_remedy: req.body.continuous_remedy,
    medical_allergy_description: req.body.medical_allergy_description,
    pregnant: req.body.pregnant,
    status: 1,
  }

  // Save in the database
  MedicalRecord.create(params)
    .then((data) => {
      //return json
      res
        .send({
          status: true,
          message: 'The request has succeeded',
          data: {
            medical_record: data,
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
        message_errorr: err,
        data: null,
      })
    })
}
