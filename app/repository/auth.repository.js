const db = require('../models')
const User = db.users

module.exports = {
  insert: () => {
    return 'insert'
  },

  update: () => {
    return 'update'
  },

  /**
   * Get user data by uuid
   */
  select: (fields) => {
    return User.findOne({
      attributes: ['id', 'uuid', 'name', 'email', 'document', 'type'],
      where: { uuid: fields },
    })
      .then((data) => {
        return data
      })
      .catch((err) => {
        return err
      })
  },
}
