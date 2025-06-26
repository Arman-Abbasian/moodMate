import axios from 'axios'
import { storage } from '@/utils/storage'
import { router } from 'expo-router'

const API_BASE_URL = 'http://localhost:5000/api/'

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    const status = error.response?.status
    const errorMessage = error.response?.data?.message || ''

    if (
      status === 401 &&
      !originalRequest._retry &&
      errorMessage.includes('Invalid or expired token')
    ) {
      originalRequest._retry = true

      try {
        const refreshToken = await storage.getItem('refreshToken')
        if (!refreshToken) throw new Error('No refresh token')

        const res = await axios.post(
          `${API_BASE_URL}auth/refreshToken`,
          {},
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        )

        const { accessToken, refreshToken: newRefreshToken } = res.data || {}

        if (accessToken) {
          await storage.setItem('accessToken', accessToken)
          if (newRefreshToken) {
            await storage.setItem('refreshToken', newRefreshToken)
          }

          originalRequest.headers.Authorization = `Bearer ${accessToken}`
          return axiosInstance(originalRequest)
        }
      } catch (refreshError) {
        await storage.deleteItem('accessToken')
        await storage.deleteItem('refreshToken')
        router.replace('/auth/login')
      }
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
