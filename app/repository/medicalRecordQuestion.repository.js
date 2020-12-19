const db = require('../models')
const User = db.users
const PersonalData = db.personalData
const MedicalRecord = db.medicalRecord

module.exports = {
  selectUser: (fields) => {
    return User.findOne({
      attributes: ['uuid', 'name', 'img'],
      where: { id: fields },
    })
      .then((data) => {
        return data
      })
      .catch((err) => {
        return err
      })
  },

  selectPersonalData: (fields) => {
    return PersonalData.findOne({
      attributes: [
        'uuid',
        'created_at',
        'profile',
        'birth_day',
        'mother_name',
        'gender',
        'cellphone',
        'document',
        'professional_document_type',
        'professional_document_uf',
        'professional_document_number',
        'updated_at',
        'status',
      ],
      where: { user_id: fields },
    })
      .then((data) => {
        return data
      })
      .catch((err) => {
        return err
      })
  },

  selectMedicalRecord: (fields) => {
    return MedicalRecord.findOne({
      attributes: [
        'uuid',
        'created_at',
        'profile',
        'weight',
        'height',
        'health_problems',
        'continuous_remedy',
        'medical_allergy_description',
        'pregnant',
        'updated_at',
        'status',
      ],
      where: { user_id: fields },
    })
      .then((data) => {
        return data
      })
      .catch((err) => {
        return err
      })
  },
}
