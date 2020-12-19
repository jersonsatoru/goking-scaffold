module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    'products_dependent',
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
      product_id: {
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
      type: {
        type: Sequelize.INTEGER,
      },
      installment: {
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
      tableName: 'products_dependent',
      freezeTableName: true,
      timestamps: false,
    }
  )
}
