const db = require('../models')

const PersonalData = db.personalData

module.exports = {
  countRows: (fields) => {
    return PersonalData.count({
      //attributes: ['name'],
      where: { user_id: fields },
    })
      .then((data) => {
        return data
      })
      .catch((err) => {
        return err
      })
  },

  select: (fields) => {
    return PersonalData.findOne({
      //attributes: ['cellphone', 'birthday'],
      where: { user_id: fields },
    })
      .then((data) => {
        return data
      })
      .catch((err) => {
        return err
      })
  },
}
