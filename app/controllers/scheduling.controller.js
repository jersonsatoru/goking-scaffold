import { sendSms } from '../modules/sms'

const db = require('../models')
const { v4: uuidv4 } = require('uuid')
const moment = require('moment') // require
const {
  sendEmailUserCanceled,
  sendEmailDoctorCanceled,
  sendEmailScheduleCreateDoctor,
  sendEmailScheduleCreatePatient,
} = require('../modules/mailer')

const repositoryUser = require('../repository/user.repository')
const repositoryScheduling = require('../repository/scheduling.repository')
const repositoryPersonalData = require('../repository/personalData.repository')
const repositoryMedicalRecord = require('../repository/medicalRecordQuestion.repository')
const Scheduling = db.scheduling
const DoctorSchedule = db.doctorSchedule
const PersonalData = db.personalData
const User = db.users
const Operator = db.Sequelize

// Retrieve all from the database.
exports.findAll = async (req, res) => {
  //condition
  var condition =
    req.userType == 2
      ? { user_id_doctor: req.userId, status: req.body.status }
      : { user_id_holder: req.userId, status: req.body.status }

  const schedulings = await Scheduling.findAll({
    where: condition,
  })

  let data = []

  // get holder and add element in the schedule
  for (let scheduling of schedulings) {
    const selectUser = await repositoryScheduling.select(scheduling.user_id)
    const selectUserUUID = await repositoryUser.select({
      id: scheduling.user_id,
    })
    const selectUserPersonal = await repositoryPersonalData.select(
      scheduling.user_id
    )
    const selectMedicalRecord = await repositoryMedicalRecord.selectMedicalRecord(
      scheduling.user_id
    )
    const selectDoctor = await repositoryScheduling.select(
      scheduling.user_id_doctor
    )

    const endDate = moment
      .utc(scheduling.dataValues.scheduling_date)
      .add(15, 'm')

    const dataValues = {
      scheduling: {
        ...scheduling.dataValues,
        scheduling_end_date: new Date(endDate),
      },
      user: {
        // uuid: selectUserUUID.dataValues.uuid || '',
        // name: selectUser.dataValues.name || '',
        // email: selectUserUUID.dataValues.email || '',
        // img: selectUser.dataValues.img || '',
        // profile: selectUserPersonal.dataValues.profile || '',
        // birthDay: selectUserPersonal.dataValues.birth_day || '',
        // gender: selectUserPersonal.dataValues.gender || '',
        uuid: selectUserUUID ? selectUserUUID.dataValues.uuid : '',
        name: selectUser ? selectUser.dataValues.name : '',
        email: selectUserUUID ? selectUserUUID.dataValues.email : '',
        img: selectUser ? selectUser.dataValues.img : '',
        profile: selectUserPersonal
          ? selectUserPersonal.dataValues.profile
          : '',
        birthDay: selectUserPersonal
          ? selectUserPersonal.dataValues.birth_day
          : '',
        gender: selectUserPersonal ? selectUserPersonal.dataValues.gender : '',
        cellphone: selectUserPersonal
          ? selectUserPersonal.dataValues.cellphone
          : '',
        document: selectUserPersonal
          ? selectUserPersonal.dataValues.document
          : '',
        weight: selectMedicalRecord ? selectMedicalRecord.dataValues.weight : 0,
        height: selectMedicalRecord ? selectMedicalRecord.dataValues.height : 0,
        healthProblems: selectMedicalRecord
          ? selectMedicalRecord.dataValues.health_problems
          : [],
        continuousRemedy: selectMedicalRecord
          ? selectMedicalRecord.dataValues.continuous_remedy
          : '',
        medicalAllergyDescription: selectMedicalRecord
          ? selectMedicalRecord.dataValues.medical_allergy_description
          : '',
      },
      doctor: {
        uuid: selectDoctor.dataValues.user_uuid_doctor || '',
        name: selectDoctor.dataValues.name || '',
        img: selectDoctor.dataValues.img || '',
      },
    }

    data.push(dataValues)
  }

  res.status(200).send({
    status: true,
    message: 'The request has succeeded',
    data: {
      scheduling: data,
    },
  })
}

