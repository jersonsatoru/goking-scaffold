module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    'doctorsPrescription',
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
      prescription_id: {
        type: Sequelize.INTEGER,
      },
      authentication_code: {
        type: Sequelize.STRING,
      },
      prescription_url: {
        type: Sequelize.STRING,
      },
      user_id_doctor: {
        type: Sequelize.INTEGER,
      },
      user_id_holder: {
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
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
      status_description: {
        type: Sequelize.STRING,
      },
    },
    {
      tableName: 'doctors_prescription',
      freezeTableName: true,
      timestamps: false,
    }
  )
}
