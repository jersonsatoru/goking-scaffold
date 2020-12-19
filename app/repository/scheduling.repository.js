const db = require('../models')
const User = db.users
const Payment = db.payment
const Product = db.products
const MedicalRecord = db.medicalRecord

module.exports = {
  select: (fields) => {
    return User.findOne({
      attributes: [['uuid', 'user_uuid_doctor'], 'name', 'img'],
      where: { id: fields },
    })
      .then((data) => {
        return data
      })
      .catch((err) => {
        return err
      })
  },

  //validation exists payment
  existsPayment: (fields) => {
    return Payment.findOne({
      where: { user_id: fields, status: 1 },
    })
      .then((data) => {
        return data
      })
      .catch((err) => {
        return err
      })
  },

  //validation exists medicalRecord
  existsMedicalRecord: (fields) => {
    return MedicalRecord.findOne({
      attributes: ['status'],
      where: { user_id: fields },
    })
      .then((data) => {
        return data
      })
      .catch((err) => {
        return err
      })
  },

  //validation exists Doctor
  existsDoctor: (fields) => {
    return User.findOne({
      where: { uuid: fields, status: 1 },
    })
      .then((data) => {
        return data
      })
      .catch((err) => {
        return err
      })
  },

  //validation exists Product
  existsProduct: (fields) => {
    return Product.findOne({
      where: { id: fields, status: 1 },
    })
      .then((data) => {
        return data
      })
      .catch((err) => {
        return err
      })
  },
}
