import { storage } from '@/utils/storage'
import { getAccessToken } from '@/utils/tokenManager'
import { fetchBaseQuery } from '@reduxjs/toolkit/query'

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000/api/',
  prepareHeaders: async (headers) => {
    headers.set('Content-Type', 'application/json')
    const token = await storage.getItem('accessToken')
    console.log(token)
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    return headers
  },
})

export default baseQuery
