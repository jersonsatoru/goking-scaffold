module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    'config_date',
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
      start_date: {
        type: Sequelize.DATE,
      },
      end_date: {
        type: Sequelize.DATE,
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
      tableName: 'config_date',
      freezeTableName: true,
      timestamps: false,
    }
  )
}
