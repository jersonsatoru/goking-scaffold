const dbConfig = require('../config/db.config.js')

const Sequelize = require('sequelize')
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.tutorials = require('./tutorial.model.js')(sequelize, Sequelize)
db.products = require('./product.model.js')(sequelize, Sequelize)
db.productsDependent = require('./productDependent.model.js')(
  sequelize,
  Sequelize
)
db.users = require('./user.model.js')(sequelize, Sequelize)
db.healthProblems = require('./healthProblems.model.js')(sequelize, Sequelize)
db.roles = require('./role.model.js')(sequelize, Sequelize)
db.doctorSchedule = require('./doctorSchedule.model.js')(sequelize, Sequelize)
db.partner = require('./partner.model.js')(sequelize, Sequelize)
db.faq = require('./faq.model.js')(sequelize, Sequelize)
db.answer = require('./faqAnswer.model.js')(sequelize, Sequelize)
db.token = require('./token.model.js')(sequelize, Sequelize)
db.medicalRecord = require('./medicalRecord.model.js')(sequelize, Sequelize)
db.medicalRecordQuestion = require('./medicalRecordQuestion.model.js')(
  sequelize,
  Sequelize
)
db.address = require('./address.model.js')(sequelize, Sequelize)
db.personalData = require('./personalData.model.js')(sequelize, Sequelize)
db.scheduling = require('./scheduling.model.js')(sequelize, Sequelize)
db.dependent = require('./user.model.js')(sequelize, Sequelize)
db.payment = require('./payment.model.js')(sequelize, Sequelize)
db.doctorsPrescription = require('./doctorsPrescription.model.js')(
  sequelize,
  Sequelize
)
db.transaction = require('./transaction.model.js')(sequelize, Sequelize)
db.configDate = require('./configDate.model.js')(sequelize, Sequelize)
db.companie = require('./companie.model.js')(sequelize, Sequelize)
db.area = require('./area.model.js')(sequelize, Sequelize)
db.areaUser = require('./areaUser.model.js')(sequelize, Sequelize)
db.versionApp = require('./versionApp.model.js')(sequelize, Sequelize)

module.exports = db
