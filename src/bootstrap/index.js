import axios from 'axios'
import { URI_BASE_API, TOKEN_NAME } from '../configs/api'

const AUTH_TOKEN = localStorage.getItem(TOKEN_NAME)

axios.defaults.baseURL = URI_BASE_API

if (AUTH_TOKEN) {
  axios.defaults.headers.common.Authorization = AUTH_TOKEN
}
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
