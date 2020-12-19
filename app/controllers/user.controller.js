const db = require('../models')
const { v4: uuidv4 } = require('uuid')
const { sendEmailVerify } = require('../modules/mailer')
const bcrypt = require('bcrypt')
const moment = require('moment') // require
const repositoryUser = require('../repository/user.repository')
const { doctorSchedule } = require('../models')
const User = db.users
const PersonalData = db.personalData
const Address = db.address
const Token = db.token
const Op = db.Sequelize.Op

const Payment = db.payment
const MedicalRecord = db.medicalRecord
const MedicalRecordQuestion = db.medicalRecordQuestion
const Product = db.products
const Schenduling = db.scheduling
const Area = db.area
const AreaUser = db.areaUser

const sequelize = db.sequelize
const { QueryTypes } = require('sequelize')

// Retrieve all from the database.
exports.findAllDoctor = async (req, res) => {
  const weekday = moment(req.body.scheduling_date)
    .locale('pt-br')
    .format('dddd')

  // Get
  sequelize
    .query(
      'SELECT ' +
        'user.id,' +
        'user.created_at,' +
        'user.created_id,' +
        'user.uuid,' +
        'user.name,' +
        'user.document,' +
        'user.email,' +
        'user.img,' +
        'user.status,' +
        'doctorSchedules.status_description, ' +
        'doctorSchedules.day as weekday ' +
        'FROM users AS user ' +
        'left JOIN doctor_schedule AS doctorSchedules ON user.id = doctorSchedules.user_id AND doctorSchedules.status = 1 ' +
        ' WHERE user.type = :type AND user.status = :status AND day = :day' +
        ' GROUP BY user.id, user.created_at, user.created_id, user.uuid, user.name, user.document, user.email, user.img, user.status, doctorSchedules.status_description, doctorSchedules.day',
      {
        replacements: {
          type: '2',
          status: '1',
          day: weekday,
        },
        type: QueryTypes.SELECT,
      }
    )
    .then((users) => {
      // return json
      return res.status(200).send({
        status: true,
        message: 'The request has succeeded',
        data: {
          users: users,
        },
      })
    })
    .catch(() => {
      // return json
      return res.status(500).send({
        status: false,
        message: 'The request has not succeeded',
        data: null,
      })
    })
}

// Retrieve all from the database.
exports.findAll = async (req, res) => {
  let userId = req.userId ? req.userId : null
  // //get personalData uuid to user_id
  const personalData = await PersonalData.findOne({
    attributes: [
      'birth_day',
      'mother_name',
      'gender',
      'cellphone',
      'professional_document_type',
      'professional_document_uf',
      'professional_document_number',
      'specialty',
    ],
    where: { user_id: userId },
  })

  // //get address uuid to user_id
  const address = await Address.findOne({
    attributes: [
      'uuid',
      'created_at',
      'created_id',
      'profile',
      'street',
      'number',
      'complement',
      'zip',
      'neighborhood',
      'city',
      'state',
    ],
    where: { user_id: userId },
  })
  ;('')
  // //get payment uuid to user_id
  const payment = await Payment.findOne({
    where: { user_id: userId },
    order: [['id', 'DESC']],
  })

  let product_id = payment ? payment.product_id : null
  // //get product uuid to user_id
  const product = await Product.findOne({
    attributes: [
      'uuid',
      'created_at',
      'created_id',
      'title',
      'installment_value',
      'amount',
    ],
    where: { id: product_id },
  })

  const area_user = await AreaUser.findAll({ where: { user_id: userId } })
  let area_occupation = []
  for (let index = 0; index < area_user.length; index++) {
    area_occupation[index] = await Area.findOne({
      attributes: ['uuid', 'name'],
      where: {
        id: area_user[index].area_id,
      },
    })
  }

  let plan = {
    title: product ? product.title : null,
    status_description: product ? payment.status_description : null,
    due_date: product ? payment.due_date : null,
  }

  User.findOne({
    attributes: [
      'created_at',
      'created_id',
      'uuid',
      'name',
      'document',
      'email',
      'img',
      'status',
      'missao_covid_id',
    ],
    where: { id: userId },
  })
    .then((data) => {
      //return json
      res
        .send({
          status: true,
          message: 'The request has succeeded',
          data: {
            users: data,
            personal_data: personalData ? personalData : null,
            address: address ? address : null,
            plan: {
              name: plan.title,
              payment: plan.status_description,
              due_date: plan.due_date,
            },
            area: area_occupation,
          },
        })
        .status(200)
    })
    .catch(() => {
      //return json
      res
        .send({
          status: false,
          message: 'The request has not succeeded',
          data: null,
        })
        .status(500)
    })
}

