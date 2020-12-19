const db = require('../models')
const { v4: uuidv4 } = require('uuid')
const DoctorSchedule = db.doctorSchedule

// Retrieve all from the database.
exports.findAll = (req, res) => {
  DoctorSchedule.findAll({ where: { user_id: req.userId } })
    .then((data) => {
      res
        .send({
          status: true,
          message: 'The request has succeeded',
          data: {
            doctor_schedule: data,
          },
        })
        .status(200)
    })
    .catch((err) => {
      console.log(err)
      res
        .send({
          status: false,
          message: 'The request has not succeeded',
          data: null,
        })
        .status(500)
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
    user_id: req.userId,
    day: req.body.day,
    ordernar: req.body.ordernar,
    start_time: req.body.start_time,
    end_time: req.body.end_time,
    start_pause: req.body.start_pause,
    end_pause: req.body.end_pause,
    status: 1,
    status_description: 'Ativo',
  }

  // Save in the database
  DoctorSchedule.create(params)
    .then((data) => {
      //return json
      res
        .send({
          status: true,
          message: 'The request has succeeded',
          data: {
            doctor_schedule: data,
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

// Update a Tutorial by the id in the request
exports.update = async (req, res) => {
  const uuid = req.params.uuid

  var uuidExists = await DoctorSchedule.findOne({ where: { uuid: uuid } })

  if (!uuidExists) {
    return res.status(500).send({
      status: false,
      message: 'The request has not succeeded',
    })
  }

  // variables params
  const params = {
    day: req.body.day,
    ordernar: req.body.ordernar,
    start_time: req.body.start_time,
    end_time: req.body.end_time,
    start_pause: req.body.start_pause,
    end_pause: req.body.end_pause,
    updated_at: new Date().getTime(),
    updated_id: req.userId,
    status: req.body.status,
    status_description: req.body.status == 1 ? 'Ativo' : 'Inativo',
  }

  DoctorSchedule.update(params, {
    where: { uuid: uuid },
  })
    .then(() => {
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
