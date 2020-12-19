module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    'answer',
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
      faq_id: {
        type: Sequelize.INTEGER,
      },
      answer: {
        type: Sequelize.STRING,
        allowNull: true,
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
      tableName: 'faq_answer',
      freezeTableName: true,
      timestamps: false,
    }
  )
}
