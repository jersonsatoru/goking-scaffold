const db = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { sendEmailPasswordRecovery } = require('../modules/mailer')

const authConfig = require('../config/auth')

const User = db.users
const Payment = db.payment
const PersonalData = db.personalData
const Product = db.products

const Op = db.Sequelize.Op

exports.login = async (req, res) => {
  //variables
  const { username } = req.body

  const user = await User.findOne({
    where: {
      [Op.or]: [{ document: username }, { email: username }],
      type: {
        [Op.in]: [req.body.type],
      },
    },
  })

  let user_id = !user ? '' : user.id

  //get payment data uuid to user_id
  const userPayment = await Payment.findOne({
    where: { user_id: user_id },
    order: [['id', 'DESC']],
  })

  //get depedent user
  const userDependent = await User.findAll({
    attributes: ['uuid', 'name'],
    where: { user_id: user_id },
  })

  const Payment_produt_id = !userPayment ? '' : userPayment.product_id
  //get personal data uuid to user_id
  const userProduct = await Product.findOne({
    where: { id: Payment_produt_id },
  })

  if (!user || !user.password) {
    return res.status(400).json({
      status: true,
      message: 'The request has succeeded',
      message_error: 'Your account or password is incorrect',
      data: null,
    })
  }

  let password = req.body.password ? req.body.password : ''
  let api_token = req.body.api_token ? req.body.api_token : ''

  if (
    !(await bcrypt.compare(password, user.password)) &&
    api_token != user.api_token
  ) {
    return res.status(400).json({
      status: true,
      message: 'The request has succeeded',
      message_error: 'Your account or password is incorrect senha errada',
      data: null,
    })
  }

  //create jtw parameters
  const token = jwt.sign({ uuid: user.uuid }, authConfig.secret, {
    expiresIn: 1296000,
  })

  let plan = {
    title: !userProduct ? '' : userProduct.title,
    status_description: !userProduct ? '' : userPayment.status_description,
    due_date: !userProduct ? '' : userPayment.due_date,
  }

  //get payment data uuid to user_id
  const personalData = await PersonalData.findOne({
    where: { user_id: user_id },
  })

  //data personal data
  const cellphone = !personalData ? '' : personalData.cellphone
  const birth_day = !personalData ? '' : personalData.birth_day

  const firstLogin = user.first_login == 0 ? true : false

  // json enconde
  res.status(200).json({
    status: true,
    message: 'The request has succeeded',
    data: {
      users: {
        uuid: user.uuid,
        name: user.name,
        email: user.email,
        document: user.document,
        cellphone: cellphone,
        birth_day: birth_day,
        type: user.type,
        api_token: user.api_token,
        fisrt_login: firstLogin,
      },
      plan: {
        name: plan.title,
        payment: plan.status_description,
        due_date: plan.due_date,
      },
      personal_data: personalData ? personalData : null,
      depedents: userDependent ? userDependent : null,
      token: token,
    },
  })
}

//Forgot password
exports.forgotPassword = async (req, res) => {
  const { email } = req.body

  try {
    const user = await User.findOne({ where: { email: email } })

    if (!user) {
      return res.status(400).send({
        status: false,
        message: 'Usuário não encontrado',
      })
    }

    const token = Math.floor(1000 + Math.random() * 9000)

    const data = new Date()
    data.setMinutes(data.getMinutes() + 20)

    User.update(
      { forgot_password_token: token, forgot_password_expires: data },
      {
        where: { uuid: user.uuid },
      }
    )
      .then(() => {
        // Send email
        sendEmailPasswordRecovery(email, 'Recuperação de senha StarBem', {
          name: user.dataValues.name.split(' ')[0],
          token,
        })

        return res.status(200).send({
          status: true,
          message: 'Código enviado com sucesso, confira seu e-mail.',
        })
      })
      .catch((err) => {
        console.log(err)
        return res.status(500).send({
          status: false,
          message: 'O pedido não foi bem sucedido',
        })
      })
  } catch (err) {
    return res.status(400).send({
      status: false,
      message: 'O pedido não foi bem sucedido',
      error: err,
    })
  }
}

exports.resetPassword = async (req, res) => {
  const { username, token, password } = req.body

  try {
    const user = await User.findOne({ where: { email: username } })

    if (!user) {
      return res.status(400).send({
        status: false,
        message: 'Usuário não encontrado.',
      })
    }

    if (token !== user.forgot_password_token) {
      return res.status(400).send({
        status: false,
        message: 'Código inválido.',
      })
    }

    const now = new Date()

    if (now > user.forgot_password_expires) {
      return res.status(400).send({
        status: false,
        message: 'Código expirado, gere um novo.',
      })
    }

    const salt = 10
    const hash = bcrypt.hashSync(password, salt)

    user.password = hash
    user.updated_at = now
    user.change_password = now
    user.updated_id = user.id
    user.forgot_password_token = null

    await user.save()

    return res.status(200).send({
      status: true,
      message: 'Senha atualizada.',
    })
  } catch (error) {
    console.log(error)
  }
}
