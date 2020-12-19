module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    'doctorSchedule',
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
      user_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      day: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      ordernar: {
        type: Sequelize.INTEGER,
      },
      start_time: {
        type: Sequelize.TIME,
      },
      end_time: {
        type: Sequelize.TIME,
      },
      start_pause: {
        type: Sequelize.TIME,
      },
      end_pause: {
        type: Sequelize.TIME,
      },
      area_id: {
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
      status_description: {
        type: Sequelize.STRING,
      },
    },
    {
      tableName: 'doctor_schedule',
      freezeTableName: true,
      timestamps: false,
    }
  )
}
