module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    'personalData',
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
      profile: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      birth_day: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      mother_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      gender: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      cellphone: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      document: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      professional_document_type: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      professional_document_uf: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      professional_document_number: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      specialty: {
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
      tableName: 'personal_data',
      freezeTableName: true,
      timestamps: false,
    }
  )
}
