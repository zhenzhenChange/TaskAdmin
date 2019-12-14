import axios from 'axios'

const http = axios.create({
  withCredentials: true,
  baseURL: '/api/admin',
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default http