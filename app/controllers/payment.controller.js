const db = require('../models')
const { v4: uuidv4 } = require('uuid')
const configPagarMe = require('../config/pagarme')
const {
  sendEmailPaymentBillet,
  sendEmailCancelPlan,
} = require('../modules/mailer')
const pagarme = require('pagarme')
const moment = require('moment') // require
const Product = db.products
const ProductDep = db.productsDependent
const User = db.users
const PersonalData = db.personalData
const repositoryPersonalData = require('../repository/personalData.repository')
const repositoryPayment = require('../repository/payment.repository')
const Payment = db.payment
const Transaction = db.transaction
//const Op = db.Sequelize.Op;
const Operator = db.Sequelize

// Retrieve all from the database.
exports.findAll = async (req, res) => {
  Payment.findAll()
    .then((data) => {
      //return json
      res.status(200).send({
        status: true,
        message: 'The request has succeeded',
        data: {
          user_product: data,
        },
      })
    })
    .catch((err) => {
      //return json
      res.status(500).send({
        status: false,
        message: 'The request has not succeeded',
        message_error: err,
        data: null,
      })
    })
}

/**
 * Create and Save in the database
 * Canceled payment
 * @param {} req
 */
exports.payment = async (req, res) => {
  if (req.body.user_uuid) {
    var userId = await User.findOne({ where: { uuid: req.body.user_uuid } })
  }

  //user titular or user dependent
  var idUser = req.body.user_uuid ? userId.id : req.userId

  //
  const selectPersonalData = await repositoryPersonalData.select(idUser)

  // count personal data
  const countPersonalData = await repositoryPersonalData.countRows(idUser)
  if (!countPersonalData) {
    return sendResponseError(res, 'Você não possui dados pessoais')
  }

  const productUuid = await Product.findOne({
    where: { uuid: req.body.product_uuid },
  })

  //count dependent + titular
  var number_subscription = req.body.dependents.length + 1

  if (req.body.dependents.length > 0) {
    //get product uuid to user_id
    var productSubscription = await Product.findOne({
      where: { number_subscription: number_subscription },
    })

    var productUuidDependet = await ProductDep.findOne({
      where: { product_id: productUuid.id },
    })
    var sumTitularDep = parseFloat(
      req.body.dependents.length * productUuidDependet.amount
    )
    var sumDependents =
      productUuid.payment_methods == 1
        ? productSubscription.amount
        : sumTitularDep
  }

  // var sumTitularDepTransaction = sumDependents + parseFloat(productUuid.amount);
  // var productAmount = parseFloat(productUuid.amount);

  if (req.body.dependents.length > 0 && productUuid.payment_methods == 1) {
    // amount subscription
    var countTotal = parseFloat(sumDependents)
    var countTotalDecimal = parseFloat(sumDependents)
  } else {
    //sum amount dependent, titular
    var countTotal =
      req.body.dependents.length > 0
        ? sumDependents + parseFloat(productUuid.amount)
        : parseFloat(productUuid.amount)
    var countTotalDecimal =
      req.body.dependents.length > 0
        ? sumDependents + parseFloat(productUuid.amount)
        : parseFloat(productUuid.amount)
  }

  //formtat decimal to string pagarme
  var productSumDependent = countTotal.toFixed(2).replace(/[^\d]+/g, '')

  let paramsPagarMee = {
    amount: productSumDependent,
    card_number: req.body.card_number,
    card_cvv: req.body.card_cvv,
    card_expiration_date: req.body.card_expiration_date,
    card_holder_name: req.body.card_holder_name,
    payment_method: req.body.payment_method,
    postback_url:
      productUuid.payment_methods == 1
        ? configPagarMe.postback_url_subscription
        : configPagarMe.postback_url_transaction,
    installments:
      req.body.payment_method == 'credit_card' ? productUuid.installment : 1,
    customer: {
      external_id: '#' + req.userId,
      name: req.userName,
      email: req.userEmail,
      number_cpf: req.userDocument,
      ddd: selectPersonalData.cellphone.substr(0, 2),
      phone_numbers: selectPersonalData.cellphone.substr(2),
      birthday: selectPersonalData.date_birth,
    },
    billing: {
      name: req.body.billing.name,
      address: {
        country: req.body.billing.address.country,
        state: req.body.billing.address.state,
        city: req.body.billing.address.city,
        neighborhood: req.body.billing.address.neighborhood,
        street: req.body.billing.address.street,
        street_number: req.body.billing.address.street_number,
        zipcode: req.body.billing.address.zipcode,
      },
    },
    items: {
      id: productUuid.id,
      title: productUuid.title,
      unit_price:
        number_subscription == 1
          ? productUuid.amount.replace(/[^\d]+/g, '')
          : productSumDependent.replace(/[^\d]+/g, ''),
      quantity: 1,
      tangible: false,
    },
  }

  //method subscritpion
  if (productUuid.payment_methods == 1) {
    const plan_id =
      req.body.dependents.length > 0
        ? productSubscription.pagarme_plan_id
        : productUuid.pagarme_plan_id

    //add to object plan_id
    paramsPagarMee = { ...paramsPagarMee, plan_id: plan_id }

    //params pagar.me
    const params = await repositoryPayment.methodSubscription(paramsPagarMee)

    //params insert transaction
    const paramsTransaction = {
      uuid: uuidv4(),
      created_at: new Date().getTime(),
      created_id: req.userId,
      user_id_holder: req.userId,
      user_id: req.userId,
      installment:
        req.body.payment_method == 'credit_card' ? productUuid.installment : 1,
      amount: countTotalDecimal,
      paid_amount: countTotalDecimal,
      payment_method: titlePaymentMethod(
        productUuid.payment_methods,
        req.body.payment_method
      ),
      status: 0,
      status_description: 'Waiting Payment',
    }

    // repository payment
    const insertTransaction = await repositoryPayment.insertTransaction(
      paramsTransaction
    )

    //param payment
    const paramsPayment = {
      uuid: uuidv4(),
      created_at: new Date().getTime(),
      created_id: req.userId,
      transaction_id: insertTransaction.id,
      user_id_holder: req.userId,
      user_id: req.userId,
      product_id: productUuid.id,
      payment_method: titlePaymentMethod(
        productUuid.payment_methods,
        req.body.payment_method
      ),
      installment:
        req.body.payment_method == 'credit_card' ? productUuid.installment : 1,
      installment_value: productUuid.installment_value,
      amount: productUuid.amount,
      due_date: moment()
        .add(productUuid.installment, 'months')
        .format('YYYY-MM-DD'),
      status: 0,
      status_description: 'Waiting Payment',
    }

    // repository payment
    const insertPayment = await repositoryPayment.insertPayment(paramsPayment)

    let dataIDUser = []
    //loop to dependent
    for (var i = 0; i < req.body.dependents.length; i++) {
      var dep = req.body.dependents[i]

      //create user dependent
      const insertUser = await User.create({
        uuid: uuidv4(),
        created_at: new Date().getTime(),
        created_id: req.userId,
        user_id: req.userId,
        name: dep.full_name,
        email: dep.email,
        type: 4,
        status: 1,
        status_description: 'Ativo',
      })

      //create data in persona_data
      await PersonalData.create({
        uuid: uuidv4(),
        created_at: new Date().getTime(),
        created_id: req.userId,
        user_id_holder: req.userId,
        user_id: insertUser.id,
        profile: 'Dependente',
        mother_name: dep.mothers_name,
        gender: dep.gender,
        birth_day: dep.birth_day,
        document: dep.document,
        status: 1,
      })

      // variables params payment
      let paramsPayment = {
        uuid: uuidv4(),
        created_at: new Date().getTime(),
        created_id: req.userId,
        transaction_id: insertTransaction.id,
        user_id_holder: req.userId,
        user_id: insertUser.id,
        product_id: productUuid.id,
        product_dependent_id: productUuidDependet.id,
        payment_method: titlePaymentMethod(
          productUuid.payment_methods,
          req.body.payment_method
        ),
        installment:
          req.body.payment_method == 'credit_card'
            ? productUuid.installment
            : 1,
        installment_value: productUuidDependet.installment_value,
        amount: productUuidDependet.amount,
        due_date: moment()
          .add(productUuid.installment, 'months')
          .format('YYYY-MM-DD'),
        status: 0,
        status_description: 'Waiting Payment',
      }

      await Payment.create(paramsPayment)

      dataIDUser.push(insertUser.id)
    }
    //end for

    // integration API Pagar.Me
    pagarme.client
      .connect({ api_key: configPagarMe.apiKey })
      .then((client) => client.subscriptions.create(params))

      .then((transaction) => {
        //payment refused delete user
        if (transaction.current_transaction.status == 'refused') {
          Payment.destroy({
            where: {
              user_id: {
                [Operator.Op.in]: dataIDUser,
              },
            },
          })
          User.destroy({
            where: {
              id: {
                [Operator.Op.in]: dataIDUser,
              },
            },
          })
        }

        Transaction.update(
          {
            updated_at: transaction.current_transaction.date_updated,
            payment_date: transaction.current_transaction.date_updated,
            updated_id: req.userId,
            subscription_id: transaction.id,
            nsu: transaction.current_transaction.nsu,
            authorization_code:
              transaction.current_transaction.authorization_code,
            status: statusPayment(transaction.current_transaction.status),
            status_description: transaction.current_transaction.status,
          },
          {
            where: { id: insertTransaction.id },
          }
        ).catch((err) => {
          res.status(500).send({
            status: false,
            message: 'The request has not succeeded',
            data: null,
          })
        })

        //updated payment
        Payment.update(
          {
            updated_at: transaction.current_transaction.date_updated,
            payment_date: transaction.current_transaction.date_updated,
            updated_id: req.userId,
            status: statusPayment(transaction.current_transaction.status),
            status_description: transaction.current_transaction.status,
          },
          {
            where: { transaction_id: insertTransaction.id },
          }
        ).catch((err) => {
          res.status(500).send({
            status: false,
            message: 'The request has not succeeded',
            data: null,
          })
        })

        // setTimeout get transaction 1 segundo hhahahah
        setTimeout(() => {
          //get transaction
          Transaction.findOne({
            attributes: [
              'created_at',
              'subscription_id',
              'nsu',
              'authorization_code',
              'installment',
              'amount',
              'payment_method',
              'boleto_url',
              'boleto_barcode',
              'boleto_expiration_date',
              'status_description',
            ],
            where: { id: insertTransaction.id },
          })
            .then((data) => {
              res.status(200).send({
                status: true,
                message: 'The request has succeeded',
                data: {
                  transaction_uuid: insertTransaction.uuid,
                  transaction: data,
                },
              })
            })
            .catch((err) => {
              res.status(500).send({
                status: false,
                message: 'The request has not succeeded',
                data: null,
              })
            })
        }, 1000)
      })
      .catch((error) => {
        //return json
        res.status(500).send({
          status: false,
          message: 'The request has not succeeded',
          transaction_uuid: insertTransaction.uuid,
          message_error: error,
          data: null,
        })
      })
  }

  //method transaction
  if (productUuid.payment_methods != 1) {
    //params pagar.me
    const params = await repositoryPayment.methodTransaction(paramsPagarMee)

    // return res.status(500).send({
    //     paramsPagarMee: paramsPagarMee,
    //     status: params
    // });

    //params insert transaction
    const paramsTransaction = {
      uuid: uuidv4(),
      created_at: new Date().getTime(),
      created_id: req.userId,
      user_id_holder: req.userId,
      user_id: req.userId,
      installment:
        req.body.payment_method == 'credit_card' ? productUuid.installment : 1,
      amount: countTotalDecimal,
      paid_amount: countTotalDecimal,
      payment_method: titlePaymentMethod(
        productUuid.payment_methods,
        req.body.payment_method
      ),
    }

    // repository payment
    const insertTransaction = await repositoryPayment.insertTransaction(
      paramsTransaction
    )

    //param payment
    const paramsPayment = {
      uuid: uuidv4(),
      created_at: new Date().getTime(),
      created_id: req.userId,
      transaction_id: insertTransaction.id,
      user_id_holder: req.userId,
      user_id: req.userId,
      product_id: productUuid.id,
      payment_method: titlePaymentMethod(
        productUuid.payment_methods,
        req.body.payment_method
      ),
      installment:
        req.body.payment_method == 'credit_card' ? productUuid.installment : 1,
      installment_value: productUuid.installment_value,
      amount: productUuid.amount,
      due_date: moment()
        .add(productUuid.installment, 'months')
        .format('YYYY-MM-DD'),
    }

    // repository payment
    const insertPayment = await repositoryPayment.insertPayment(paramsPayment)

    let dataIDUser = []
    //loop to dependent
    for (var i = 0; i < req.body.dependents.length; i++) {
      var dep = req.body.dependents[i]

      //create user dependent
      const insertUser = await User.create({
        uuid: uuidv4(),
        created_at: new Date().getTime(),
        created_id: req.userId,
        user_id_holder: req.userId,
        user_id: req.userId,
        name: dep.full_name,
        email: dep.email,
        type: 4,
        status: 1,
        status_description: 'Ativo',
      })

      //create data in persona_data
      await PersonalData.create({
        uuid: uuidv4(),
        created_at: new Date().getTime(),
        created_id: req.userId,
        user_id_holder: req.userId,
        user_id: insertUser.id,
        profile: 'Dependente',
        mother_name: dep.mothers_name,
        gender: dep.gender,
        birth_day: dep.birth_day,
        document: dep.document,
        status: 1,
      })

      // variables params payment
      let paramsPayment = {
        uuid: uuidv4(),
        created_at: new Date().getTime(),
        created_id: req.userId,
        transaction_id: insertTransaction.id,
        user_id_holder: req.userId,
        user_id: insertUser.id,
        product_id: productUuid.id,
        product_dependent_id: productUuidDependet.id,
        payment_method: titlePaymentMethod(
          productUuid.payment_methods,
          req.body.payment_method
        ),
        installment:
          req.body.payment_method == 'credit_card'
            ? productUuid.installment
            : 1,
        installment_value: productUuidDependet.installment_value,
        amount: productUuidDependet.amount,
        due_date: moment()
          .add(productUuid.installment, 'months')
          .format('YYYY-MM-DD'),
      }

      await Payment.create(paramsPayment)

      dataIDUser.push(insertUser.id)
    }
    //end for

    // integration API Pagar.Me
    pagarme.client
      .connect({ api_key: configPagarMe.apiKey })
      .then((client) => client.transactions.create(params))
      .then((transaction) => {
        //payment refused delete user
        if (transaction.status == 'refused') {
          Payment.destroy({
            where: {
              user_id: {
                [Operator.Op.in]: dataIDUser,
              },
            },
          })
          User.destroy({
            where: {
              id: {
                [Operator.Op.in]: dataIDUser,
              },
            },
          })
        }

        Transaction.update(
          {
            updated_at: transaction.date_updated,
            payment_date: transaction.date_updated,
            updated_id: req.userId,
            nsu: transaction.nsu,
            authorization_code: transaction.authorization_code,
            boleto_url: transaction.boleto_url,
            boleto_barcode: transaction.boleto_barcode,
            boleto_expiration_date: transaction.boleto_expiration_date,
            status: statusPayment(transaction.status),
            status_description: transaction.status,
          },
          {
            where: { id: insertTransaction.id },
          }
        ).catch((err) => {
          res.status(500).send({
            status: false,
            message: 'The request has not succeeded',
            data: null,
          })
        })

        //updated payment
        Payment.update(
          {
            updated_at: transaction.date_updated,
            payment_date: transaction.date_updated,
            updated_id: req.userId,
            status: statusPayment(transaction.status),
            status_description: transaction.status,
          },
          {
            where: { transaction_id: insertTransaction.id },
          }
        ).catch((err) => {
          res.status(500).send({
            status: false,
            message: 'The request has not succeeded',
            data: null,
          })
        })

        //sendo to boleto
        if (req.body.payment_method === 'boleto') {
          sendEmailPaymentBillet(req.userEmail, 'Boleto StarBem', {
            name: transaction.customer.name.split(' ')[0],
            plan: transaction.items[0].title,
            barcode: transaction.boleto_barcode,
            billetUrl: transaction.boleto_url,
          })
        }

        // setTimeout get transaction 1 segundo hhahahah
        setTimeout(() => {
          //get transaction
          Transaction.findOne({
            attributes: [
              'created_at',
              'nsu',
              'authorization_code',
              'installment',
              'amount',
              'payment_method',
              'boleto_url',
              'boleto_barcode',
              'boleto_expiration_date',
              'status_description',
            ],
            where: { id: insertTransaction.id },
          })
            .then((data) => {
              res.status(200).send({
                status: true,
                message: 'The request has succeeded',
                data: {
                  transaction_uuid: insertTransaction.uuid,
                  transaction: data,
                  dataIDUser: dataIDUser,
                },
              })
            })
            .catch((err) => {
              res.status(500).send({
                status: false,
                message: 'The request has not succeeded',
                data: null,
              })
            })
        }, 1000)
      })
      .catch((error) => {
        //return json
        res.status(500).send({
          status: false,
          message: 'The request has not succeeded',
          transaction_uuid: insertTransaction.uuid,
          message_error: error,
          data: null,
        })
      })
  }
}

