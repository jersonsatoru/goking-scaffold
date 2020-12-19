module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    'companie',
    {
      uuid: {
        type: Sequelize.STRING,
      },
      created_at: {
        type: Sequelize.DATE,
      },
      created_id: {
        type: Sequelize.INTEGER,
      },
      national_registration: {
        type: Sequelize.STRING,
      },
      legal_name: {
        type: Sequelize.STRING,
      },
      legal_nature: {
        type: Sequelize.STRING,
      },
      updated_at: {
        type: Sequelize.DATE,
      },
      updated_id: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.INTEGER,
      },
    },
    {
      tableName: 'companie',
      freezeTableName: true,
      timestamps: false,
    }
  )
}
