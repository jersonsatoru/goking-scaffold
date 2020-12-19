const db = require('../models')
const { v4: uuidv4 } = require('uuid')
const { medicalRecord } = require('../models')
const repositoryMedical = require('../repository/medicalRecordQuestion.repository')
const MedicalRecordQuestion = db.medicalRecordQuestion
const User = db.users
const Scheduling = db.scheduling
const Op = db.Sequelize.Op

// Retrieve all from the database.
exports.findAll = (req, res) => {
  const condition =
    req.userType == 2
      ? { user_id: req.body.uuid_user }
      : { user_id: req.userId }

  // Get in the database
  MedicalRecordQuestion.findAll({
    where: condition,
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
  //get uuid
  const dataUUID = await MedicalRecordQuestion.findOne({
    where: { uuid: req.params.uuid },
  })

  if (!dataUUID) {
    //return json
    res.status(500).send({
      status: false,
      message: 'The request has not succeeded',
      message_error: 'UUID não cadastrado',
      data: null,
    })
  }

  const medicalRecordData = await medicalRecord.findOne({
    attributes: [
      'uuid',
      'weight',
      'height',
      'health_problems',
      'continuous_remedy',
      'medical_allergy_description',
      'pregnant',
    ],
    where: { id: dataUUID.medical_record_id },
  })
  const createdName = await User.findOne({ where: { id: dataUUID.created_id } })
  const userName = await User.findOne({ where: { id: dataUUID.user_id } })

  const data = {
    uuid: dataUUID.uuid,
    created_at: dataUUID.created_at,
    created_id: dataUUID.created_id,
    created_name: createdName.name ? createdName.name : null,
    user_id_holder: dataUUID.user_id_holder,
    user_id: dataUUID.user_id,
    user_name: userName.name ? userName.name : null,
    complaint: dataUUID.complaint,
    history: dataUUID.history,
    pathological_background: dataUUID.pathological_background,
    exams: dataUUID.exams,
    hypothesis: dataUUID.hypothesis,
    clinical_impression: dataUUID.clinical_impression,
    conduct: dataUUID.conduct,
    heart_rate: dataUUID.heart_rate,
    systolic_blood_pressure: dataUUID.systolic_blood_pressure,
    diastolic_blood_pressure: dataUUID.respiratory_frequency,
    respiratory_frequency: dataUUID.respiratory_frequency,
    co2_saturation: dataUUID.co2_saturation,
    physical_exam: dataUUID.physical_exam,
    medical_record: medicalRecordData,
  }

  //return json
  return res.status(200).send({
    status: true,
    message: 'The request has succeeded',
    data: {
      medical_record_question: data,
    },
  })
}

// Create and Save in the database
exports.create = async (req, res) => {
  const userUUID = await User.findOne({
    where: { uuid: req.body.user_uuid },
  })

  if (!userUUID) {
    //return json
    return res.status(500).send({
      status: false,
      message: 'The request has not succeeded',
      message_error: 'UUID do usuário não cadastrado.',
      data: null,
    })
  }

  const medicalRecordData = await medicalRecord.findOne({
    where: { user_id: userUUID.id },
  })

  // Save in the database
  await MedicalRecordQuestion.create({
    uuid: uuidv4(),
    created_at: new Date().getTime(),
    created_id: req.userId,
    user_id_holder: userUUID.user_id ? userUUID.user_id : userUUID.id,
    user_id: userUUID.id ? userUUID.id : null,
    complaint: req.body.complaint,
    history: req.body.history,
    pathological_background: req.body.pathological_background,
    exams: req.body.exams,
    hypothesis: req.body.hypothesis,
    clinical_impression: req.body.clinical_impression,
    conduct: req.body.conduct,
    medical_record_id: medicalRecordData.id,
    heart_rate: req.body.heart_rate,
    systolic_blood_pressure: req.body.systolic_blood_pressure,
    diastolic_blood_pressure: req.body.diastolic_blood_pressure,
    respiratory_frequency: req.body.respiratory_frequency,
    co2_saturation: req.body.co2_saturation,
    physical_exam: req.body.physical_exam,
    status: 1,
  })
    .then((data) => {
      //return json
      res
        .send({
          status: true,
          message: 'The request has succeeded',
          data: {
            medical_record_question: data,
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
  // datetime
  const timestamp = new Date().getTime()

  if (req.body.user_uuid) {
    var user_uuid = await User.findOne({ where: { uuid: req.body.user_uuid } })
  }

  // Save in the database
  await MedicalRecordQuestion.update(
    {
      updated_at: timestamp,
      updated_id: req.userId,
      user_id_holder: req.userId,
      user_id: req.body.user_uuid ? user_uuid.id : req.userId,
      complaint: req.body.complaint,
      history: req.body.history,
      pathological_background: req.body.pathological_background,
      exams: req.body.exams,
      hypothesis: req.body.hypothesis,
      clinical_impression: req.body.clinical_impression,
      conduct: req.body.conduct,
      status: 1,
    },
    {
      where: {
        [Op.and]: [{ user_id: user_uuid.id }, { uuid: req.body.uuid }],
      },
    }
  )
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

exports.newMedicalRecord = async (req, res) => {
  const scheduling = await Scheduling.findOne({
    where: {
      uuid: req.params.uuid,
    },
  })

  const doctor = scheduling.user_id_doctor
    ? await repositoryMedical.selectUser(scheduling.user_id_doctor)
    : null
  const user_name_holder = scheduling.user_id_holder
    ? await repositoryMedical.selectUser(scheduling.user_id_holder)
    : null
  const user_name = scheduling.user_id
    ? await repositoryMedical.selectUser(scheduling.user_id)
    : null
  const personal_data = scheduling.user_id
    ? await repositoryMedical.selectPersonalData(scheduling.user_id)
    : null
  const medical_record = scheduling.user_id
    ? await repositoryMedical.selectMedicalRecord(scheduling.user_id)
    : null

  res.status(200).send({
    data: scheduling,
    user_name_holder: user_name_holder,
    user: {
      user_name,
      personal_data,
      medical_record,
    },
    doctor: doctor,
  })
}
