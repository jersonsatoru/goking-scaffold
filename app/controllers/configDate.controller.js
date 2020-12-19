const db = require('../models')
const { v4: uuidv4 } = require('uuid')
const moment = require('moment')
const ConfigDate = db.configDate

exports.findAll = async (req, res) => {
  await ConfigDate.findOne({
    attributes: ['start_date', 'end_date'],
    order: [['id', 'DESC']],
  })
    .then((data) => {
      res.status(200).send({
        status: true,
        message: 'The request has succeeded',
        data: {
          config_date: data,
        },
      })
    })
    .catch((err) => {
      console.log(err)
      res
        .status(500)
        .send({
          status: false,
          message: 'The request has not succeeded',
          data: null,
        })
        .status(500)
    })
}

exports.update = async (req, res) => {
  const config_date = ConfigDate.findOne({
    where: {
      uuid: req.body.uuid,
    },
  })

  if (!config_date) {
    res.status(500).send({
      status: false,
      message: 'The request has not succeeded',
    })
  }

  ConfigDate.update(
    {
      start_date: moment(req.body.start_date).format('YYYY-DD-MM 00:00:00'),
      end_date: moment(req.body.end_date).format('YYYY-DD-MM 00:00:00'),
    },
    {
      where: { uuid: req.body.uuid },
    }
  )
    .then(() => {
      //return json
      return res.status(200).send({
        status: true,
        message: 'The request has succeeded',
      })
    })
    .catch((err) => {
      res.status(500).send({
        status: false,
        message: 'The request has not succeeded',
        message_error: err.message || 'Some error occurred while update data',
        data: null,
      })
    })
}

exports.create = async (req, res) => {
  //create uuid version 4
  const uuid = uuidv4()

  // datetime
  const timestamp = new Date().getTime()

  // variables params
  var params = {
    uuid: uuid,
    created_at: timestamp,
    created_id: req.userId,
    start_date: moment(req.body.start_date).format('YYYY-DD-MM 00:00:00'),
    end_date: moment(req.body.end_date).format('YYYY-DD-MM 00:00:00'),
    status: 1,
  }

  ConfigDate.create(params)
    .then((data) => {
      //return json
      return res.status(200).send({
        status: true,
        message: 'The request has succeeded',
        data: {
          config_date: data,
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
