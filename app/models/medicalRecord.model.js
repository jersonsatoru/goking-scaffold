module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    'medical_record',
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
      user_id_holder: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      profile: {
        type: Sequelize.STRING,
      },
      weight: {
        type: Sequelize.DECIMAL,
        allowNull: true,
      },
      height: {
        type: Sequelize.DECIMAL,
        allowNull: true,
      },
      health_problems: {
        type: Sequelize.STRING,
      },
      continuous_remedy: {
        type: Sequelize.STRING,
      },
      medical_allergy_description: {
        type: Sequelize.STRING,
      },
      pregnant: {
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
      tableName: 'medical_record',
      freezeTableName: true,
      timestamps: false,
    }
  )
}
