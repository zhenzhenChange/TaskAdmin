import axios from 'axios'

const http = axios.create({
  withCredentials: true,
  baseURL:'/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default http