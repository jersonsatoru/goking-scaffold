const db = require('../models')
const { v4: uuidv4 } = require('uuid')
const bcrypt = require('bcrypt')
const Token = db.token
const User = db.users
const Companie = db.companie
const PersonalData = db.personalData

module.exports = {
  insert: (email, codeGenerator) => {
    // datetime
    var timestamp = new Date().getTime()
    //create uuid version 4
    var uuid_user = uuidv4()
    var uuid_token = uuidv4()

    // insert user email
    return User.create(
      {
        uuid: uuid_user,
        email: email,
        created_password: 0,
        created_at: timestamp,
        type: 3,
        status: 1,
        status_description: 'Ativo',
        token: {
          uuid: uuid_token,
          token: codeGenerator,
          status: 0,
          created_at: timestamp,
        },
      },
      {
        include: [Token],
      }
    )
      .then((data) => {
        return data
      })
      .catch((err) => {
        return err
      })
  },

  insertTokenOrUpdate: (id, codeGenerator) => {
    // datetime
    var timestamp = new Date().getTime()
    //create uuid version 4
    var uuid_user = uuidv4()
    var uuid_token = uuidv4()

    // User token exists
    return Token.findOne({
      where: { user_id: id },
    })
      .then((token) => {
        if (token) {
          return Token.update(
            {
              token: codeGenerator,
              status: 0,
              updated_at: timestamp,
              updated_id: id,
            },
            {
              where: { user_id: id },
            }
          )
            .then((data) => {
              return data
            })
            .catch((err) => {
              return 'The request has not succeeded'
              // console.log(err)
            })
        }

        // insert new code
        return Token.create({
          uuid: uuid_token,
          token: codeGenerator,
          user_id: id,
          status: 0,
          created_at: timestamp,
          created_id: id,
        })
          .then((data) => {
            return data
          })
          .catch((err) => {
            return 'The request has not succeeded'
            // console.log(err)
          })
      })
      .catch((err) => {
        return 'The request has not succeeded'
      })
  },

  updateToken: (id, codeGenerator) => {
    // datetime
    var timestamp = new Date().getTime()
    //update code validation
    return Token.update(
      {
        token: codeGenerator,
        status: 0,
        updated_at: timestamp,
        updated_id: id,
      },
      {
        where: { user_id: id },
      }
    )
      .then((data) => {
        return data
      })
      .catch((err) => {
        return 'The request has not succeeded'
      })
  },

  updateStatusToken: (data) => {
    // datetime
    var timestamp = new Date().getTime()
    return Token.update(
      { status: 1, update_at: timestamp, updated_id: data.id },
      {
        where: { id: data.token.id },
      }
    )
      .then((data) => {
        return data
      })
      .catch((err) => {
        return 'The request has not succeeded'
      })
  },

  updateDataUser: (fields) => {
    // datetime
    var timestamp = new Date().getTime()
    return User.update(
      {
        password: fields.password,
        name: fields.name,
        document: fields.document,
        api_token: fields.api_token,
        created_password: 1,
        update_at: timestamp,
        updated_id: fields.id,
      },
      {
        where: { id: fields.id },
      }
    )
      .then((data) => {
        return data
      })
      .catch(() => {
        return 'The request has not succeeded'
      })
  },

  select: (fields) => {
    return User.findOne({
      where: { id: fields.id },
    })
      .then((data) => {
        return data
      })
      .catch(() => {
        return 'The request has not succeeded'
      })
  },

  selectNameDoctor: (fields) => {
    return User.findOne({
      attributes: ['name'],
      where: { id: fields },
    })
      .then((data) => {
        return data
      })
      .catch(() => {
        return 'The request has not succeeded'
      })
  },

  importCreate: async (results, fields) => {
    const dataCompanie = await Companie.findOne({
      where: { national_registration: fields.national_registration },
    })

    return results.map(async (item, index) => {
      const user = await User.create({
        uuid: uuidv4(),
        created_at: new Date().getTime(),
        companie_id: dataCompanie.id,
        name: item.name,
        email: item.email,
        document: item.cpf,
        password: bcrypt.hashSync(item.cpf, 10),
        type: 4,
        status: 1,
        status_description: 'Ativo',
      })

      await PersonalData.create({
        uuid: uuidv4(),
        created_at: new Date().getTime(),
        user_id_holder: user.id,
        user_id: user.id,
        birth_day: item.data_nascimento,
        cellphone: item.celular,
        status: 1,
      })
    })
  },
}
