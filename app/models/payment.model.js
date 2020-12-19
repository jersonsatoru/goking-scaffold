module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    'payment',
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
      transaction_id: {
        type: Sequelize.STRING,
      },
      user_id_holder: {
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
      },
      product_id: {
        type: Sequelize.INTEGER,
      },
      product_dependent_id: {
        type: Sequelize.INTEGER,
      },
      installment: {
        type: Sequelize.DECIMAL,
      },
      installment_value: {
        type: Sequelize.DECIMAL,
      },
      amount: {
        type: Sequelize.DECIMAL,
      },
      discount: {
        type: Sequelize.DECIMAL,
      },
      fine: {
        type: Sequelize.DECIMAL,
      },
      payment_method: {
        type: Sequelize.INTEGER,
      },
      payment_date: {
        type: Sequelize.DATE,
      },
      due_date: {
        type: Sequelize.DATE,
      },
      obs: {
        type: Sequelize.TEXT,
      },
      cancellation_date: {
        type: Sequelize.DATE,
      },
      cancellation_id: {
        type: Sequelize.INTEGER,
      },
      cancellation_description: {
        type: Sequelize.TEXT,
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
      tableName: 'payment',
      freezeTableName: true,
      timestamps: false,
    }
  )
}
