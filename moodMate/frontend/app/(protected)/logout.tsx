import { useEffect } from 'react'
import { Text } from 'react-native'
import { useRouter } from 'expo-router'
import { storage } from '@/utils/storage'

export default function Logout() {
  const router = useRouter()

  useEffect(() => {
    const logout = async () => {
      await storage.deleteItem('accessToken')
      await storage.deleteItem('refreshToken')
      router.navigate('/auth/login')
    }
    logout()
  }, [])

  return <Text>Logging out...</Text>
}
