import axios from 'axios'

const mcApi = axios.create({
  baseURL: process.env.MISSAO_COVID_API_URL,
})

export default mcApi