// Find a single data with an uuid
exports.findOne = async (req, res) => {
  //get user uuid
  const schedulingExists = await Scheduling.findOne({
    where: { uuid: req.params.uuid },
  })

  if (!schedulingExists) {
    //return json
    res.status(500).send({
      status: false,
      message: 'The request has not succeeded',
      data: null,
    })
  }

  Scheduling.findOne({ where: { uuid: req.params.uuid } })
    .then((data) => {
      //return json
      res.status(200).send({
        status: true,
        message: 'The request has succeeded',
        data: {
          scheduling: data,
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
exports.schedulingCreate = async (req, res) => {
  if (req.body.user_uuid) {
    var userId = await User.findOne({ where: { uuid: req.body.user_uuid } })
  }

  //user titular or user dependent
  const idUser = req.body.user_uuid ? userId.id : req.userId

  //payment
  const payment = await repositoryScheduling.existsPayment(idUser)

  if (!payment) {
    return sendError(
      res,
      payment,
      'Você precisa contratar um plano para poder agendar consulta(s)',
      null
    )
  }

  if (payment.status === 0) {
    return res.status(500).send({
      status: false,
      message: 'The request has not succeeded',
      message_error: 'Pagamento cancelado, não é possível agendar consulta(s)',
    })
  }

  //exists medical record
  const medicalRecord = await repositoryScheduling.existsMedicalRecord(idUser)
  if (!medicalRecord) {
    return sendError(
      res,
      medicalRecord,
      'Você precisa cadastrar a ficha médica',
      null
    )
  }

  //validate existProduct
  const productExists = await repositoryScheduling.existsProduct(
    payment.product_id
  )

  if (!productExists) {
    return sendError(res, productExists, 'Plano não existente', null)
  }

  //validate doctorExists
  const doctorExists = await repositoryScheduling.existsDoctor(
    req.body.user_uuid_doctor
  )

  if (!doctorExists) {
    return sendError(res, doctorExists, 'Médico não Existente', null)
  }

  const findDoctorProfile = await PersonalData.findOne({
    where: { user_id: doctorExists.dataValues.id },
  })

  var start_month =
    moment(req.body.scheduling_date).format('YYYY') +
    '-' +
    moment(req.body.scheduling_date).format('MM') +
    '-01 08:00:00'
  var last_day_of_the_month = moment(req.body.scheduling_date)
    .endOf('month')
    .format('DD')
  var end_month =
    moment(req.body.scheduling_date).format('YYYY') +
    '-' +
    moment(req.body.scheduling_date).format('MM') +
    '-' +
    last_day_of_the_month +
    ' 21::59:00'

  const countMonth = await Scheduling.count({
    where: {
      user_id: idUser,
      status: {
        [Operator.Op.in]: [0, 1, 2],
      },
      scheduling_date: {
        [Operator.Op.between]: [start_month, end_month],
      },
    },
  })

  //condition count schenduling per month
  if (countMonth >= productExists.count_scheduling_month) {
    return res.status(500).send({
      status: false,
      message: 'The request has not succeeded',
      message_error: 'Você excedeu o limite de agendamento por mês',
    })
  }

  const countSchengulingTotal = await Scheduling.count({
    where: {
      user_id: idUser,
      status: {
        [Operator.Op.in]: [0, 1, 2],
      },
    },
  })

  //condition count total schenduling per month
  if (countSchengulingTotal >= productExists.count_scheduling) {
    return res.status(500).send({
      status: false,
      message: 'The request has not succeeded',
      data: {
        count_scheduling_limit: productExists.count_scheduling,
        count_scheduling_limit_month: productExists.count_scheduling_month,
        message: 'Você excedeu o limite de consultas do seu plano',
      },
    })
  }

  const schendulingExists = await Scheduling.findOne({
    where: {
      user_id: idUser,
      scheduling_date: req.body.scheduling_date,
      status: {
        [Operator.Op.in]: [0, 1, 2],
      },
    },
  })

  if (schendulingExists) {
    return res.status(500).send({
      status: false,
      message: 'The request has note succeeded',
      message_error:
        'agendamento existente, por favor, selecione outra data e horario',
      data: null,
    })
  }

  const patientDataFind = await User.findOne({
    where: { id: idUser },
  })

  const dateScheduling = moment.utc(req.body.scheduling_date).format()

  const scheduleData = {
    date: moment(dateScheduling).format('DD/MM/YYYY'),
    time: moment(dateScheduling).format('HH:mm'),
  }

  const doctorData = {
    ...scheduleData,
    name: doctorExists.dataValues.name,
    patient: patientDataFind.dataValues.name,
  }

  const patientData = {
    ...scheduleData,
    name: patientDataFind.dataValues.name,
    doctor: doctorExists.dataValues.name,
  }

  // Save in the database
  Scheduling.create({
    uuid: uuidv4(),
    created_id: req.userId,
    created_at: new Date().getTime(),
    user_id_doctor: doctorExists.id,
    user_id_holder: req.userId,
    user_id: idUser,
    cellphone: req.body.cellphone,
    scheduling_date: dateScheduling,
    status: 0,
    status_description: 'Pendente',
  })
    .then((data) => {
      sendEmailScheduleCreateDoctor(
        doctorExists.dataValues.email,
        'Nova Consulta Agendada',
        doctorData
      )

      sendEmailScheduleCreatePatient(
        patientDataFind.dataValues.email,
        'Consulta Agendada',
        patientData
      )

      if (
        findDoctorProfile.dataValues.cellphone &&
        findDoctorProfile.dataValues.cellphone !== '-'
      ) {
        sendSms(
          `Ola ${
            String(doctorExists.dataValues.name).split(' ')[0]
          }, uma nova consulta foi agendada para o dia ${
            scheduleData.date
          } as ${scheduleData.time}`,
          'StarBem',
          `55${findDoctorProfile.dataValues.cellphone}`
        )
      }

      sendSms(
        `Ola ${
          String(patientDataFind.dataValues.name).split(' ')[0]
        }, sua consulta foi agendada com sucesso para o dia ${
          scheduleData.date
        } as ${scheduleData.time}`,
        'StarBem',
        `55${req.body.cellphone}`
      )

      //return json
      res.status(200).send({
        status: true,
        message: 'The request has succeeded',
        data: {
          scheduling: data,
          body: req.body,
        },
      })
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

// Update in database by the id in the request
exports.update = async (req, res) => {
  const uuid = req.params.id

  // datetime
  const timestamp = new Date().getTime()

  const dataExists = await Scheduling.findOne({
    where: { uuid: uuid },
  })

  if (!dataExists) {
    //return json
    res.status(500).send({
      status: false,
      message: 'The request has not succeeded',
      message_error: 'uuid does not exist',
      data: null,
    })
    return
  }

  Scheduling.update(
    {
      star: req.body.star,
      consultation_evaluation: req.body.consultation_evaluation,
      updated_at: timestamp,
      updated_id: req.userId,
    },
    {
      where: { uuid: uuid },
    }
  )

    .then((num) => {
      if (num == 1) {
        //return json
        res.status(200).send({
          status: true,
          message: 'The request has succeeded',
          data: null,
        })
      } else {
        //return json
        res.status(500).send({
          status: false,
          message: 'The request has not succeeded',
          data: null,
        })
      }
    })
    .catch((err) => {
      //return json
      res.status(500).send({
        status: false,
        message: 'The request has not succeeded',
        message_error: err.message,
        data: null,
      })
    })
}

// Update in database by the id in the request
exports.process = async (req, res) => {
  // datetime
  const timestamp = new Date().getTime()

  const schedulingExists = await Scheduling.findOne({
    where: { uuid: req.body.scheduling_uuid },
  })

  // get find one exist
  if (!schedulingExists) {
    //return json
    res.status(500).send({
      status: false,
      message: 'The request has not succeeded',
      message_error: 'uuid does not exist',
      data: null,
    })
    return
  }

  // get user
  const user = await User.findOne({
    attributes: ['email', 'name'],
    where: { id: schedulingExists.user_id },
  })
  // get doctor
  const doctor = await User.findOne({
    attributes: ['email', 'name'],
    where: { id: schedulingExists.user_id_doctor },
  })

  // active status
  if (req.body.status == 1) {
    var data = Scheduling.update(
      {
        start_service: timestamp,
        updated_id: req.userId,
        status: 1,
        status_description: 'Atendimento Iniciado',
      },
      {
        where: { uuid: req.body.scheduling_uuid },
      }
    )
  }
  // completed status
  if (req.body.status == 2) {
    data = Scheduling.update(
      {
        end_service: timestamp,
        updated_id: req.userId,
        status: 2,
        status_description: 'Atendimento Finalizado',
      },
      {
        where: { uuid: req.body.scheduling_uuid },
      }
    )
  }
  // status canceled
  if (req.body.status == 3) {
    var cancel_service_description = req.body.cancel_service_description
      ? req.body.cancel_service_description
      : null
    data = Scheduling.update(
      {
        cancel_service: timestamp,
        updated_id: req.userId,
        status: 3,
        status_description: 'Atendimento Cancelado',
        cancel_service_description: cancel_service_description,
      },
      {
        where: { uuid: req.body.scheduling_uuid },
      }
    )

    // Sending cancellation email to patient
    sendEmailUserCanceled(user.email, 'Consulta Cancelada.', {
      name: user.name,
      date_scheduling: moment(schedulingExists.scheduling_date).format(
        'DD/MM/YYYY HH:mm'
      ),
    })

    // Send cancellation sms to patient
    sendSms(
      `Ola ${String(user.name).split(' ')[0]}, sua consulta do dia ${moment(
        schedulingExists.scheduling_date
      ).format('DD/MM/YYYY HH:mm')} foi cancelada com sucesso.`,
      'StarBem',
      `55${schedulingExists.cellphone}`
    )

    // Sending cancellation email to doctor
    sendEmailDoctorCanceled(doctor.email, 'Consulta Cancelada.', {
      name: doctor.name,
      date_scheduling: moment(schedulingExists.scheduling_date).format(
        'DD/MM/YYYY HH:mm'
      ),
    })
  }

  if (data) {
    return res.status(200).send({
      status: true,
      message: 'The request has succeeded',
      data: null,
    })
  }
  if (!data) {
    return res.status(500).send({
      status: true,
      message: 'The request has not succeeded',
      data: null,
    })
  }
}

// // Update in database by the id in the request
exports.schedulingVerify = async (req, res) => {
  if (req.body.user_uuid) {
    var userId = await User.findOne({ where: { uuid: req.body.user_uuid } })
  }

  //user titular or user dependent
  const idUser = req.body.user_uuid ? userId.id : req.userId

  //payment
  const payment = await repositoryScheduling.existsPayment(idUser)

  if (!payment) {
    return sendError(
      res,
      payment,
      'Você precisa contratar um plano para poder agendar consulta(s)',
      null
    )
  }

  if (payment.status == 0) {
    return res.status(500).send({
      status: false,
      message: 'The request has not succeeded',
      message_error: 'Aguardando Pagamento, não é possível agendar consulta(s)',
    })
  }

  //exists medical record
  const medicalRecord = await repositoryScheduling.existsMedicalRecord(idUser)
  if (!medicalRecord) {
    return sendError(
      res,
      medicalRecord,
      'Você precisa cadastrar a ficha médica',
      null
    )
  }

  //get id product
  const product = await repositoryScheduling.existsProduct(payment.product_id)
  if (!product) {
    return sendError(res, 'Plano não existente', null)
  }

  //return true
  return res.status(200).send({
    status: true,
    message: 'The request has succeeded',
    data: {
      count_scheduling_limit: product.count_scheduling,
      count_scheduling_limit_month: product.count_scheduling_month,
      first_scheduling: moment(payment.payment_date)
        .add(product.schenduling_days, 'days')
        .format('YYYY-MM-DD'),
      message: 'Você precisa cadastrar a ficha médica',
    },
  })
}

exports.schedulingVerifyCheckTime = async (req, res) => {
  if (req.body.user_uuid) {
    var userId = await User.findOne({ where: { uuid: req.body.user_uuid } })
  }

  //user titular or user dependent
  const idUser = req.body.user_uuid ? userId.id : req.userId

  //payment
  const payment = await repositoryScheduling.existsPayment(idUser)

  if (!payment) {
    return sendError(
      res,
      payment,
      'Você precisa contratar um plano para poder agendar consulta(s)',
      null
    )
  }
  if (payment.status == 0) {
    return res.status(500).send({
      status: false,
      message: 'The request has not succeeded',
      message_error: 'Aguardando Pagamento, não é possível agendar consulta(s)',
    })
  }

  //exists medical record
  const medicalRecord = await repositoryScheduling.existsMedicalRecord(idUser)
  if (!medicalRecord) {
    return sendError(
      res,
      medicalRecord,
      'Você precisa cadastrar a ficha médica',
      null
    )
  }

  //get id product
  const product = await repositoryScheduling.existsProduct(payment.product_id)
  if (!product) {
    return sendError(res, 'Plano não existente', null)
  }

  // var period = validatePeriodAll(req.body.scheduling_date);

  const weekday = moment(req.body.scheduling_date)
    .locale('pt-br')
    .format('dddd')

  const user = await User.findOne({
    where: {
      uuid: req.body.user_uuid_doctor,
    },
  })

  if (!user) {
    return res.status(500).send({
      status: false,
      message: 'The request has not succeeded',
      message_error: 'Médico não encontrado',
    })
  }

  const doctor_schedules = await DoctorSchedule.findOne({
    where: { day: weekday, user_id: user.id, status: 1 },
  })

  if (!doctor_schedules) {
    return res.status(500).send({
      status: false,
      message: 'The request has not succeeded',
      message_error: 'Esse médico não possui mais horário disponível',
    })
  }

  let start_time =
    doctor_schedules.start_time[0] + doctor_schedules.start_time[1]
  let start_pause =
    doctor_schedules.start_pause[0] + doctor_schedules.start_pause[1]

  let free_time = []

  // first interval
  for (var hour = start_time; hour < start_pause; hour++) {
    if (hour.toString().length == 1) {
      hour = '0' + hour
    }
    for (let minutes = 0; minutes < 60; minutes++) {
      if (minutes == 0) {
        minutes = minutes + '0'
      }

      let scheduling = await Scheduling.findOne({
        where: {
          user_id_doctor: doctor_schedules.user_id,
          status: {
            [Operator.Op.ne]: 3,
          },
          scheduling_date: {
            [Operator.Op.eq]: moment
              .utc(req.body.scheduling_date + ' ' + hour + ':' + minutes)
              .format(),
          },
        },
      })
      // checks if the time is already scheduled
      if (!scheduling && moment().format('HH:mm') < hour + ':' + minutes) {
        free_time.push(hour + ':' + minutes)
      }
      minutes = minutes + 14
    }
  }

  // second interval
  let end_pause = doctor_schedules.end_pause[0] + doctor_schedules.end_pause[1]
  let end_time = doctor_schedules.end_time[0] + doctor_schedules.end_time[1]

  // second interval
  for (let hour = end_pause; hour < end_time; hour++) {
    if (hour.toString().length == 1) {
      hour = '0' + hour
    }
    for (let minutes = 0; minutes < 60; minutes++) {
      if (minutes == 0) {
        minutes = minutes + '0'
      }

      const scheduling = await Scheduling.findOne({
        where: {
          user_id_doctor: doctor_schedules.user_id,
          status: {
            [Operator.Op.ne]: 3,
          },
          scheduling_date: {
            [Operator.Op.eq]: moment
              .utc(req.body.scheduling_date + ' ' + hour + ':' + minutes)
              .format(),
          },
        },
      })
      // checks if the time is already scheduled
      if (!scheduling && moment().format('HH:mm') < hour + ':' + minutes) {
        free_time.push(hour + ':' + minutes)
      }
      minutes = minutes + 14
    }
  }

  res.status(200).send({
    status: true,
    message: 'The request has succeeded',
    doctor: {
      uuid: user.uuid,
      name: user.name,
      img: user.img,
    },
    free_time,
    weekday: weekday,
  })
}

//sendo to error
function sendError(res, model, msg, condition) {
  if (!model) {
    return res.status(500).send({
      status: false,
      message: 'The request has not succeeded',
      message_error: msg,
    })
  }
  if (condition) {
    return res.status(500).send({
      status: false,
      message: 'The request has not succeeded',
      message_error: msg,
    })
  }
}
