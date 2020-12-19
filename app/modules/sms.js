import axios from 'axios'

const smsApi = axios.create({
  baseURL: process.env.URL_ZENVIA_API,
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json',
    Authorization: `Basic ${process.env.TOKEN_ZENVIA_API}`,
  },
})

export const sendSms = async (
  msg,
  from,
  to,
  callbackOption = 'NONE',
  flashSms = false
) => {
  try {
    smsApi.post('/send-sms', {
      sendSmsRequest: {
        from,
        to,
        msg,
        callbackOption,
        flashSms,
      },
    })
  } catch (err) {
    console.log(err)
  }
}

export default smsApi