// Retrieve all from the database.
exports.editUser = async (req, res) => {
  if (req.body.user_uuid) {
    var userUuid = await User.findOne({ where: { uuid: req.body.user_uuid } })
  }

  var user_id = req.body.user_uuid ? userUuid.id : req.userId

  // change user password
  let $user
  if (!req.body.password) {
    $user = await User.findOne({
      attributes: ['password'],
      where: { uuid: req.userUuid },
    })
  }

  var paramsUser = {
    name: req.body.name ? req.body.name : null,
    email: req.body.email ? req.body.email : null,
    img: req.body.img ? req.body.img : null,
    password: req.body.password
      ? bcrypt.hashSync(req.body.password, 10)
      : $user.password,
    document: req.body.document ? req.body.document : null,
    updated_at: new Date().getTime(),
    updated_id: req.userId,
  }

  var paramsPersonalData = {
    document: req.body.document,
    mother_name: req.body.mother_name,
    cellphone: req.body.cellphone,
    professional_document_type: req.body.professional_document_type
      ? req.body.professional_document_type
      : null,
    professional_document_uf: req.body.professional_document_uf
      ? req.body.professional_document_uf
      : null,
    professional_document_number: req.body.professional_document_number
      ? req.body.professional_document_number
      : null,
    updated_at: new Date().getTime(),
    updated_id: req.userId,
    // specialty: req.body.specialty ? req.body.specialty : null
  }

  // let area = req.body.area ? req.body.area : 0;

  // // create or update area de occupation
  // for (let i = 0; i < area.length; i++) {
  //   const area_id = await Area.findOne({ where: { uuid: area[i] } });

  //   const validate = await AreaUser.count({
  //     where:
  //     {
  //       area_id: area_id.id,
  //       user_id: req.userId
  //     }
  //   });

  //   if (validate == 0) {
  //     AreaUser.create({ uuid: uuidv4(), area_id: area_id.id, user_id: req.userId });
  //   }

  //   if (validate > 0) {
  //     AreaUser.update({
  //       area_id: area_id.id,
  //       user_id: req.userId,
  //       updated_at: new Date().getTime(),
  //       updated_id: req.userId,
  //     }, {
  //       where: {
  //         uuid: req.userId
  //       }
  //     });
  //   }
  // };

  //edit user
  User.update(paramsUser, {
    where: { id: user_id },
  })
    .then(() => {
      //edit personal data
      PersonalData.update(paramsPersonalData, {
        where: { user_id: user_id },
      })
      return res.status(200).send({
        status: true,
        message: 'The request has succeeded',
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

exports.createPassword = async (req, res) => {
  //Association User with Token
  User.hasOne(Token, { foreignKey: 'user_id' })
  Token.belongsTo(User, { foreignKey: 'id' })
  const data = await User.findOne({
    where: {
      email: req.body.username,
      type: 3,
    },
    include: [Token],
  })

  if (!data || data == null) {
    return res.status(500).json({
      status: true,
      message: 'The request has not succeeded',
      message_error: 'Email not created',
    })
  }

  // validated token, released to create password
  if (data.created_password == 0 && data.token.status == 1) {
    const jwt = require('jsonwebtoken')
    const authConfig = require('../config/auth')
    const salt = 10
    const hash = bcrypt.hashSync(req.body.password, salt)
    const document_hash = bcrypt.hashSync(req.body.document, salt)

    //  validated cpf
    if (!checkCPF(req.body.document)) {
      return res.status(400).send({
        status: false,
        message: 'The request has not succeeded',
        data: {
          errors: [
            {
              value: req.body.document,
              msg: 'Documento inválido',
              param: 'document',
            },
          ],
        },
      })
    }

    var fields = {
      id: data.id,
      name: req.body.name,
      email: req.body.username,
      password: hash,
      document: req.body.document,
      api_token: document_hash,
    }

    //create jtw parameters
    const token = jwt.sign({ uuid: data.uuid }, authConfig.secret, {
      expiresIn: 1296000,
    })

    repositoryUser.updateDataUser(fields).then(async (response) => {
      if (response == 1) {
        // get user
        let user = await repositoryUser.select(fields)

        return res.status(200).send({
          status: true,
          message: 'The request has succeeded',
          users: {
            uuid: user.uuid,
            name: user.name,
            email: user.email,
            document: user.document,
            type: user.type,
            api_token: user.api_token,
          },
          token: token,
        })
      }
      return res.status(500).json({
        status: false,
        message: response,
      })
    })
  }
  //user already with account and password created
  if (data.created_password == 1 && data.token.status == 1) {
    return res.status(200).json({
      status: true,
      message: 'Usuário já cadastrado',
    })
  }
  //user not registered or did not validate the token by email
  if (!data || data.token.status == 0) {
    return res.status(200).json({
      status: true,
      message: 'Usuário não cadastrado',
    })
  }
}

/**
 * validate email and generate verification code
 */
exports.validateEmail = async (req, res) => {
  //Association User with Token
  User.hasOne(Token, { foreignKey: 'user_id' })
  Token.belongsTo(User, { foreignKey: 'id', primaryKey: 'id' })

  // //code generator
  var codeGenerator = Math.floor(1000 + Math.random() * 9000)

  const data = await User.findOne({
    attributes: ['id', 'name', 'email', 'created_password', 'document', 'type'],
    where: {
      [Op.or]: [{ document: req.body.username }, { email: req.body.username }],
      type: 3,
    },
    include: [
      {
        attributes: ['id', 'status'],
        model: Token,
      },
    ],
  })

  // res.send(data);
  // return;
  //insert user email
  if (!data) {
    repositoryUser.insert(req.body.username, codeGenerator).then((response) => {
      if (response.id) {
        sendEmailVerify(req.body.username, 'Verifique seu endereço de e-mail', {
          code: codeGenerator,
        })

        return res.status(200).send({
          status: true,
          message: 'We sent a code to your email address',
        })
      }

      return res.status(500).json({
        status: false,
        message: response,
      })
    })

    return
  }

  var tokenStatus = !data.token ? '' : data.token.status
  var createdPassword = !data ? '' : data.created_password

  // password criado e token validado
  if (createdPassword == 1 && tokenStatus == 1) {
    return res.status(200).send({
      status: true,
      message: 'The request has succeeded',
      data: { nome: data.name, email: data.email, type: data.type },
    })
  }

  //Token validado senha não criada
  if (createdPassword == 0 && tokenStatus == 1) {
    repositoryUser.updateToken(data.id, codeGenerator).then((response) => {
      if (response == 1) {
        sendEmailVerify(req.body.username, 'Verifique seu endereço de e-mail', {
          code: codeGenerator,
        })

        return res.status(200).send({
          status: true,
          message: 'We have sent a new code to your email address',
        })
      }
      return res.status(500).json({
        status: false,
        message: response,
      })
    })
  }

  // token não existe no banco e password criado
  if (!tokenStatus && createdPassword == 1) {
    repositoryUser
      .insertTokenOrUpdate(data.id, codeGenerator)
      .then((response) => {
        if (response.id || response == 1) {
          sendEmailVerify(
            req.body.username,
            'Verifique seu endereço de e-mail',
            {
              code: codeGenerator,
            }
          )

          return res.status(200).send({
            status: true,
            message: 'We have sent a new code to your email address',
          })
        }
        return res.status(500).json({
          status: false,
          message: response,
        })
      })
  }

  // token não validado e password não criado
  if (!tokenStatus && !createdPassword) {
    repositoryUser
      .insertTokenOrUpdate(data.id, codeGenerator)
      .then((response) => {
        if (response.id || response == 1) {
          sendEmailVerify(
            req.body.username,
            'Verifique seu endereço de e-mail',
            {
              code: codeGenerator,
            }
          )

          return res.status(200).send({
            status: true,
            message: 'We have sent a new code to your email address',
          })
        }
        return res.status(500).json({
          status: false,
          message: response,
        })
      })
  }
}
/**
 * Validate code sent by email
 */
exports.validateCode = async (req, res) => {
  //validate email and code
  User.hasOne(Token, { foreignKey: 'user_id' })
  Token.belongsTo(User, { foreignKey: 'id' })
  const data = await User.findOne({
    attributes: ['email'],
    where: { email: req.body.username },
    include: [
      {
        attributes: ['id'],
        model: Token,
        where: {
          token: req.body.code,
          status: 0,
        },
      },
    ],
  })

  //code not found
  if (!data) {
    res.status(404).send({
      status: false,
      message: 'Code invalid',
    })
  }
  //validated code and status updated to 1
  if (data) {
    repositoryUser.updateStatusToken(data).then((response) => {
      if (response == 1) {
        //code found successfully
        return res.status(200).send({
          status: true,
          message: 'The request has succeeded',
        })
      }
      return res.status(500).send({
        status: false,
        message: response,
      })
    })
  }
}

/**
 * Delete user
 * @param {uuid} req
 */
exports.delete = async (req, res) => {
  await User.destroy({
    where: {
      uuid: req.params.uuid,
    },
  })
    .then((data) => {
      if (data == 1) {
        return res.status(200).send({
          status: true,
          message: 'Usuário excluído com sucesso.',
          data: {
            users: data,
          },
        })
      }
      return res.status(404).send({
        status: false,
        message: 'Registro não encontrado.',
      })
    })
    .catch((err) => {
      //return json
      res.status(500).send({
        status: false,
        message: 'Registro não encontrado, error.',
        message_error: err,
      })
    })
}

// create user dev
exports.devCreateUser = async (req, res) => {
  //create uuid version 4
  const uuid = uuidv4()

  //hash password
  const hash = bcrypt.hashSync(req.body.password, 10)

  // variables params
  var params = {
    uuid: uuid,
    created_at: new Date().getTime(),
    created_id: null,
    name: req.body.name,
    email: req.body.email,
    document: req.body.document,
    password: hash,
    type: req.body.type,
    status: 1,
  }

  User.create(params)
    .then((data) => {
      //return json
      return res.status(200).send({
        status: true,
        message: 'The request has succeeded',
        data: {
          dev_create_user: data,
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

// create user dev
exports.devCreateUserDoctor = async (req, res) => {
  // insert user
  const insertUser = await User.create({
    uuid: uuidv4(),
    created_at: new Date().getTime(),
    created_id: null,
    name: req.body.name,
    email: req.body.email,
    document: req.body.document,
    password: bcrypt.hashSync(req.body.password, 10),
    type: 2,
    status: 1,
    status_description: 'Ativo',
  })

  // insert doctorSchedule
  var week = [
    'segunda-feira',
    'terça-feira',
    'quarta-feira',
    'quinta-feira',
    'sexta-feira',
    'sábado',
    'domingo',
  ]

  week.map(async (item, index) => {
    await doctorSchedule.create({
      uuid: uuidv4(),
      created_at: new Date().getTime(),
      created_id: insertUser.id,
      user_id: insertUser.id,
      day: item,
      ordernar: index + 1,
      start_time: '08:00:00',
      end_time: '18:00:00',
      start_pause: '12:00:00',
      end_pause: '13:00:00',
      status: 1,
      status_description: 'Ativo',
    })
  })

  await PersonalData.create({
    uuid: uuidv4(),
    created_id: null,
    created_at: new Date().getTime(),
    user_id_holder: 0,
    user_id: insertUser.id,
    professional_document_type: req.body.professional_document_type,
    professional_document_uf: req.body.professional_document_uf,
    professional_document_number: req.body.professional_document_number,
  })

  const doctorScheduling = await doctorSchedule.findAll({
    where: { user_id: insertUser.id },
  })

  return res.status(200).send({
    status: true,
    message: 'The request has succeeded',
    data: {
      user: insertUser,
      doctor_schenduling: doctorScheduling,
    },
  })
}

//user uuid
// create user dev
exports.userData = async (req, res) => {
  //get id user
  const userId = await User.findOne({ where: { uuid: req.body.user_uuid } })

  // //get personalData uuid to user_id
  const dataUser = await User.findOne({
    attributes: ['name', 'email', 'document'],
    where: { id: userId.id },
  })

  // //get address uuid to user_id
  const address = await Address.findOne({
    attributes: [
      'street',
      'number',
      'complement',
      'zip',
      'neighborhood',
      'city',
      'state',
    ],
    where: { user_id: userId.id },
  })

  // //get personalData uuid to user_id
  const personalDatadata = await PersonalData.findOne({
    attributes: ['birth_day', 'mother_name', 'gender', 'cellphone'],
    where: { user_id: userId.id },
  })

  // //get personalData uuid to user_id
  const medicarRecord = await MedicalRecord.findOne({
    attributes: ['weight', 'height'],
    where: { user_id: userId.id },
  })

  // //get personalData uuid to user_id
  const countSchenduling = await Schenduling.count({
    where: { user_id: userId.id, user_id_doctor: req.userId, status: 2 },
  })

  // first consulaition
  const firstConsultation = await Schenduling.findOne({
    attributes: ['scheduling_date'],
    where: { user_id: userId.id, user_id_doctor: req.userId },
    order: [['id', 'ASC']],
  })

  // next consultation
  const nextConsultation = await Schenduling.findOne({
    attributes: ['uuid', 'cellphone', 'scheduling_date'],
    where: { user_id: userId.id, user_id_doctor: req.userId, status: 0 },
    order: [['id', 'DESC']],
  })

  //params personal data
  const personalData = {
    birth_day: personalDatadata.birth_day ? personalDatadata.birth_day : null,
    mother_name: personalDatadata.mother_name,
    gender: personalDatadata.gender,
    cellphone: personalDatadata.cellphone,
    weight: medicarRecord.weight,
    height: medicarRecord.height,
  }

  // next consultation
  const medicalRecordQuestionData = await MedicalRecordQuestion.findAll({
    attributes: ['uuid', 'created_id', 'created_at'],
    where: { user_id: userId.id },
    order: [['id', 'DESC']],
  })

  let dataMedicalRecord = []

  // get holder and add element in the schedule
  for (let medicalRecordQuestionDatas of medicalRecordQuestionData) {
    // Deprecated
    const created_name = medicalRecordQuestionDatas.created_id
      ? await repositoryUser.selectNameDoctor(
          medicalRecordQuestionDatas.created_id
        )
      : null

    const dataValues = {
      uuid: medicalRecordQuestionDatas.uuid,
      created_at: moment
        .utc(medicalRecordQuestionDatas.created_at)
        .format('YYYY-MM-DD'),
      created_name,
    }

    dataMedicalRecord.push(dataValues)
  }

  return res.status(200).send({
    status: true,
    message: 'The request has succeeded',
    data: {
      user: dataUser ? dataUser : null,
      first_consultation: firstConsultation ? firstConsultation : null,
      next_consultation: nextConsultation ? nextConsultation : null,
      personal_data: personalData ? personalData : null,
      address: address ? address : null,
      attendance: countSchenduling ? countSchenduling : 0,
      medical_record: dataMedicalRecord,
    },
  })
}

// validate CPF
function checkCPF(strCPF) {
  var Soma
  var Resto
  Soma = 0
  if (strCPF == '00000000000' || strCPF == '11111111111') return false

  for (let i = 1; i <= 9; i++)
    Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i)
  Resto = (Soma * 10) % 11

  if (Resto == 10 || Resto == 11) Resto = 0
  if (Resto != parseInt(strCPF.substring(9, 10))) return false

  Soma = 0
  for (let i = 1; i <= 10; i++)
    Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i)
  Resto = (Soma * 10) % 11

  if (Resto == 10 || Resto == 11) Resto = 0
  if (Resto != parseInt(strCPF.substring(10, 11))) return false

  return true
}
