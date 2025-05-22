import { storage } from '@/utils/storage'
import { setAccessToken } from '@/utils/tokenManager'
import { router } from 'expo-router'

export const logout = async () => {
  await storage.deleteItem('accessToken')
  await storage.deleteItem('refreshToken')
  setAccessToken(null)
  router.replace('/auth/login' as never)
}
