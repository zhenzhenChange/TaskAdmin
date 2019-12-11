import axios from 'axios'

const http = axios.create({
  baseURL: 'http://127.0.0.1:4000/api/admin',
  withCredentials: true
})

export default http