module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    'transaction',
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
      },
      user_id: {
        type: Sequelize.INTEGER,
      },
      subscription_id: {
        type: Sequelize.INTEGER,
      },
      nsu: {
        type: Sequelize.INTEGER,
      },
      authorization_code: {
        type: Sequelize.STRING,
      },
      installment: {
        type: Sequelize.INTEGER,
      },
      amount: {
        type: Sequelize.DECIMAL,
      },
      paid_amount: {
        type: Sequelize.DECIMAL,
      },
      payment_method: {
        type: Sequelize.STRING,
      },
      boleto_url: {
        type: Sequelize.STRING,
      },
      boleto_barcode: {
        type: Sequelize.STRING,
      },
      boleto_expiration_date: {
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
      tableName: 'transaction',
      freezeTableName: true,
      timestamps: false,
    }
  )
}
