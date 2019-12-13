import axios from 'axios'

const http = axios.create({
  withCredentials: true,
  baseURL: '/api/admin',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default http