/**
 * Canceled payment
 * @param {} req
 */
exports.cancel = async (req, res) => {
  const payment = await Payment.findAll({
    where: {
      user_id_holder: req.userId,
      status: {
        [Operator.Op.in]: [0, 1],
      },
    },
  })

  let payment_count = payment.length

  // Not exist payment
  if (payment_count == 0) {
    return res.status(404).send({
      status: false,
      message: 'The request has not succeeded',
      message_error: 'user has no payment to cancel',
    })
  }

  // Update payment to canceled
  if (payment) {
    let message
    let status
    for (let payments of payment) {
      await Payment.update(
        {
          status: 3,
          status_description: 'canceled',
          updated_at: new Date().getTime(),
          updated_id: req.userId,
        },
        {
          where: {
            id: payments.id,
          },
        }
      )
        .then(() => {
          Transaction.update(
            {
              status: 3,
              status_description: 'canceled',
              updated_at: new Date().getTime(),
              updated_id: req.userId,
            },
            {
              where: {
                id: payments.transaction_id,
              },
            }
          )
          message = 'The request has succeeded'
          status = 200

          sendEmailCancelPlan(
            'julio.sousa@starbem.app',
            'Cancelamento de Plano',
            {
              transactionId: payments.transaction_id,
            }
          )
        })
        .catch((err) => {
          message = 'The request has not succeeded. || ' + err
          status = 500
        })
    }
    return res.status(status).send({
      status: false,
      message: message,
    })
  }
}

function titlePaymentMethod(data, payment_method) {
  if (data == 1 && payment_method == 'credit_card') {
    return 'subscription'
  }
  if (data != 1 && payment_method == 'credit_card') {
    return 'credit_card'
  }
  if (payment_method == 'boleto') {
    return 'billet'
  }
}

//sendo to error
function sendResponseError(res, msg) {
  return res.status(500).send({
    status: false,
    message: 'The request has not succeeded',
    message_error: msg,
  })
}

function statusPayment(data) {
  if (data == 'waiting_payment') {
    return 0
  }
  if (data == 'paid') {
    return 1
  }
  if (data == 'refused') {
    return 2
  }
  if (data == 'cancel') {
    return 3
  }
}
