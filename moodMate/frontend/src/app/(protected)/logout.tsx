import { useEffect } from 'react'
import { Text } from 'react-native'
import { useRouter } from 'expo-router'
import { storage } from '@/utils/storage'
import { useAuth } from '@/context/AuthContext'
import useCheckTokenExpiration from '@/hooks/useCheckTokenExpiration'

export default function Logout() {
  //hooks
  const router = useRouter()
  const { setIsAuthenticated } = useAuth()
  useCheckTokenExpiration()

  //useEffects
  useEffect(() => {
    const logout = async () => {
      await storage.deleteItem('accessToken')
      await storage.deleteItem('refreshToken')
      setIsAuthenticated(false)
      router.navigate('/auth/login')
    }
    logout()
  }, [])

  return <Text>Logging out...</Text>
}
