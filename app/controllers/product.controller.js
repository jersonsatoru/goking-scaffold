const db = require('../models')
const { v4: uuidv4 } = require('uuid')
const Product = db.products
const ProductDep = db.productsDependent

// Retrieve all from the database.
exports.findAll = (req, res) => {
  // relation table faq_answer
  Product.hasMany(ProductDep, { foreignKey: 'product_id' })

  // relation table product
  ProductDep.belongsTo(Product, { foreignKey: 'id' })

  Product.findAll({
    where: {
      status: 1,
    },
    attributes: [
      'uuid',
      'created_at',
      'title',
      'description',
      'installment',
      'installment_value',
      'amount',
      'term',
    ],
    include: [
      {
        model: ProductDep,
        attributes: [
          'uuid',
          'title',
          'description',
          'installment_value',
          'amount',
        ],
      },
    ],
  })
    .then((data) => {
      res.status(200).send({
        status: true,
        message: 'The request has succeeded',
        data: {
          products: data,
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

  // Product.findAll({ where: { product_id: null } })
  //     .then(data => {
  //         res.send({
  //             status: true,
  //             message: "The request has succeeded",
  //             data: {
  //                 products: data
  //             }
  //         }).status(200);
  //     })
  //     .catch(err => {
  //         res.send({
  //             status: false,
  //             message: "The request has not succeeded",
  //             data: null
  //         }).status(500);
  //     });
}

// Create and Save in the database
exports.create = (req, res) => {
  //create uuid version 4
  const uuid = uuidv4()

  // datetime
  const timestamp = new Date().getTime()

  // variables params
  var params = {
    uuid: uuid,
    created_at: timestamp,
    created_id: req.userId,
    title: req.body.title,
    type: req.body.type,
    description: req.body.description,
    term: req.body.term,
    amount: req.body.amount,
    fine: req.body.fine,
    status: 1,
  }

  Product.create(params)
    .then((data) => {
      //return json
      return res.status(200).send({
        status: true,
        message: 'The request has succeeded',
        data: {
          product: data,
        },
      })
    })
    .catch((err) => {
      //return json
      res.status(500).send({
        status: false,
        message: 'The request has not succeeded',
        message_error: err.message || 'Some error occurred while creating data',
        data: null,
      })
    })
  return

  // create conection to pagar.me
  // pagarme.client.connect({ api_key: apiKeyPagarMe.apiKey })
  //     // transaction to conection Pagar.me
  //     .then(client => client.plans.create({
  //         amount: req.body.amount,
  //         days: req.body.days,
  //         name: req.body.title,
  //         payment_methods: ['credit_card']
  //     }))
  //     .then(transactions => {
  //         //return reponse json API pagar.me
  //         const plan_id = { pagarme_plan_id: transactions.id };
  //         //add param object
  //         var teste = Object.assign(params, plan_id);
  //         //create in database
  //         Product.create(params)
  //             .then(data => {
  //                 //return json
  //                 res.status(200).send({
  //                     status: true,
  //                     message: "The request has succeeded",
  //                     data: {
  //                         product: data
  //                     }
  //                 });
  //             }).catch(err => {
  //                 //return json
  //                 res.status(500).send({
  //                     status: false,
  //                     message: "The request has not succeeded",
  //                     message_error: err.message || "Some error occurred while creating data",
  //                     data: null
  //                 })
  //             });

  //     })
  //     .catch(error => {
  //         //return json
  //         res.status(500).send({
  //             status: false,
  //             message: "The request has not succeeded",
  //             message_error: error.message || "Error connecting to the api",
  //             data: null
  //         })
  //     });
  //}
}
