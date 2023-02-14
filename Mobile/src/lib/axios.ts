import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://26.214.165.85:3333'
})