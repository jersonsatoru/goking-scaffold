module.exports = (sequelize, Sequelize) => {
    return sequelize.define(
      'version_app',
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
        name: {
          type: Sequelize.STRING,
        },
        version: {
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
      },
      {
        tableName: 'version_app',
        freezeTableName: true,
        timestamps: false,
      }
    )
  }
  