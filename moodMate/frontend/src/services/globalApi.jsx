import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import { storage } from '@/utils/storage'
import axios from 'axios'
import { useRouter } from 'expo-router'
import { setAuthState } from '@/utils/authManager'

const baseUrl = __DEV__
  ? 'http://192.168.85.98:5000/api/'
  : 'https://your-production-api.com/api/'

const rawBaseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: async (headers) => {
    const token = await storage.getItem('accessToken')
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    headers.set('Content-Type', 'application/json')
    return headers
  },
})

export const baseQueryWithReauth = async (args, api, extraOptions) => {
  const router = useRouter()
  let result = await rawBaseQuery(args, api, extraOptions)

  if (result.error?.status === 401) {
    const refreshToken = await storage.getItem('refreshToken')

    if (refreshToken) {
      try {
        const res = await axios.post(
          `${baseUrl}auth/refreshToken`,
          {},
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        )

        const newAccessToken = res.data?.accessToken
        const newRefreshToken = res.data?.refreshToken

        if (newAccessToken && newRefreshToken) {
          // ✅ ذخیره توکن‌های جدید
          await storage.setItem('accessToken', newAccessToken)
          await storage.setItem('refreshToken', newRefreshToken)

          // دوباره اجرا کن با access token جدید
          result = await rawBaseQuery(args, api, extraOptions)
        }
      } catch (err) {
        await storage.deleteItem('accessToken')
        await storage.deleteItem('refreshToken')
        setAuthState(false)
        router.replace('/auth/login')
      }
    } else {
      await storage.deleteItem('accessToken')
      await storage.deleteItem('refreshToken')
      setAuthState(false)
      router.replace('/auth/login')
    }
  }

  return result
}
