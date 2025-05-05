import { getAccessToken } from '@/utils/tokenManager'
import { fetchBaseQuery } from '@reduxjs/toolkit/query'

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000/api/',
  prepareHeaders: (headers) => {
    headers.set('Content-Type', 'application/json')
    const token = getAccessToken()
    console.log(token)
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    return headers
  },
})

export default baseQuery
