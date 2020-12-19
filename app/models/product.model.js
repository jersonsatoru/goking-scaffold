module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    'product',
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
      title: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      count_scheduling: {
        type: Sequelize.INTEGER,
      },
      count_scheduling_month: {
        type: Sequelize.INTEGER,
      },
      number_subscription: {
        type: Sequelize.INTEGER,
      },
      schenduling_days: {
        type: Sequelize.INTEGER,
      },
      installment: {
        type: Sequelize.INTEGER,
      },
      payment_methods: {
        type: Sequelize.INTEGER,
      },
      installment_value: {
        type: Sequelize.DECIMAL,
      },
      amount: {
        type: Sequelize.DECIMAL,
      },
      fine: {
        type: Sequelize.DECIMAL,
      },
      term: {
        type: Sequelize.TEXT,
      },
      pagarme_plan_id: {
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
      tableName: 'products',
      freezeTableName: true,
      timestamps: false,
    }
  )
}
