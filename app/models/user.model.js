module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    'user',
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
      companie_id: {
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      document: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      api_token: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      img: {
        type: Sequelize.STRING,
      },
      updated_at: {
        type: Sequelize.DATE,
      },
      updated_id: {
        type: Sequelize.INTEGER,
      },
      created_password: {
        type: Sequelize.INTEGER,
      },
      forgot_password_token: {
        type: Sequelize.STRING,
      },
      forgot_password_expires: {
        type: Sequelize.DATE,
      },
      change_password: {
        type: Sequelize.DATE,
      },
      type: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.INTEGER,
      },
      status_description: {
        type: Sequelize.STRING,
      },
      missao_covid_id: {
        type: Sequelize.INTEGER,
      },
    },
    {
      tableName: 'users',
      freezeTableName: true,
      timestamps: false,
    }
  )
}
