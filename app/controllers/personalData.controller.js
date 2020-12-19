const db = require('../models')
const { v4: uuidv4 } = require('uuid')
const Model = db.personalData
const User = db.users

// Retrieve all from the database.
exports.findAll = (req, res) => {
  Model.findAll({
    where: { user_id: req.userId },
  })
    .then((data) => {
      res
        .send({
          status: true,
          message: 'The request has succeeded',
          data: {
            personal_data: data,
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

// Find a single data with an uuid
exports.findOne = async (req, res) => {
  //get user uuid
  const user_uuid = await User.findOne({ where: { uuid: req.params.uuid } })

  if (!user_uuid) {
    return res.status(500).send({
      status: false,
      message: 'The request has not succeeded',
      data: null,
    })
  }

  Model.findOne({ where: { user_id: user_uuid.id } })
    .then((data) => {
      //return json
      res.status(200).send({
        status: true,
        message: 'The request has succeeded',
        data: {
          personal_data: data,
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

  //get user uuid
  if (req.body.user_uuid) {
    var user_uuid = await User.findOne({ where: { uuid: req.body.user_uuid } })
  }

  try {
    // variables params
    const params = {
      uuid: uuid,
      created_at: timestamp,
      created_id: req.userId,
      user_id_holder: req.userId,
      user_id: req.body.user_uuid ? user_uuid.id : req.userId,
      profile: req.body.user_uuid ? 'Dependente' : 'Titular',
      birth_day: req.body.birth_day,
      mother_name: req.body.mother_name,
      gender: req.body.gender,
      cellphone: req.body.cellphone,
      document: req.body.document,
      status: 1,
    }

    const responseStar = await Model.create(params)

    return res.status(200).send({
      status: true,
      message: 'The request has succeeded',
      data: {
        personal_data: responseStar,
      },
    })
  } catch (err) {
    res.status(500).send({
      status: false,
      message: 'The request has not succeeded',
      message_error: err.message || 'Some error occurred while creating data',
      data: null,
    })
  }
}

/**
 * Show user's personal data
 * @param {uuid user} req
 */
exports.show = async (req, res) => {
  const { uuid_user } = req.params

  //Association User with Personal Data
  User.hasOne(Model, { foreignKey: 'user_id' })
  Model.belongsTo(User, { foreignKey: 'id' })

  const user = await User.findOne({
    attributes: [],
    where: { uuid: uuid_user },
    include: [
      {
        attributes: [
          'uuid',
          'created_at',
          'name',
          'date_birth',
          'mother_name',
          'gender',
          'weight',
          'height',
          'cellphone',
          'national_registration',
          'updated_at',
          'status',
        ],
        model: Model,
      },
    ],
  })
    .then((data) => {
      return res.status(200).send({
        status: true,
        message: 'The request has succeeded',
        data: data,
      })
    })
    .catch((err) => {
      return res.status(500).send({
        status: false,
        message: 'The request has not succeeded',
      })
    })
}

/**
 * Update Personal data
 * @param {uuid} req
 */
exports.update = async (req, res) => {
  if (req.body.user_uuid) {
    var userUuid = await User.findOne({ where: { uuid: req.body.user_uuid } })
  }

  var user_id = req.body.user_uuid ? userUuid.id : req.userId

  Model.update(req.body, {
    where: { user_id: user_id },
  })
    .then(() => {
      return res.status(200).send({
        status: true,
        message: 'Data was updated successfully.',
      })
    })
    .catch((err) => {
      return res.status(500).send({
        status: false,
        message: 'The request has not succeeded',
        data: err,
      })
    })
}
