const db = require('../models')
const sequelize = db.sequelize
const { QueryTypes } = require('sequelize')

exports.findAll = async (req, res) => {
  const users = await sequelize.query(
    'SELECT' +
      ' users.uuid, users.name, users.email, users.document, count(scheduling.id) as total_atendimentos,' +
      ' max(scheduling.scheduling_date) as scheduling_date, personal_data.birth_day, personal_data.cellphone FROM scheduling' +
      ' LEFT JOIN users ON scheduling.user_id = users.id LEFT JOIN personal_data ON users.id = personal_data.user_id' +
      ' WHERE scheduling.status = :status AND scheduling.user_id_doctor= :user_id_doctor' +
      ' GROUP BY users.uuid, users.name, users.email, users.document,personal_data.birth_day,personal_data.cellphone',
    {
      replacements: { status: '2', user_id_doctor: req.userId },
      type: QueryTypes.SELECT,
    }
  )

  let data = []
  for (let user of users) {
    const dataValues = {
      scheduling: {
        uuid: user.uuid,
        scheduling_date: user.scheduling_date,
      },
      user: {
        uuid: user.uuid,
        name: user.name,
        birth_day: user.birth_day,
        cellphone: user.cellphone,
      },
    }

    data.push(dataValues)
  }

  // res.send({data})
  res.status(200).send({
    status: true,
    message: 'The request has succeeded',
    patients: data,
  })
}
