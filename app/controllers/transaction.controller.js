const db = require('../models')
const moment = require('moment')
const Transaction = db.transaction
const Payment = db.payment

exports.postbackUpdate = async (req, res) => {
  const log4js = require('log4js')
  // config log
  log4js.configure({
    appenders: {
      transaction: {
        type: 'file',
        filename:
          'logs/transaction/transaction-' +
          moment().format('YYYY-MM-DD') +
          '.log',
      },
    },
    categories: { default: { appenders: ['transaction'], level: 'error' } },
  })

  // Log
  const logger = log4js.getLogger('transaction')

  // Get transaction by id (nsu)
  let nsu_id = req.body.id ? req.body.id : null

  if (!nsu_id) {
    logger.error('nsu pagarme empty.')
    return res.status(500).send({
      status: false,
      message: 'Not exist nsu.',
    })
  }

  const transaction = await Transaction.findOne({
    where: { nsu: nsu_id },
  })

  let nsu = transaction ? transaction.nsu : null

  // writes error to log
  if (req.body.id != nsu) {
    logger.error(
      'id: ' +
        req.body.id +
        ' #Error:Permission denied, transaction not registered.'
    )
    return res.status(500).send({
      status: false,
      message: 'Not permission',
    })
  }

  if (req.body.current_status == 'waiting_payment') {
    await Transaction.update(
      { status_description: req.body.current_status, status: 0 },
      {
        where: { nsu: req.body.id },
      }
    )
      .then(() => {
        Payment.update(
          { status_description: req.body.current_status, status: 0 },
          {
            where: { transaction_id: transaction.id },
          }
        )
        return res.status(200).send({
          status: true,
          message: 'The request has succeeded',
        })
      })
      .catch((err) => {
        logger.error(err)
      })
  }

  if (req.body.current_status == 'paid') {
    await Transaction.update(
      { status_description: req.body.current_status, status: 1 },
      {
        where: { nsu: req.body.id },
      }
    )
      .then(() => {
        Payment.update(
          { status_description: req.body.current_status, status: 1 },
          {
            where: { transaction_id: transaction.id },
          }
        )

        return res.status(200).send({
          status: true,
          message: 'The request has succeeded',
        })
      })
      .catch((err) => {
        logger.error(err)
      })
  }
}
