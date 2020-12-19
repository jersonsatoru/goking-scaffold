module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    'scheduling',
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
      user_id_doctor: {
        type: Sequelize.INTEGER,
      },
      user_id_holder: {
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
      },
      cellphone: {
        type: Sequelize.STRING,
      },
      scheduling_date: {
        type: Sequelize.DATE,
      },
      star: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      consultation_evaluation: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      start_service: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      end_service: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      cancel_service: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      cancel_service_description: {
        type: Sequelize.TEXT,
      },
      area_id: {
        type: Sequelize.INTEGER,
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
      tableName: 'scheduling',
      freezeTableName: true,
      timestamps: false,
    }
  )
}
