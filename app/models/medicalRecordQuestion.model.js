module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    'medical_record_question',
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
      complaint: {
        type: Sequelize.STRING,
      },
      history: {
        type: Sequelize.STRING,
      },
      pathological_background: {
        type: Sequelize.STRING,
      },
      exams: {
        type: Sequelize.STRING,
      },
      hypothesis: {
        type: Sequelize.STRING,
      },
      clinical_impression: {
        type: Sequelize.STRING,
      },
      conduct: {
        type: Sequelize.STRING,
      },
      heart_rate: {
        type: Sequelize.STRING,
      },
      systolic_blood_pressure: {
        type: Sequelize.STRING,
      },
      diastolic_blood_pressure: {
        type: Sequelize.STRING,
      },
      respiratory_frequency: {
        type: Sequelize.STRING,
      },
      co2_saturation: {
        type: Sequelize.STRING,
      },
      physical_exam: {
        type: Sequelize.STRING,
      },
      medical_record_id: {
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
      tableName: 'medical_record_question',
      freezeTableName: true,
      timestamps: false,
    }
  )
}
