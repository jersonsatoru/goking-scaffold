const db = require('../models')

const User = db.users
const Transaction = db.transaction
const PersonalData = db.personalData
const Payment = db.payment
const Product = db.products

module.exports = {
  select: (fields) => {
    return User.findOne({
      attributes: ['name'],
      where: { id: fields },
    })
      .then((data) => {
        return data
      })
      .catch((err) => {
        return err
      })
  },

  insertTransaction: async (fields) => {
    // insert user email
    return await Transaction.create({
      uuid: fields.uuid,
      created_at: fields.created_at,
      created_id: fields.created_id,
      user_id_holder: fields.user_id_holder,
      user_id: fields.user_id,
      installment: fields.installment,
      amount: fields.amount,
      paid_amount: fields.paid_amount,
      payment_method: fields.payment_method,
      status: fields.status,
      status_description: fields.status_description,
    })
      .then((data) => {
        return data
      })
      .catch((err) => {
        return err
      })
  },

  insertPayment: (fields) => {
    // insert user email
    return Payment.create({
      uuid: fields.uuid,
      created_at: fields.created_at,
      created_id: fields.created_id,
      user_id_holder: fields.user_id_holder,
      user_id: fields.user_id,
      transaction_id: fields.transaction_id,
      product_id: fields.product_id,
      payment_method: fields.payment_method,
      installment: fields.installment,
      installment_value: fields.installment_value,
      amount: fields.amount,
      due_date: fields.due_date,
      status: fields.status,
      status_description: fields.status_description,
    })
      .then((data) => {
        return data
      })
      .catch((err) => {
        return err
      })
  },

  //method transaction
  methodTransaction: (fields) => {
    return {
      payment_method: fields.payment_method,
      amount: fields.amount,
      card_number: fields.card_number,
      card_cvv: fields.card_cvv,
      card_expiration_date: fields.card_expiration_date,
      card_holder_name: fields.card_holder_name,
      installments: fields.installments,
      async: false,
      postback_url: fields.postback_url,
      soft_descripton: 'StarBem',
      customer: {
        external_id: fields.customer.external_id,
        name: fields.customer.name,
        type: 'individual',
        country: 'br',
        email: fields.customer.email,
        documents: [
          {
            type: 'cpf',
            number: fields.customer.number_cpf,
          },
        ],
        phone_numbers: [
          '+55' + fields.customer.ddd + fields.customer.phone_numbers,
        ],
        birthday: fields.customer.birthday,
      },
      billing: {
        name: fields.billing.name,
        address: {
          country: fields.billing.address.country,
          state: fields.billing.address.state,
          city: fields.billing.address.city,
          neighborhood: fields.billing.address.neighborhood,
          street: fields.billing.address.street,
          street_number: fields.billing.address.street_number,
          zipcode: fields.billing.address.zipcode,
        },
      },
      items: [
        {
          id: 'r' + fields.items.id,
          title: fields.items.title,
          unit_price: fields.items.unit_price,
          quantity: 1,
          tangible: false,
        },
      ],
    }
  },

  //method transaction
  methodTransactionReload: (fields) => {
    return {
      payment_method: fields.payment_method,
      amount: fields.amount,
      card_number: fields.card_number,
      card_cvv: fields.card_cvv,
      card_expiration_date: fields.card_expiration_date,
      card_holder_name: fields.card_holder_name,
      installments: fields.installments,
      async: false,
      postback_url: fields.postback_url,
      soft_descripton: 'StarBem',
      customer: {
        external_id: '#' + fields.external_id,
        name: fields.customer.name,
        type: 'individual',
        country: 'br',
        email: fields.customer.email,
        documents: [
          {
            type: 'cpf',
            number: fields.customer.documents.number,
          },
        ],
        phone_numbers: [
          '+55' + fields.customer.ddd + fields.customer.phone_number,
        ],
        birthday: fields.customer.birthday,
      },
      billing: {
        name: fields.billing.name,
        address: {
          country: fields.billing.address.country,
          state: fields.billing.address.state,
          city: fields.billing.address.city,
          neighborhood: fields.billing.address.neighborhood,
          street: fields.billing.address.street,
          street_number: fields.billing.address.street_number,
          zipcode: fields.billing.address.zipcode,
        },
      },
      items: [
        {
          id: 'r' + fields.items.id,
          title: fields.items.title,
          unit_price: fields.items.unit_price,
          quantity: 1,
          tangible: false,
        },
      ],
    }
  },

  //method subscription
  methodSubscription: (fields) => {
    return {
      card_number: fields.card_number,
      card_cvv: fields.card_cvv,
      card_expiration_date: fields.card_expiration_date,
      card_holder_name: fields.card_holder_name,
      payment_method: 'credit_card',
      postback_url: fields.postback_url,
      async: false,
      soft_descripton: 'StarBem',
      customer: {
        name: fields.customer.name,
        email: fields.customer.email,
        document_number: fields.customer.number_cpf,
        phone: {
          ddd: fields.customer.ddd,
          number: fields.customer.phone_numbers,
        },
      },
      billing: {
        name: fields.billing.name,
        address: {
          country: fields.billing.address.country,
          state: fields.billing.address.state,
          city: fields.billing.address.city,
          neighborhood: fields.billing.address.neighborhood,
          street: fields.billing.address.street,
          street_number: fields.billing.address.street_number,
          zipcode: fields.billing.address.zipcode,
        },
      },
      items: {
        id: 'r' + fields.items.id,
        title: fields.items.title,
        unit_price: fields.items.unit_price,
        quantity: 1,
        tangible: false,
      },
      plan_id: fields.plan_id,
    }
  },

  //method transaction
  methodSubscriptionReload: (fields) => {
    return {
      card_number: fields.card_number,
      card_cvv: fields.card_cvv,
      card_expiration_date: fields.card_expiration_date,
      card_holder_name: fields.card_holder_name,
      payment_method: 'credit_card',
      postback_url: fields.postback_url,
      async: false,
      soft_descripton: 'StarBem',
      customer: {
        name: fields.customer.name,
        email: fields.customer.email,
        document_number: fields.customer.number_cpf,
        phone: {
          ddd: fields.customer.ddd,
          number: fields.customer.phone_numbers,
        },
      },
      billing: {
        name: fields.billing.name,
        address: {
          country: fields.billing.address.country,
          state: fields.billing.address.state,
          city: fields.billing.address.city,
          neighborhood: fields.billing.address.neighborhood,
          street: fields.billing.address.street,
          street_number: fields.billing.address.street_number,
          zipcode: fields.billing.address.zipcode,
        },
      },
      items: {
        id: 'r' + fields.items.id,
        title: fields.items.title,
        unit_price: fields.items.unit_price,
        quantity: 1,
        tangible: false,
      },
      plan_id: fields.plan_id,
    }
  },
}
