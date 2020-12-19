const db = require('../../models')
const { v4: uuidv4 } = require('uuid')
const DoctorSchedule = db.doctorSchedule
const Scheduling = db.scheduling
const moment = require('moment')
const Operator = db.Sequelize
const Area = db.area

// Retrieve all from the database.
exports.findAll = (req, res) => {
  //Association Area with DoctorSchedule
  Area.hasOne(DoctorSchedule, { foreignKey: 'id' });
  DoctorSchedule.belongsTo(Area, { foreignKey: 'area_id' });

  DoctorSchedule.findAll({
    attributes: ['uuid', 'created_at','day','start_time','end_time','updated_at','status','status_description'],
    where: { user_id: req.userId },
    include: [
      {
        attributes: ['uuid','name'],
        model: Area,
      }
    ]
  })
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
exports.create = async (req, res) => {
  //create uuid version 4
  const uuid = uuidv4()

  // datetime
  const timestamp = new Date().getTime()

  const specialty_uuid = await Area.findOne({ where: { uuid: req.body.area_uuid } });
  // validate area occupation
  if (!specialty_uuid) {
    return res.status(404).send({
      status: false,
      message: 'The request has not succeeded',
      message_error: 'Área não encontrada.',
    });
  }

  // variables params
  const params = {
    uuid: uuid,
    created_at: timestamp,
    created_id: req.userId,
    user_id: req.userId,
    day: moment.utc(req.body.day).format('YYYY-MM-DD'),
    ordernar: req.body.ordernar,
    start_time: req.body.start_time,
    end_time: req.body.end_time,
    start_pause: req.body.start_pause,
    end_pause: req.body.end_pause,
    area_id: specialty_uuid.id,
    status: 1,
    status_description: 'Ativo',
  }

  // check if the scheduled time already exists
  const doctor_scheduling = await DoctorSchedule.findOne({
    where: {
      user_id: req.userId,
      day: moment.utc(req.body.day).format('YYYY-MM-DD'),
      [Operator.Op.and]: [
        {
          start_time: {
            [Operator.Op.gte]: req.body.start_time,
          },
        },
        {
          start_time: {
            [Operator.Op.lt]: req.body.end_time,
          },
        },
      ],
    },
  })

  if (doctor_scheduling) {
    return res.status(200).send({
      status: false,
      message: 'The request has succeeded',
      message_error: 'Horário já reservado.',
    })
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

  const uuidExists = await DoctorSchedule.findOne({ where: { uuid: uuid } })

  if (!uuidExists) {
    return res.status(500).send({
      status: false,
      message: 'The request has not succeeded',
      message_error: 'Não existe esse uuid.',
    })
  }

  // checks for patient scheduling
  const scheduling = await Scheduling.count({
    where: {
      scheduling_date: moment
        .utc(req.body.day + ' ' + req.body.start_time)
        .format(),
    },
  })

  if (scheduling) {
    return res.status(200).send({
      status: false,
      message: 'The request has not succeeded',
      message_error: 'Existe agendamento, não é possível atualizar.',
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
    specialty: req.body.specialty,
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

exports.delete = async (req, res) => {
  const uuid = req.params.uuid

  const uuidExists = await DoctorSchedule.findOne({ where: { uuid: uuid } })

  if (!uuidExists) {
    return res.status(500).send({
      status: false,
      message: 'The request has not succeeded',
      message_error: 'Não existe esse uuid.',
    })
  }
  // return res.send(uuidExists.day + ' ' + uuidExists.start_time);
  // checks for patient scheduling
  const scheduling = await Scheduling.count({
    where: {
      scheduling_date: moment
        .utc(uuidExists.day + ' ' + uuidExists.start_time)
        .format(),
      status: {
        [Operator.Op.in]: [0, 1],
      },
    },
  })

  if (scheduling) {
    return res.status(200).send({
      status: false,
      message: 'The request has not succeeded',
      message_error: 'Existe agendamento, não é possível excluir.',
    })
  }

  await DoctorSchedule.destroy({
    where: {
      uuid: uuid,
    },
  })
    .then(() => {
      return res.status(200).send({
        status: true,
        message: 'The request has succeeded',
      })
    })
    .catch((err) => {
      return res.status(500).send({
        status: false,
        message: 'The request has not succeeded',
        message_error: err,
      })
    })
}
