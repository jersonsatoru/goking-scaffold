const sgMail = require('@sendgrid/mail')
const { apiKey } = require('../config/mail')
const {
  verifyEmail,
  passwordRecovery,
  paymentBillet,
  schedulingCanceled,
  schedulingCreateDoctor,
  schedulingCreatePatient,
  cancelPlan,
} = require('./emailsIds')

//API KEY
sgMail.setApiKey(apiKey)

// Envia o codigo de verificação para o email do cliente
const sendEmailVerify = async (to, subject, data) => {
  const message = {
    to,
    subject,
    from: {
      email: 'no-reply@starbem.app',
      name: 'StarBem',
    },
    templateId: verifyEmail,
    dynamic_template_data: data,
  }

  try {
    await sgMail.send(message)
  } catch (err) {
    console.log('MAIL CODE ERROR: ', err)
  }
}

// Envia o codigo de recuperação de senha para o email do cliente
const sendEmailPasswordRecovery = async (to, subject, data) => {
  const message = {
    to,
    subject,
    from: {
      email: 'appsuporte@starbem.app',
      name: 'StarBem',
    },
    templateId: passwordRecovery,
    dynamic_template_data: data,
  }

  try {
    await sgMail.send(message)
  } catch (err) {
    console.log('MAIL CODE PASSWORD ERROR: ', err)
  }
}

const sendEmailPaymentBillet = async (to, subject, data) => {
  const message = {
    to,
    subject,
    from: {
      email: 'no-reply@starbem.app',
      name: 'StarBem',
    },
    templateId: paymentBillet,
    dynamic_template_data: data,
  }

  try {
    await sgMail.send(message)
  } catch (err) {
    console.log('MAIL BILLET ERROR: ', err)
  }
}

const sendEmailUserCanceled = async (to, subject, data) => {
  const message = {
    to,
    subject,
    from: {
      email: 'no-reply@starbem.app',
      name: 'StarBem',
    },
    templateId: schedulingCanceled,
    dynamic_template_data: data,
  }

  try {
    await sgMail.send(message)
  } catch (err) {
    console.log('MAIL BILLET ERROR: ', err)
  }
}

const sendEmailDoctorCanceled = async (to, subject, data) => {
  const message = {
    to,
    subject,
    from: {
      email: 'no-reply@starbem.app',
      name: 'StarBem',
    },
    templateId: schedulingCanceled,
    dynamic_template_data: data,
  }

  try {
    await sgMail.send(message)
  } catch (err) {
    console.log('MAIL BILLET ERROR: ', err)
  }
}

const sendEmailScheduleCreatePatient = async (to, subject, data) => {
  const message = {
    to,
    subject,
    from: {
      email: 'no-reply@starbem.app',
      name: 'StarBem',
    },
    templateId: schedulingCreatePatient,
    dynamic_template_data: data,
  }

  try {
    await sgMail.send(message)
  } catch (err) {
    console.log('MAIL BILLET ERROR: ', err)
  }
}

const sendEmailScheduleCreateDoctor = async (to, subject, data) => {
  const message = {
    to,
    subject,
    from: {
      email: 'no-reply@starbem.app',
      name: 'StarBem',
    },
    templateId: schedulingCreateDoctor,
    dynamic_template_data: data,
  }

  try {
    await sgMail.send(message)
  } catch (err) {
    console.log('MAIL BILLET ERROR: ', err)
  }
}

const sendEmailCancelPlan = async (to, subject, data) => {
  const message = {
    to,
    subject,
    from: {
      email: 'no-reply@starbem.app',
      name: 'StarBem',
    },
    templateId: cancelPlan,
    dynamic_template_data: data,
  }

  try {
    await sgMail.send(message)
  } catch (err) {
    console.log('MAIL BILLET ERROR: ', err)
  }
}

module.exports = {
  sendEmailVerify,
  sendEmailPasswordRecovery,
  sendEmailPaymentBillet,
  sendEmailUserCanceled,
  sendEmailDoctorCanceled,
  sendEmailScheduleCreatePatient,
  sendEmailScheduleCreateDoctor,
  sendEmailCancelPlan,
}
