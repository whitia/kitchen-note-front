import axios from 'axios'

const getBaseURL = (() => {
  return process.env.NEXT_PUBLIC_BASE_URL
})()

const client = axios.create({
  baseURL: getBaseURL,
  headers: {
    'Content-Type': "application/json",
  },
})

export default client
