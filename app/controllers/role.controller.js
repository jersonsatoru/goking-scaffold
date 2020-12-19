const db = require('../models')
const Role = db.roles
const Op = db.Sequelize.Op

// Retrieve all from the database.
exports.findAll = (req, res) => {
  const name = req.query.name
  var condition = name
    ? {
        name: {
          [Op.like]: `%${name}%`,
        },
      }
    : null

  Role.findAll({ where: condition })
    .then((data) => {
      res
        .send({
          status: true,
          message: 'The request has succeeded',
          data: {
            roles: data,
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
