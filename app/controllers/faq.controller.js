const db = require('../models')
const { v4: uuidv4 } = require('uuid')
const Faq = db.faq
const Answer = db.answer

// Retrieve all from the database.
exports.findAll = (req, res) => {
  // relation table faq_answer
  Faq.hasMany(Answer, { foreignKey: 'faq_id' })

  // relation table faq
  Answer.belongsTo(Faq, { foreignKey: 'id' })

  Faq.findAll({
    //attributes: ['uuid', 'question'],
    where: {
      status: 1,
    },

    include: [
      {
        model: Answer,
        attributes: ['id', 'uuid', 'answer'],
      },
    ],
  })
    .then((data) => {
      res.status(200).send({
        status: true,
        message: 'The request has succeeded',
        data: {
          faq: data,
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
    question: req.body.question,
    status: 1,
  }

  Faq.create(params)
    .then((data) => {
      //return json
      return res.status(200).send({
        status: true,
        message: 'The request has succeeded',
        data: {
          faq: data,
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

// Create and Save in the database
exports.answer = async (req, res) => {
  //create uuid version 4
  const uuid = uuidv4()

  // datetime
  const timestamp = new Date().getTime()

  // variables params
  const params = {
    uuid: uuid,
    created_at: timestamp,
    created_id: req.userId,
    faq_id: req.body.faq_id,
    answer: req.body.answer,
    status: 1,
  }

  Answer.create(params)
    .then((data) => {
      //return json
      return res.status(200).send({
        status: true,
        message: 'The request has succeeded',
        data: {
          faq: data,
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
