import { calculaIdade } from '../functions'
import mcApi from '../modules/missaoCovid'

const db = require('../models')
const { v4: uuidv4 } = require('uuid')
const Address = db.address
const User = db.users
const PersonalData = db.personalData

// Retrieve all from the database.
exports.findAll = (req, res) => {
  Address.findAll({ where: { user_id: req.userId } })
    .then((data) => {
      res
        .send({
          status: true,
          message: 'The request has succeeded',
          data: {
            address: data,
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
    //return json
    res.status(500).send({
      status: false,
      message: 'The request has not succeeded',
      data: null,
    })
  }

  Address.findOne({ where: { user_id: user_uuid.id } })
    .then((data) => {
      //return json
      res.status(200).send({
        status: true,
        message: 'The request has succeeded',
        data: {
          address: data,
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

  const findUser = await User.findOne({
    where: { id: req.userId },
  })

  const findPersonalData = await PersonalData.findOne({
    where: { user_id: req.userId },
  })

  const birthDate = calculaIdade(findPersonalData.dataValues.birth_day)

  try {
    const response = await mcApi.post('/add-patient', {
      data: {
        nome: findUser.dataValues.name,
        email: findUser.dataValues.email,
        cpf: findUser.dataValues.document,
        password: findUser.dataValues.password,
        telefone: findPersonalData.dataValues.cellphone,
        idade: birthDate,
        cidade: req.body.city,
        estado: req.body.state,
      },
    })

    console.log(response)

    console.log(req.body)

    // variables params
    const params = {
      uuid: uuid,
      created_at: timestamp,
      created_id: req.userId,
      user_id_holder: req.userId,
      user_id: req.body.user_uuid ? user_uuid.id : req.userId,
      profile: req.body.user_uuid ? 'Dependente' : 'Titular',
      street: req.body.street,
      number: req.body.number,
      complement: req.body.complement,
      zip: req.body.zip,
      neighborhood: req.body.neighborhood,
      city: req.body.city,
      state: req.body.state,
      country: 'BR',
      status: 1,
    }

    await User.update(
      { missao_covid_id: response.data.patient.id },
      {
        where: { id: req.userId },
      }
    )

    const responseStart = await Address.create(params)

    return res.status(200).send({
      status: true,
      message: 'The request has succeeded',
      data: {
        address: responseStart,
      },
    })
  } catch (err) {
    console.log('EROOR MISSAO: ', err)
    res.status(500).send({
      status: false,
      message: 'The request has not succeeded',
      message_error: err.message || 'Some error occurred while creating data',
      data: null,
    })
  }
}

/**
 * Update Personal data
 * @param {uuid} req
 */
exports.update = async (req, res) => {
  if (req.body.user_uuid) {
    var userUuid = await User.findOne({
      where: { user_id: req.body.user_uuid },
    })
  }

  var user_id = req.body.user_uuid ? userUuid.id : req.userId

  Address.update(req.body, {
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
